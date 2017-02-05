import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import routes from './routes';
import rootReducer from './reducers/root-reducer';
import { fetchQuizzes } from './actions/index'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer)

store.dispatch(fetchQuizzes())
// store holds the functions that can access state
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,

  document.getElementById('root')
);
