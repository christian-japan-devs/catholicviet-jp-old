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
  AUTH_LOADING,
} from '../utils/actionTypes';
import { RegisterAction } from './reducer.app';

export type AuthAction =
  { type: typeof AUTH_LOADING; payload: boolean }
  | { type: typeof AUTH_SET_UNAME; payload: string }
  | { type: typeof AUTH_SET_UPASS; payload: string }
  | { type: typeof AUTH_SET_OLDPASS; payload: string }
  | { type: typeof AUTH_SET_REUPASS; payload: string }
  | { type: typeof AUTH_SET_EMAIL; payload: string }
  | { type: typeof AUTH_IS_AUTH; payload: boolean }
  | { type: typeof AUTH_SUCCESS; payload: { isAuthenticated: boolean, redirect: string, isConfirmed: boolean } }
  | { type: typeof AUTH_FAILED; payload: { isErrorAt: string; helperText: string }; }
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
  isConfirmed?: boolean;
};

export const authInitialState: AuthState = {
  username: '',
  password: '',
  oldPassword: '',
  rePassword: '',
  email: '',
  isAuthenticated: false,
  isErrorAt: '',
  isConfirmed: false,
  loading: false,
  remember: false,
  redirect: ''
};

export const authReducer = (
  state: AuthState,
  action: AuthAction | RegisterAction
): AuthState => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };
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
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isConfirmed: action.payload.isConfirmed,
        redirect: action.payload.redirect,
        isErrorAt: '',
        loading: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        helperText: action.payload.helperText,
        isErrorAt: action.payload.isErrorAt,
        redirect: '',
        isConfirmed: false,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        redirect: '/',
        isAuthenticated: false,
        isConfirmed: false,
        username: '',
        password: '',
      };
    case AUTH_SET_ERROR_AT:
      return {
        ...state,
        helperText: action.payload.helperText,
        isErrorAt: action.payload.isErrorAt,
        loading: false,
      };
    default:
      return state;
  }
};
