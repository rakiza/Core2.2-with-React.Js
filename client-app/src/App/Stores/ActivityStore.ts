import { observable, action, computed, runInAction } from 'mobx';
import { createContext, SyntheticEvent, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';

import { IActivity } from '../Models/Activity';
import API from '../API/API';
import { history } from '../..';
import { toast } from 'react-toastify';

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined = undefined;
    //used for editing and creating activity
    @observable writingMode: boolean = false;
    @observable loading: boolean = false;
    @observable submitting: boolean = false;
    @observable target: string = '';
    


    @computed get activitiesByDateAsc() {
        return this.groupActivityByDate(Array.from(this.activitiesRegistry.values()));
        //return this.activitiesRegistry.values();
    }

    groupActivityByDate(activities: IActivity[]) {
        
        const sortedActivities = activities.sort((a, b) => a.date!.getTime() - b.date!.getTime());
        
        return Object.entries(sortedActivities.reduce(
            (activities, activity) => {
                const date = activity.date.toISOString().split('T')[0];                
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                
                return activities;
            }, {} as { [key: string]: IActivity[] }
        ));
    }
    @action loadActivities = async () => {
        this.loading = true;
        try {
            const result = await API.ActivityServices.GetAll();
            result.forEach((activity: IActivity) => {
                activity.date =new Date(activity.date.toString().split('.')[0]);
                //this.activities.push(activity);
                this.activitiesRegistry.set(activity.id, activity);
            });
        } catch (errors) {
            //console.log(errors);
        }

        this.loading = false;
    }

    @action loadActivity = async (id: string) => { 
        /* this.selectedActivity=undefined;
        this.loading=true; */

        let activity = this.activitiesRegistry.get(id);
        if (activity) {
            this.selectedActivity=activity;                          
            return activity;
        } else {
            //this.loading=true;
            try{
                activity=await API.ActivityServices.GetById(id);
               
                runInAction('getting activity',()=>{
                    this.activitiesRegistry.set(activity.id, activity);
                    this.selectedActivity=activity;
                    this.loading=false;
                });
                return activity;
            }catch(err){                
                runInAction('getting activity error',()=>{                    
                    this.loading=false;
                });
                //throw(err);                
            }
            
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id); //this.activities.find(x => x.id === id);
        this.writingMode = false;
    }

    @action changeMode = (value: boolean) => {
        this.writingMode = value;
    }

    @action unSelectActivity = () => {
        this.selectedActivity = undefined;
        this.writingMode = false;
    }

    @action cancelWriting = () => {
        this.writingMode = false;
        this.selectedActivity = undefined;
    }

    @action SavePartialChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        runInAction('editing partial activity', () => {
            this.selectedActivity = { ...this.selectedActivity!, [name]: value };
            //console.log(this.selectedActivity);
        });
    }


    @action initActivity() {
        this.writingMode = true;
        return {
            id: '',
            title: '',
            description: '',
            category: '',
            date: null,
            city: '',
            venue: ''
        };
    }

    @action newActivity = () => {
        this.initActivity();
    }

    @action writeChange = async (activity: IActivity) => {
        console.log(activity);
        this.submitting = true;

        if (this.selectedActivity && this.selectedActivity.id.length > 0) {
            //Editing activity 
            try{
                await API.ActivityServices.Update(activity.id, activity);
                runInAction('editin activity', () => {
                    this.activitiesRegistry.set(activity.id, activity);
                    this.selectedActivity = activity;
                    this.writingMode = false;
                    this.submitting = false;
                    history.push(`/activities/details/${activity.id}`);
                })
            }catch(err){
                toast.error(err.response.data.title);
                console.log(err.response);
            }
            

        } else {
            //creating new activity
            activity.id = uuid();
            try{
                await API.ActivityServices.Create(activity);
                runInAction('adding activity', () => {
                    this.activitiesRegistry.set(activity.id, activity);
                    this.writingMode = false;
                    this.submitting = false;
                    history.push(`/activities/details/${activity.id}`);
                })
            }catch(err){
                toast.error(err.response.data.title);
                console.log(err.response);
            }
            

        }

    }

    @action deleteActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.target = e.currentTarget.name;
        this.submitting = true;
        API.ActivityServices.Delete(id)
            .then(() => {
                //Dispaly alert info.
                //this.activities=[...this.activities.filter(x=>x.id!==id)];
                this.activitiesRegistry.delete(id);
            })
            .finally(() => {
                this.submitting = false;
                this.target = '';
            })
    }
}

export default createContext(new ActivityStore());