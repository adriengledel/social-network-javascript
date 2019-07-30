import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { getRootReducer, createRootReducer } from './rootReducer.js';

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxRouterMiddleware = routerMiddleware(history);
const middleware = [thunk, reduxRouterMiddleware];

const store = createStore(getRootReducer(), composeEnhancer(applyMiddleware(...middleware)));


export default store;