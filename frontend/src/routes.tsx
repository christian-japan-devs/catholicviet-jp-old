import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Hoc from './utils/hoc';

import Login from './logic/Login';
import Signup from './logic/Signup';
import Main from './components/Main';

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </Hoc>
);

export default BaseRouter;
