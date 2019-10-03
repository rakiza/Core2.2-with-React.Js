import React, { SyntheticEvent } from 'react'
import { Item, Button, Label } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'

interface IProps {
    activities: IActivity[],
    onSelectActivity: (id: string) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target:string;
}

const ActivityList: React.FC<IProps> = ({ activities, onSelectActivity, deleteActivity, submitting,target }) => {


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
                                <Label content={activity.category} loading={submitting} />

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

export default ActivityList
