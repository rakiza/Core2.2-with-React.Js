import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Item, Button, Label } from 'semantic-ui-react'

import ActivityStore from '../../../App/Stores/ActivityStore';

const ActivityList:React.FC =() => {

    const activityStore=useContext(ActivityStore);
    const{activitiesByDateAsc:activities,submitting,deleteActivity,target}=activityStore;
    return (
        <Item.Group divided>
            {
                activities.map((activity) =>
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button color='blue' floated='right' content='View' onClick={() => activityStore.selectActivity(activity.id)} />
                                <Label content={activity.category} />

                                <Button
                                    name={activity.id}
                                    color='red'
                                    floated='right'
                                    content='Delete'
                                    onClick={(event) => deleteActivity(event,activity.id)}
                                    loading={target===activity.id && submitting} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                )
            }
        </Item.Group>
    )
}

export default observer(ActivityList)
