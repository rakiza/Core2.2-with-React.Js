import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../../App/Stores/ActivityStore';
import { RouteComponentProps } from 'react-router';
import Loading from '../../../App/Layout/Loading/Loading';

import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';
import { observer } from 'mobx-react-lite';



interface detailsParams{
    id:string    
}


const ActivityDetails:React.FC<RouteComponentProps<detailsParams>> = ({match,history}) => {
    
    const activityStore=useContext(ActivityStore);
    const {selectedActivity:activity,loadActivity,loading}=activityStore;
    
    
    useEffect(() => {   
        loadActivity(match.params.id);        
    }, [loadActivity,match.params.id,history]);

    if(loading) return <Loading content='Loading...'/>

    if(!activity) return <h1>not found</h1>
    
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

export default observer(ActivityDetails)
