import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Main from './main/main';

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Hoc>
);

export default BaseRouter;
