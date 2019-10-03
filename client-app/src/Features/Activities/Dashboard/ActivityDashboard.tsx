import React, { SyntheticEvent } from 'react'
import { Grid} from 'semantic-ui-react'
import { IActivity } from '../../../App/Models/Activity'
import ActivityList from './ActivityList'
import ActivityDetails from './ActivityDetails'
import ActivityForm from './ActivityForm'


interface IProps{
    activities:IActivity[];
    selectedActivity:IActivity | null;
    onSelectActivity:(id:string)=>void;
    editMode:boolean;
    setEditMode:(editMode:boolean)=>void;   
    createMode:boolean; 
    cancel:()=>void;
    unselectActivity:()=>void;
    onEdit:(activity:IActivity)=>void;
    onCreate:(activity:IActivity)=>void;
    onDelete:(e:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
    submitting:boolean;
    target:string;
}
const ActivityDashboard:React.FC<IProps> = ({activities,selectedActivity,onSelectActivity,editMode,setEditMode,createMode,cancel,unselectActivity,onCreate,onEdit,onDelete,submitting,target}) => {    
    const mode=editMode || createMode;
    return (
        <Grid>
            <Grid.Column width={10} >                
                <ActivityList activities={activities} onSelectActivity={onSelectActivity} deleteActivity={onDelete} submitting={submitting} target={target}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                <ActivityDetails  activity={selectedActivity!} setEditMode={setEditMode} unselectActivity={unselectActivity} submitting={submitting}/>}

                {mode && <ActivityForm 
                key={selectedActivity && selectedActivity.id || 0} activity={selectedActivity!} cancel={cancel} edit={onEdit} create={onCreate} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
