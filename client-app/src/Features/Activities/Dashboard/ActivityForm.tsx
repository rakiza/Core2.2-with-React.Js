import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'
import {v4 as uuid} from 'uuid';
interface IProps{
    activity:IActivity;
    cancel:()=>void;
    edit:(activity:IActivity)=>void;
    create:(activity:IActivity)=>void;
    submitting:boolean;
}

const ActivityForm:React.FC<IProps>= ({activity:initialActivity,create,edit,cancel,submitting}) => {
    
    const InitialiseForm=()=>{
        if(!initialActivity){
            return {
                id:'',
                title:'',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:''
            }
        }else{
            return initialActivity;
        }

    }
    const [activity, setActivity] = useState<IActivity>(InitialiseForm);
    
    const inputChange=(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value}=event.currentTarget;
        setActivity({...activity,[name]:value})
    }

    const submitHandler=()=>{
        if(activity && activity.id.length){            
            edit(activity);
        }else{            
            let newActivity={...activity};
            newActivity.id=uuid();
            create(newActivity);
        }
        
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler}>                
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={inputChange} />
                <Form.TextArea rows='2' placeholder='Description' name='description' value={activity.description} onChange={inputChange}/>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={inputChange}/>
                <Form.Input type='datetime-local' placeholder='Date' name='date' value={activity.date} onChange={inputChange}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={inputChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={inputChange}/>

                <Button floated='right' type='submit' positive content='Save' loading={submitting}/>
                <Button floated='right' type='button' content='Cancel' onClick={cancel}/>
            </Form>
        </Segment>
    )
}

export default ActivityForm
