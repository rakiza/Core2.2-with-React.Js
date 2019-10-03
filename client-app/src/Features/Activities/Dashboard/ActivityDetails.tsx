import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

import ActivityStore from '../../../App/Stores/ActivityStore'


const ActivityDetails:React.FC = () => {
    const activityStore=useContext(ActivityStore);
    const {selectedActivity:activity}=activityStore;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} /> 
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={()=>activityStore.changeMode(true)}/>
                    <Button basic color='grey' content='Cancel' onClick={activityStore.unSelectActivity} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails
