import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from './ActionTypes';
import { updateObject } from '../utils/utils';
import { ResgisterState, RegisterAction, DispatchRegisterType } from '../types/TypeRegister';

const initialState: ResgisterState = {
  result: '',
  status: '',
  loading: false,
};

const registerStart = (state: ResgisterState, action: RegisterAction) => {
  return updateObject(state, {
    status: action.status,
    loading: action.loading,
  });
};

const registerSuccess = (state: ResgisterState, action: RegisterAction) => {
  return updateObject(state, {
    data: action.data,
    status: action.status,
    loading: false,
  });
};

const registerFail = (state: ResgisterState, action: RegisterAction) => {
  return updateObject(state, {
    status: action.status,
    loading: false,
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_START:
      return registerStart(state, action);
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case REGISTER_FAIL:
      return registerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
