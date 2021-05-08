import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Main from './main/main'
import Provinces from './admin/Provinces';
import LoginForm from "./components/auth/Login";

function App() {
  return (
      <BrowserRouter>
          <Route exact path="/" component={Main}/>
          <Route path="/login" component={LoginForm} />
          <Route path="/admin/province" component={Provinces}/>
      </BrowserRouter>
  );
}

export default App;
