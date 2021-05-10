export type FormData = {
  username: string;
  holyname:string;
  name:string;
  email: string;
  address:string;
  password1: string;
  password2: string;
  message: string;
};

type AuthStartAction = {
  type: string;
};

type AuthSuccessAction = {
  type: string;
  token: string;
};

type AuthFailAction = {
  type: string;
  error: string;
};

type AuthLogoutAction = {
  type: string;
};

type DispatchAuthStartType = (args: AuthStartAction) => AuthStartAction;
type DispatchAuthSuccessType = (args: AuthSuccessAction) => AuthSuccessAction;
type DispatchAuthFailType = (args: AuthFailAction) => AuthFailAction;
type DispatchAuthLogoutType = (args: AuthLogoutAction) => AuthLogoutAction;
