import { TrendingUp } from '@material-ui/icons';
import { type } from 'ramda';
import React, { createContext, useReducer } from 'react';
import {authReducer, authInitialState } from './reducer.auth';



export const AppContext = createContext(authInitialState);


export const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState)
    return  <AppContext.Provider value={authInitialState}>
            {children}
            </AppContext.Provider>
}