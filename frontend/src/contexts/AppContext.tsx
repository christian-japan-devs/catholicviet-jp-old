import React,
{
    createContext
    , useReducer
    , Dispatch
} from 'react';

// Reducer import
import {
    authReducer
    , AuthAction
    , authInitialState
    , AuthState
} from '../hooks/reducer.auth';
import {
    registerReducer
    , RegisterAction
    , RegisterState
    , initialRegisterState
} from '../hooks/reducer.app';

type InitialStateType = {
    auth: AuthState;
    register: RegisterState[]
}

const initialAppState = {
    auth: authInitialState,
    register: [initialRegisterState]
}

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<AuthAction | RegisterAction>;
}>({
    state: initialAppState,
    dispatch: () => null
});

const appReducer = (
    { auth, register }: InitialStateType,
    action: AuthAction | RegisterAction
) => ({
    auth: authReducer(auth, action),
    register: registerReducer(register, action)
});

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };