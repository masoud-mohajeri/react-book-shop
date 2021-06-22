import reducer from './rootReducer';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const middleware = [ReduxThunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
