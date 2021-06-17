import userReducer from './user/user.reducer';
import { combineReducers } from 'redux';
import ErrorReducer from './Errors/errors.reducer';

export default combineReducers({
  user: userReducer,
  error: ErrorReducer,
});
