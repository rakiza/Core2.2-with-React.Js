import React, { Fragment, useEffect, useContext } from 'react';
import {observer} from 'mobx-react-lite';

import NavBar from '../../Features/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';

import Loading from './Loading/Loading';
import ActivityStore from '../Stores/ActivityStore';


const App = () => {
  const activityStore=useContext(ActivityStore);
    
  
  useEffect(() => {
    //fetch data from api    
    activityStore.loadActivities();
    
  }, [activityStore])

  if(activityStore.loading) return <Loading content="Loading ..."/>;

  return (
    <Fragment>
      <NavBar onCreate={activityStore.newActivity} />
      <Container>        
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );

}
export default  observer(App) ;
