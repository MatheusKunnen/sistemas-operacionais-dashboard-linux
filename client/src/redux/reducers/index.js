import { combineReducers } from 'redux';

import auth from './auth';
import systemInfo from './systemInfo';

export default combineReducers({
  auth,
  systemInfo,
});
