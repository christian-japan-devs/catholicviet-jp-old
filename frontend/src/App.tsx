import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components

// Local components

//Utilities and hooks
import { read } from "./utils/localStorage";
import {AuthProvider} from './utils/authState';
import './App.css';
import Login from './controller/auth';
import SignupForm from './components/Signup';


const App: React.FC = () =>{

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignupForm} />
        </BrowserRouter>
      </AuthProvider>
		</div>
  );
}

export default App;
