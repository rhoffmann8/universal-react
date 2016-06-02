import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import users from './users';
import user from './user';

export default combineReducers({
  routing: routerReducer,
	users,
	user
});