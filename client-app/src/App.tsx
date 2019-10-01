import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Header, Icon, List } from 'semantic-ui-react';

/* export interface IValue{
  id:number,
  name:string
} */

class App extends Component {
  state = {
    values: []
  }
  componentDidMount() {
    //fetch data from api
    axios.get('http://localhost:5000/api/values')
      .then(response => {        
        this.setState({
          values: response.data
        })
      })

  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='settings' />
          <Header.Content>
            Account Settings
            <Header.Subheader>Manage your preferences</Header.Subheader>
          </Header.Content>
        </Header>
        <List>
          {
            this.state.values.map(
              (value:any, index) => <List.Item key={value.id+'_'+index}>{value.name}</List.Item>)
          }
        </List>
        <List items={this.state.values} />
      </div>
    );
  }
}


export default App;
