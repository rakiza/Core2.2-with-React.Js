import React, { useContext,useEffect, useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';

import ActivityStore from '../../../App/Stores/ActivityStore';
import { IActivity } from '../../../App/Models/Activity';
import { RouteComponentProps } from 'react-router';


interface editParams{
    id:string;
}
const ActivityForm :React.FC<RouteComponentProps<editParams>>= ({match,history}) => {    

    const activityStore=useContext(ActivityStore);    
    const {selectedActivity,loadActivity,unSelectActivity}=activityStore;
    //let activity:IActivity;

    useEffect(() => {  
        if(match.params.id){            
         loadActivity(match.params.id)
           .then(()=>{
                selectedActivity && setactivity(selectedActivity);
           }); 
        }
        return (()=>{
            unSelectActivity();
        });          
    }, [loadActivity,selectedActivity,unSelectActivity,match.params.id]);

    const [activity, setactivity] = useState<IActivity>({
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''
    })    
    const inputChange=(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const{name,value}=event.currentTarget;
        setactivity({...activity,[name]:value});
    }
    const submit=()=>{
        activityStore.writeChange(activity)
        .then(()=>{
            history.push(`/activities/details/${activity.id}`)
        })
    }
    return (
        <Segment clearing>
            <Form onSubmit={submit} key={activity.id}>                
                <Form.Input placeholder='Title' name='title' value={activity!.title} onChange={inputChange} />
                <Form.TextArea rows='2' placeholder='Description' name='description' value={activity!.description} onChange={inputChange}/>
                <Form.Input placeholder='Category' name='category' value={activity!.category} onChange={inputChange}/>
                <Form.Input type='datetime-local' placeholder='Date' name='date' value={activity!.date} onChange={inputChange}/>
                <Form.Input placeholder='City' name='city' value={activity!.city} onChange={inputChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity!.venue} onChange={inputChange}/>

                <Button floated='right' type='submit' positive content='Save' loading={activityStore.submitting}/>

                <Button floated='right' type='button' content='Cancel' onClick={activityStore.cancelWriting}/>
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
