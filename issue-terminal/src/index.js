import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Authentication from './Authentication';
import Navigation from './Navigation';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


const app = (
  <Provider store={store}>
    <React.StrictMode>
      <Navigation />
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
