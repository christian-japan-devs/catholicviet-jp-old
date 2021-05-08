import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import {AuthState,AuthStartAction,AuthSuccessAction,AuthFailAction,AuthLogoutAction} from "../types/auth";

const initialState:AuthState = {
  token: "",
  error: "",
  loading: false
};

const authStart = (state:AuthState, action:AuthStartAction) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state:AuthState, action:AuthSuccessAction) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const authFail = (state:AuthState, action:AuthFailAction) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state:AuthState, action:AuthLogoutAction) => {
  return updateObject(state, {
    token: null
  });
};

const reducer = (state:AuthState = initialState, action:any) => {
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