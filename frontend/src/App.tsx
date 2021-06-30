import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components
import './App.css';
import {
  Login,
  Signup,
  RequestPassword,
  ResetPassword,
  AccountConfirm,
} from './views/AuthPage/authControl';

//Pages
import HomePage from './views/HomePage/HomePage';
import { Profile } from './views/ProfilePage/Profile';
import { AppProvider } from './contexts/AppContext';
import ChurchPage from './views/ChurchPage/Church';
import ChurchDetail from './views/ChurchPage/ChurchDetail';
//Constants
import {
  LINK_LOGIN
  , LINK_SIGNUP
  , LINK_ACCOUNT_CONFIRM
  , LINK_ACCOUNT_PROFILE
  , LINK_ACCOUNT_RESET_PASSWORD
  , LINK_REQUEST_PASSWORD
  , LINK_BAI_VIET_CHI_TIET
  , LINK_CHU_DE_CHI_TIET
  , LINK_NHA_THO
  , LINK_NHA_THO_CHI_TIET
} from './utils/constants';
const App: React.FC = () => {
  return (
    <div className='App'>
      <AppProvider>
        <BrowserRouter>
          <Route exact path='/' component={HomePage} />
          <Route path={LINK_LOGIN} component={Login} />
          <Route path={LINK_SIGNUP} component={Signup} />
          <Route
            path={LINK_REQUEST_PASSWORD}
            component={RequestPassword}
          />
          <Route
            path={LINK_ACCOUNT_RESET_PASSWORD}
            component={ResetPassword}
          />
          <Route
            exact
            path={LINK_ACCOUNT_PROFILE}
            component={Profile}
          />
          <Route
            path={LINK_ACCOUNT_CONFIRM}
            component={AccountConfirm}
          />
          <Route
            exact
            path={LINK_NHA_THO}
            component={ChurchPage}
          />
          <Route
            path={LINK_NHA_THO_CHI_TIET}
            component={ChurchDetail}
          />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
