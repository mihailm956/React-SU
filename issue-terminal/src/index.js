import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation';
import * as serviceWorker from './serviceWorker';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import issueReducer from './store/reducers/issue';
import BackGroundImage from './components/background-image/backGroundImage';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  issue: issueReducer,
  auth: authReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


const app = (
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <Navigation />
      <BackGroundImage/>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
