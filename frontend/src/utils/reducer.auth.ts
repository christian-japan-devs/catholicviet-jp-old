import {
  AUTH_SET_UNAME,
  AUTH_SET_UPASS,
  AUTH_SET_REUPASS,
  AUTH_SET_EMAIL,
  AUTH_IS_AUTH,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  AUTH_SET_ERROR_AT,
} from './actionTypes';

export type AuthAction =
  | { type: typeof AUTH_SET_UNAME; payload: string }
  | { type: typeof AUTH_SET_UPASS; payload: string }
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
};

export const authInitialState: AuthState = {
  username: '',
  password: '',
  email: '',
  rePassword: '',
  isAuthenticated: false,
  isErrorAt: '',
  loading: false,
  remember: false,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
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
        isErrorAt: '',
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isErrorAt: '',
      };
    case AUTH_FAILED:
      return {
        ...state,
        helperText: action.payload.helperText,
        isAuthenticated: false,
        isErrorAt: action.payload.isErrorAt,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AUTH_SET_ERROR_AT:
      console.log(action.payload.isErrorAt);
      return {
        ...state,
        helperText: action.payload.helperText,
        isAuthenticated: false,
        isErrorAt: action.payload.isErrorAt,
      };
    default:
      return state;
  }
};
