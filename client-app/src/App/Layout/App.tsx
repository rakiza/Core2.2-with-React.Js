import React, { Fragment, useState, useEffect, SyntheticEvent } from 'react';

import NavBar from '../../Features/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import { IActivity } from '../Models/Activity';
import API from '../API/API';
import Loading from './Loading/Loading';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);  
  const [target, setTarget] = useState('');

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
  }

  const unselectActivityHandeler = () => {
    setSelectedActivity(null);
  }
  const createActivityHandeler = () => {
    setSelectedActivity(null);
    setEditMode(false);
    setCreateMode(true);
  }

  const cancelActivityHandeler = () => {
    setEditMode(false);
    setCreateMode(false);
  }

  const createNewActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    API.ActivityServices.Create(activity)
    .then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setCreateMode(false);
    })
    .then(()=>setSubmitting(false));
  }

  const updateActivityHandler = (activity: IActivity) => {
    setSubmitting(true);
    API.ActivityServices.Update(activity.id, activity)
    .then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    })
    .then(()=>setSubmitting(false));

  }

  const deleteActivityHandler = (event:SyntheticEvent<HTMLButtonElement>,id: string) => {   setTarget(event.currentTarget.name);
    setSubmitting(true);
    API.ActivityServices.Delete(id)
    .then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
    })
    .then(()=>setSubmitting(false));    
  }
  useEffect(() => {
    //fetch data from api    
    API.ActivityServices.GetAll()
      .then(response => {
        let _activities: IActivity[] = [];
        response.forEach((activity: IActivity) => {
          activity.date = activity.date.toString().split('.')[0];
          _activities.push(activity);          
        })        
        setActivities(_activities);
      })
      .then(()=>{setLoading(false)})
  }, [])

  if(loading) return <Loading content="Loading ..."/>;

  return (
    <Fragment>
      <NavBar onCreate={createActivityHandeler} />
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
          submitting={submitting}
          target={target}
        />
      </Container>

    </Fragment>
  );

}
export default App;
