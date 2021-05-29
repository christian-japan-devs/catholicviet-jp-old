import { TrendingUp } from '@material-ui/icons';
import { type } from 'ramda';
import React, { createContext, useReducer } from 'react';
import {authReducer, authInitialState } from './reducer.auth';



export interface UseAuth {
    isAuthenticated: boolean;
    login: (username:string, password:string) =>  ({data:string , dataError:{error:null}});
    logout: () => void;
}

export const AuthContext = React.createContext<UseAuth>({
    isAuthenticated: false,
    login: (username, password) =>  (
        {data:"string" , dataError:{error:null}}
    ),
    logout: () => {}
})


export const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState)
    return  <AuthContext.Provider value={ {
                    isAuthenticated: false,
                    login: (username, password) =>  (
                        {data:"string" , dataError:{error:null}}
                    ),
                    logout: () => {}
                }} >
                {children}
            </AuthContext.Provider>
}