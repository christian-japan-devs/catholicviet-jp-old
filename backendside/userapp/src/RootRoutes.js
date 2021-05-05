import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";

import Dashboard from "./components/Dashboard";
import MemberManage from "./components/MemberManage";
import HomePage from "./components/Home";

const RootRouters = () => (
    <Hoc>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/gospel" component={Dashboard}/>
        <Route path="/group" component = {MemberManage}/>
    </Hoc>
)

export default RootRouters;