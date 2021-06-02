//
export const AUTH_SET_UNAME = 'setUsername';
export const AUTH_SET_EMAIL = 'setPassword';
export const AUTH_SET_UPASS = 'setRepassword';
export const AUTH_SET_REUPASS = 'setEmail';

export const AUTH_IS_AUTH = 'isAuthenticated';
export const AUTH_SUCCESS = 'loginSuccess';
export const AUTH_FAILED = 'loginFailed';
export const AUTH_LOGOUT = 'logout';
export const AUTH_SET_ERROR_AT = 'setIsError';

//register
export enum RegisterActionTypes {
    register = 'MAKE_REG',
    cancel = 'CANCEL_REG',
    confirm = 'CONFIRM_REG'
}
