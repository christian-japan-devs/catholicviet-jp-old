import * as actionTypes from "../actions/actionTypes";

type AuthState = {
    token: string,
    error: string,
    loading: boolean
}

type AuthStartAction = {
    type:actionTypes.AUTH_START
}

type AuthSuccessAction = {
    type: actionTypes.AUTH_SUCCESS
    token: string
}

type AuthFailAction = {
    type:actionTypes.AUTH_FAIL
    error: string
}

type AuthLogoutAction = {
    type:actionTypes.AUTH_LOGOUT
}

type DispatchAuthStartType = (args: AuthStartAction) => AuthStartAction
type DispatchAuthSuccessType = (args: AuthSuccessAction) => AuthSuccessAction
type DispatchAuthFailType = (args: AuthFailAction) => AuthFailAction
type DispatchAuthLogoutType = (args: AuthLogoutAction) => AuthLogoutAction