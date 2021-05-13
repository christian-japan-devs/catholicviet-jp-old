import { Route } from 'react-router-dom';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Main from './main/main';

const BaseRouter = () => (
  <>
    <Route exact path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </>
);

export default BaseRouter;
