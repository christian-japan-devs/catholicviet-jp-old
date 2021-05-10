import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main/main';
import Provinces from './admin/Provinces';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/admin/province" component={Provinces} />
    </BrowserRouter>
  );
}

export default App;
