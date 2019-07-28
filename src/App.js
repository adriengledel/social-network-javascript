import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from 'Routes/Routes.js';
import store from './store/store';
import {history} from 'store/store';
import { ConnectedRouter } from 'connected-react-router';


class App extends Component {
  state = {
    currentPage : 'login',
    loginError  : ''
  }  

  render() {

    return (
      <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
          <Routes history={history}/>
        {/* </ConnectedRouter> */}
      </Provider>
    );
  }
}

export default App; 
