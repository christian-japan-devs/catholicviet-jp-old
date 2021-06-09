import {
  AUTH_SET_UNAME,
  AUTH_SET_UPASS,
  AUTH_SET_OLDPASS,
  AUTH_SET_REUPASS,
  AUTH_SET_EMAIL,
  AUTH_IS_AUTH,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  AUTH_SET_ERROR_AT,
} from '../utils/actionTypes';
import { RegisterAction } from './reducer.app';

export type AuthAction =
  | { type: typeof AUTH_SET_UNAME; payload: string }
  | { type: typeof AUTH_SET_UPASS; payload: string }
  | { type: typeof AUTH_SET_OLDPASS; payload: string }
  | { type: typeof AUTH_SET_REUPASS; payload: string }
  | { type: typeof AUTH_SET_EMAIL; payload: string }
  | { type: typeof AUTH_IS_AUTH; payload: boolean }
  | { type: typeof AUTH_SUCCESS; payload: string }
  | {
    type: typeof AUTH_FAILED;
    payload: { isErrorAt: string; helperText: string };
  }
  | { type: typeof AUTH_LOGOUT; payload: boolean }
  | {
    type: typeof AUTH_SET_ERROR_AT;
    payload: { isErrorAt: string; helperText: string };
  };

export type AuthState = {
  username: string;
  password: string;
  oldPassword: string;
  holyname?: string;
  fullname?: string;
  email: string;
  address?: string;
  rePassword?: string;
  isAuthenticated: boolean;
  helperText?: string;
  isErrorAt?: string;
  loading?: boolean;
  remember?: boolean;
  redirect: string;
};

export const authInitialState: AuthState = {
  username: '',
  password: '',
  oldPassword: '',
  rePassword: '',
  email: '',
  isAuthenticated: false,
  isErrorAt: '',
  loading: false,
  remember: false,
  redirect: ''
};

export const authReducer = (
  state: AuthState,
  action: AuthAction | RegisterAction
): AuthState => {
  switch (action.type) {
    case AUTH_SET_UNAME:
      return {
        ...state,
        username: action.payload,
        isErrorAt: '',
      };
    case AUTH_SET_UPASS:
      return {
        ...state,
        password: action.payload,
        isErrorAt: '',
      };
    case AUTH_SET_OLDPASS:
      return {
        ...state,
        oldPassword: action.payload,
        isErrorAt: '',
      }
    case AUTH_SET_REUPASS:
      return {
        ...state,
        rePassword: action.payload,
        isErrorAt: '',
      };
    case AUTH_SET_EMAIL:
      return {
        ...state,
        email: action.payload,
        isErrorAt: '',
      };
    case AUTH_IS_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
        redirect: '/account/profile',
        isErrorAt: '',
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        redirect: action.payload,
        isErrorAt: '',
      };
    case AUTH_FAILED:
      return {
        ...state,
        helperText: action.payload.helperText,
        isErrorAt: action.payload.isErrorAt,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        redirect: '/',
        isAuthenticated: false,
      };
    case AUTH_SET_ERROR_AT:
      return {
        ...state,
        helperText: action.payload.helperText,
        isErrorAt: action.payload.isErrorAt,
      };
    default:
      return state;
  }
};
