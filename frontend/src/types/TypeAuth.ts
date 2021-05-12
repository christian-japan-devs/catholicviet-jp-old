export type LoginFormData = {
  username: string;
  password: string;
};

export type LoginFormDataValid = {
  username: string;
  email: string;
  password: string;
  message: string;
};

export type SignUpFormData = {
  username: string;
  holyname: string;
  name: string;
  email: string;
  address: string;
  password1: string;
  password2: string;
  message: string;
};

export type TAuthState = {
    token: string;
    error: string;
    loading: boolean;
};

export type AuthAction = {
  type: string;
  token: string;
  error: string;
  loading: boolean;
}

export type AuthStartAction = {
  type: string;
};

export type AuthSuccessAction = {
  type: string;
  token: string;
};

export type AuthFailAction = {
  type: string;
  error: string;
};

export type AuthLogoutAction = {
  type: string;
};

export type DispatchAuthLoginType = (args: AuthAction) => AuthAction;
export type DispatchAuthSuccessType = (args: AuthSuccessAction) => AuthSuccessAction;
export type DispatchAuthFailType = (args: AuthFailAction) => AuthFailAction;
export type DispatchAuthLogoutType = (args: AuthLogoutAction) => AuthLogoutAction;
