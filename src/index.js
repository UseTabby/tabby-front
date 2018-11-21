import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

// Import allReducers
import userReducer from './Reducers/userReducer'
import notifReducer from './Reducers/notifReducer'

const allReducers = combineReducers({
  user: userReducer,
  notifs: notifReducer
})

const store = createStore(
  allReducers,
  {
    user: [{
      name: 'Username',
      img: 'User Image'
    }],
    notifs: [{
      id: 'ID',
      title: 'Notif Title',
      url: 'Notif.url'
    }]
  },
  window.devToolsExtension && window.devToolsExtension()
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
