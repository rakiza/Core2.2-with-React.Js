import React, { Fragment, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import NavBar from '../../Features/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';

import Loading from './Loading/Loading';
import ActivityStore from '../Stores/ActivityStore';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Index from '../../Features/Home/Index';
import ActivityForm from '../../Features/Activities/Dashboard/ActivityForm';
import ActivityDetails from '../../Features/Activities/Dashboard/ActivityDetails';



const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore);


  useEffect(() => {
    //fetch data from api    
    activityStore.loadActivities();

  }, [activityStore])

  if (activityStore.loading) return <Loading content="Loading ..." />;

  return (
    <Fragment>

      <Route exact path='/' component={Index} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar onCreate={activityStore.newActivity} />

          <Container>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/details/:id' component={ActivityDetails} />
            <Route key={location.key} exact path={['/activities/create', '/activities/edit/:id']} component={ActivityForm} />
          </Container>
        </Fragment>
      )} />





    </Fragment>
  );

}
export default withRouter(observer(App));
