import { registerRootComponent } from 'expo';
import './global';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import socialNewsfeedReducer from './store/reducers/socialNewsfeed';
import App from './App';
import React, {Component} from 'react';
import { AppRegistry } from 'react-native';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
  auth: authReducer,
  socialNewsfeed: socialNewsfeedReducer

})

const store = createStore(
   rootReducer,
   composeEnhances(applyMiddleware(thunk)
));

const app = () => (
  <Provider store = {store}>
    <App />
  </Provider>

)
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(app);
