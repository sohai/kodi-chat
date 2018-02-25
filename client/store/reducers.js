import { combineReducers } from 'redux';
import keyNames from './keysNames';
import connection from '../handlers/connection';
import users from '../handlers/users';

export default combineReducers({
  [keyNames.connection]: connection.reducer,
  [keyNames.users]: users.reducer
});
