import { observable, action, computed } from 'mobx';
import { createContext, SyntheticEvent, FormEvent } from 'react';
import {v4 as uuid} from 'uuid';

import { IActivity } from '../Models/Activity';
import API from '../API/API';

class ActivityStore {
    @observable activitiesRegistry=new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined = undefined;
    //used for editing and creating activity
    @observable writingMode: boolean = false;
    @observable loading: boolean = false;
    @observable submitting: boolean = false;
    @observable target: string = '';

    @computed get activitiesByDateAsc(){
        return Array.from(this.activitiesRegistry.values()).sort((a,b)=>Date.parse(b.date) - Date.parse(a.date));
    }

    @action loadActivities = async () => {
        this.loading = true;
        try{
            const result=await API.ActivityServices.GetAll();
            result.forEach((activity: IActivity) => {
                activity.date = activity.date.toString().split('.')[0];
                //this.activities.push(activity);
                this.activitiesRegistry.set(activity.id,activity);
            });
        }catch(errors){
            console.log(errors);
        }
        
        this.loading = false;  

        /* API.ActivityServices.GetAll()
            .then((response) => {
                response.forEach((activity: IActivity) => {
                    activity.date = activity.date.toString().split('.')[0];
                    this.activities.push(activity);
                })
            })
            .finally(() => {
                this.loading = false;                
            }); */
    }


    @action selectActivity = (id: string) => {
        this.selectedActivity =this.activitiesRegistry.get(id); //this.activities.find(x => x.id === id);
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

    @action SavePartialChange=(event:FormEvent<HTMLInputElement | HTMLTextAreaElement >)=>{
        const {name,value}=event.currentTarget;
        this.selectedActivity={...this.selectedActivity!,[name]:value};
    }

    @action newActivity=()=>{
        this.selectedActivity={
            id:'',
            title:'',
            description:'',
            category:'',
            date:'',
            city:'',
            venue:''
        };
        
        this.writingMode=true;
    }

    @action writeChange = () => {        
        this.submitting = true;
        if (this.selectedActivity && this.selectedActivity.id.length > 0) {
            //Editing activity
            API.ActivityServices.Update(this.selectedActivity.id, this.selectedActivity)
                .then(() => {
                    /* this.activities = [...this.activities.filter(x => x.id !== this.selectedActivity!.id), this.selectedActivity] */
                    this.activitiesRegistry.set(this.selectedActivity!.id,this.selectedActivity);
                    //this.selectedActivity = this.selectedActivity;
                    this.writingMode = false;
                })
                .finally(() => { this.submitting = false });
        } else {
            //creating new activity
            this.selectedActivity!.id=uuid();
            
            API.ActivityServices.Create(this.selectedActivity!)
                .then(() => {
                    /* this.activities = [...this.activities, activity]
                    this.selectedActivity = activity; */
                    this.activitiesRegistry.set(this.selectedActivity!.id,this.selectedActivity);
                    this.writingMode = false;
                })
                .finally(() => { this.submitting = false });
        }

    }

    @action deleteActivity = (e:SyntheticEvent<HTMLButtonElement>,id: string) => {
        this.target=e.currentTarget.name;
        this.submitting=true;
        API.ActivityServices.Delete(id)
        .then(()=>{
            //Dispaly alert info.
            //this.activities=[...this.activities.filter(x=>x.id!==id)];
            this.activitiesRegistry.delete(id);
        })
        .finally(()=>{
            this.submitting=false;
            this.target='';
        })
    }
}

export default createContext(new ActivityStore());