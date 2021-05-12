
export type ResgisterState = {
    loading: boolean;
    status: string;
    result: string;
};

export type RegisterAction = {
    type: string,
    data: {};
    loading: boolean;
    status: boolean;
}

export type DispatchRegisterType = (args: RegisterAction) => RegisterAction;