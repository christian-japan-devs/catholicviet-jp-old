import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </BrowserRouter>
  );
}

export default App;
