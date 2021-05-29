import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// Shared components

// Local components

//Utilities and hooks
//import history from "helpers/history";
//import { read } from "helpers/localStorage";
//import { authReducer, authInitialState } from "state/reducer.auth";

import './App.css';
import { LoginForm } from './components/Login';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LoginForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
