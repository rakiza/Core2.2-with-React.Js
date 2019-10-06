import { observable, action, computed, runInAction } from 'mobx';
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
    }

    @action loadActivity = async (id:string)=>{
        if(this.selectedActivity && this.selectedActivity.id===id){
            runInAction('getting activity',()=>{                
                this.loading=false;
            });
            return;
        }else{
            
            this.loading=true;
            this.selectedActivity=undefined;

            let activity=this.activitiesRegistry.get(id);            
            if(!activity){
                try{
                    this.loading=true;
                    activity=await API.ActivityServices.GetById(id);
                    
                    runInAction('getting activity',()=>{
                        this.selectedActivity=activity;
                        this.loading=false;
                    })
                    
                }catch(error){
                    runInAction('getting activity error',()=>{
                        this.loading=false;
                        console.log(error);
                    })
                    
                }
            }else{
                runInAction('getting activity',()=>{                    
                    this.selectedActivity=activity;
                    this.loading=false;
                })
            }
            console.log(this.selectedActivity);
        }
        
        
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
        runInAction('editing partial activity',()=>{
            this.selectedActivity={...this.selectedActivity!,[name]:value};
            console.log(this.selectedActivity);
        });        
    }

    
    @action initActivity(){
        this.writingMode=true;
        return{
            id:'',
            title:'',
            description:'',
            category:'',
            date:'',
            city:'',
            venue:''
        };   
    }

    @action newActivity=()=>{
        this.initActivity();
    }

    @action writeChange = async(activity:IActivity) => {        
        this.submitting = true;        

        if (this.selectedActivity && this.selectedActivity.id.length > 0) {
            //Editing activity 
            await API.ActivityServices.Update(activity.id,activity);
            runInAction('editin activity',()=>{
                this.activitiesRegistry.set(activity.id,activity); 
                this.selectedActivity=activity;
                this.writingMode = false;
                this.submitting=false;
            })
            
        } else {
            //creating new activity
            activity.id=uuid();
            await API.ActivityServices.Create(activity);
            runInAction('adding activity',()=>{
                this.activitiesRegistry.set(activity.id,activity);
                this.writingMode = false;
                this.submitting=false;
            })
            
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