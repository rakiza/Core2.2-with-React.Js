import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../../App/Stores/ActivityStore';
import { RouteComponentProps } from 'react-router';
import Loading from '../../../App/Layout/Loading/Loading';

import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';

interface detailsParams{
    id:string    
}
const ActivityDetails:React.FC<RouteComponentProps<detailsParams>> = ({match}) => {
    const activityStore=useContext(ActivityStore);
    const {selectedActivity:activity,loadActivity,loading}=activityStore;
    
    useEffect(() => {        
        loadActivity(match.params.id);        
    }, [loadActivity,match.params.id]);

    if(loading || !activity) return <Loading content='Loading...'/>

    /* return (
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
                    <Button basic color='blue' content='Edit' as={Link} to={`/activities/edit/${activity.id}`}/>
                    <Button basic color='grey' content='Cancel' onClick={activityStore.unSelectActivity} as={Link} to='/activities' />
                </Button.Group>
            </Card.Content>
        </Card>
    ) */
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetailsSideBar/>
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDetails
