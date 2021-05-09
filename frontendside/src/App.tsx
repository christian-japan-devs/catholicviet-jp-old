import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main/main';
import Provinces from './admin/Provinces';
import Login from './components/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/admin/province" component={Provinces} />
    </BrowserRouter>
  );
}

export default App;
