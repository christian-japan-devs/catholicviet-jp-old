import { combineReducers } from 'redux';

import authReducer from './ReducerAuth';
import registerReducer from './ReducerRegister';

const rootReducer = combineReducers({
  auth:authReducer,
  register: registerReducer,
});

export default rootReducer;
