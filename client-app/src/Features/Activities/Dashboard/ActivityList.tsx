import React from 'react'
import { Item, Button, Label } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'

interface IProps {
    activities: IActivity[],
    onSelectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, onSelectActivity, deleteActivity}) => {
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
                                <Button color='blue' floated='right' content='View' onClick={() => onSelectActivity(activity.id)} />
                                <Label content={activity.category} />

                                <Button color='red' floated='right' content='Delete' onClick={() => deleteActivity (activity.id)} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                )
            }
        </Item.Group>
    )
}

export default ActivityList
