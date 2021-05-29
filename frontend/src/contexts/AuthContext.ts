import React from 'react';
import axios from 'axios';
import { VCJTOKEN, EXPIRATION_DATE,loginEndPoint, signUpEndPoint } from '../utils/constants';

export interface UseAuth {
    isAuthenticated: boolean;
    login: (username:string, password:string) =>  ({data:string , dataError:{error:null}});
    logout: () => void;
}

export const authContext = React.createContext<UseAuth>({
    isAuthenticated: false,
    login: (username, password) =>  (
        {data:"string" , dataError:{error:null}}
    ),
    logout: () => {}
})