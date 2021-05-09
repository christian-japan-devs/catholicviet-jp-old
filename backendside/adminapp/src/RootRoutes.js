import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';

import Dashboard from './components/Dashboard';
import MemberManage from './components/MemberManage';
import HomePage from './components/Home';

const RootRouters = () => (
  <Hoc>
    <Route exact path="/member/checkin" component={HomePage} />
    <Route exact path="/member" component={Dashboard} />
    <Route path="/member/listabsent/" component={MemberManage} />
  </Hoc>
);

export default RootRouters;
