import React from 'react'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Router from './Router';

class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount() {
    console.disableYellowBox = true;
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
