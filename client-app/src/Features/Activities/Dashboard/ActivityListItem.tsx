import React, { useContext } from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'
import { Link } from 'react-router-dom'
import ActivityStore from '../../../App/Stores/ActivityStore'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const { deleteActivity, submitting, target } = activityStore;

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={activity.id}>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                hosted by ghassan
                            </Item.Description>                        
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                attendees will go here.
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button color='blue' floated='right' content='View' as={Link} to={`/activities/details/${activity.id}`} />

                <Button
                    name={activity.id}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={(event) => deleteActivity(event, activity.id)}
                    loading={target === activity.id && submitting} />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem
