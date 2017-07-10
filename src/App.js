import React from 'react'
import firebase from 'firebase';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Router from './Router';

class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD9O-2MIWTnwrP8__L5XSZoR1ZJexWX7zg',
      authDomain: 'manager-1cba4.firebaseapp.com',
      databaseURL: 'https://manager-1cba4.firebaseio.com',
      projectId: 'manager-1cba4',
      storageBucket: '',
      messagingSenderId: '111426041988'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
