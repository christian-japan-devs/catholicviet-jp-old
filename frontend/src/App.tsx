import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components
import './App.css';
import {
  Login,
  Signup,
  ResetPasswordRequest,
  ResetPassword,
} from './views/AuthPage/authControl';
import HomePage from './views/HomePage/HomePage';
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
            component={ResetPasswordRequest}
          />
          <Route
            path="/account/reset-password/"
            component={ResetPassword}
          />
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
