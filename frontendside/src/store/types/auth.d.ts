
type FormData = {
    username: string;
    password: string;
};

type AuthStartAction = {
    type: string
}

type AuthSuccessAction = {
    type:  string
    token: string
}

type AuthFailAction = {
    type: string
    error: string
}

type AuthLogoutAction = {
    type:string
}

type DispatchAuthStartType = (args: AuthStartAction) => AuthStartAction;
type DispatchAuthSuccessType = (args: AuthSuccessAction) => AuthSuccessAction;
type DispatchAuthFailType = (args: AuthFailAction) => AuthFailAction;
type DispatchAuthLogoutType = (args: AuthLogoutAction) => AuthLogoutAction;
