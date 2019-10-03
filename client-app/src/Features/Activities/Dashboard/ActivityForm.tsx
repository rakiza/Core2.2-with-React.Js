import React, { useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite';

import ActivityStore from '../../../App/Stores/ActivityStore';


const ActivityForm :React.FC= () => {    

    const activityStore=useContext(ActivityStore);
    const {selectedActivity:activity,SavePartialChange:inputChange}=activityStore;

    return (
        <Segment clearing>
            <Form onSubmit={()=>activityStore.writeChange()}>                
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
