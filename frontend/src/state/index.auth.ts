import React, { createContext, useContext } from 'react';
import { AuthAction, authInitialState, AuthState } from './reducer.auth';

// Create contexts
export const AuthStateContext = createContext(authInitialState as AuthState);
export const AuthDispatchContext = createContext((() => 0) as React.Dispatch<AuthAction>);

// Use contexts
export const useAuthDispatch = () => useContext(AuthDispatchContext);
export const useAuthState = () => {
    const state: AuthState = useContext(AuthStateContext);
    return state;
}
