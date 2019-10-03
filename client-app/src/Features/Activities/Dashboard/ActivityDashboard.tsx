import React, {useContext } from 'react'
import { observer } from 'mobx-react-lite';

import { Grid} from 'semantic-ui-react'

import ActivityList from './ActivityList'
import ActivityDetails from './ActivityDetails'
import ActivityForm from './ActivityForm'
import ActivityStore from '../../../App/Stores/ActivityStore';


const ActivityDashboard :React.FC = () => {      
    const activityStore=useContext(ActivityStore);
    const {selectedActivity,writingMode}=activityStore;
    return (
        <Grid>
            <Grid.Column width={10} >                
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !writingMode && <ActivityDetails/>}

                {writingMode && <ActivityForm key={selectedActivity && selectedActivity!.id}/>}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
