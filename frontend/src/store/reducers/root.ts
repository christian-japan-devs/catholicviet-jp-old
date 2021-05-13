import { combineReducers } from 'redux';

import authReducer from '../../auth/auth.reducer';
import registerReducer from './register';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
