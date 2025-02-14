import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App/Layout/App';


import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-widgets/dist/css/react-widgets.css'
import './App/Layout/styles.css';
import dateFnsLocalizer from 'react-widgets-date-fns';

export const history = createBrowserHistory();

dateFnsLocalizer();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
