import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../../Features/NavBar/NavBar';

import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import { IActivity } from '../Models/Activity';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState(false);

  const selectActivityHandler = (id: string) => {
    setCreateMode(false);
    setEditMode(false);
    //from list activities =>IActivity[]
    const activity = activities.find(x => x.id === id);
    if (activity) {
      setSelectedActivity(activity);
    }
    else {
      setSelectedActivity(null);
    }
    //from db
    /* axios.get<IActivity>('http://localhost:5000/api/activities')
    .then(Response=>{
      setSelectedActivity(Response.data);
    }) */
  }

  const unselectActivityHandeler=()=>{
    setSelectedActivity(null);
  }
  const createActivityHandeler=()=>{    
    setSelectedActivity(null);
    setEditMode(false);
    setCreateMode(true);    
  }

  const cancelActivityHandeler=()=>{ 
    setEditMode(false); 
    setCreateMode(false);
  }

  const createNewActivityHandler=(activity:IActivity)=>{    
    setActivities([...activities,activity]);
    setSelectedActivity(activity);
    setCreateMode(false);   
  }

  const updateActivityHandler=(activity:IActivity)=>{
    setActivities([...activities.filter(x=>x.id!==activity.id),activity]);
    setSelectedActivity(activity);
    setEditMode(false); 
  }
  
  const deleteActivityHandler=(id:string)=>{
    setActivities([...activities.filter(x=>x.id!==id)]);
  }
  useEffect(() => {
    //fetch data from api
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        let _activities:IActivity[]=[];
        response.data.forEach(activity=>{
          activity.date=activity.date.toString().split('.')[0];
          _activities.push(activity);
        })
        setActivities(_activities);
      })
  }, [])

  return (
    <Fragment>
      <NavBar  onCreate={createActivityHandeler}/>
      <Container>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity!}
          onSelectActivity={selectActivityHandler}
          editMode={editMode}
          setEditMode={setEditMode} 
          unselectActivity={unselectActivityHandeler}
          createMode={createMode} 
          cancel={cancelActivityHandeler} 
          onEdit={updateActivityHandler}       
          onCreate={createNewActivityHandler} 
          onDelete={deleteActivityHandler}      
        />
      </Container>

    </Fragment>
  );

}
export default App;
