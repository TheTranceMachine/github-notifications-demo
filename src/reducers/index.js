import { combineReducers } from 'redux';
import notifications from './notifications';
import repositories from './repositories';

export default combineReducers({
  notifications,
  repositories
});
