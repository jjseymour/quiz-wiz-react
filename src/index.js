import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import routes from './routes';
import rootReducer from './reducers/root-reducer';
import { fetchQuizzes } from './actions/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
// const store = createStore(rootReducer, /* preloadedState, */ compose(
    applyMiddleware(ReduxThunk)
));

// const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
// const store = createStoreWithMiddleware(rootReducer)

// store.dispatch(fetchQuizzes())
// store holds the functions that can access state
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,

  document.getElementById('root')
);
