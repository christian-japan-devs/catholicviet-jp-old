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

const App: React.FC = () => {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/account/request-password"
            component={RequestPassword}
          />
          <Route
            path="/account/reset-password/"
            component={ResetPassword}
          />
          <Route
            exact
            path='/account/profile'
            component={Profile}
          />
          <Route
            path="/account/confirm/"
            component={AccountConfirm}
          />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
