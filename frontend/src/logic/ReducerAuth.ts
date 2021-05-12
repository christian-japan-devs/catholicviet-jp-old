import * as actionTypes from './ActionTypes';
import { updateObject } from '../utils/utils';
import { TAuthState,AuthAction, AuthStartAction, AuthSuccessAction, AuthFailAction, AuthLogoutAction } from '../types/TypeAuth';

const initialState: TAuthState = {
  token: '',
  error: '',
  loading: false,
};

const authStart = (state: TAuthState, action: AuthStartAction) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state: TAuthState, action: AuthSuccessAction) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state: TAuthState, action: AuthFailAction) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: TAuthState, action: AuthLogoutAction) => {
  return updateObject(state, {
    token: null,
  });
};

const reducer = (state: TAuthState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
