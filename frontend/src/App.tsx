import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components
import './App.css';
import {
  Login,
  Signup,
  ResetPasswordRequest,
  ResetPassword,
} from './hooks/authControl';
import Layout from './components/Layout';
import NewFeed from './components/NewFeed'
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppProvider>
        <Layout>
          <BrowserRouter>
            <Route exact path="/" component={NewFeed} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/account/request-password"
              component={ResetPasswordRequest}
            />
            <Route
              path="/account/resset-password/"
              component={ResetPassword}
            />
          </BrowserRouter>
        </Layout>
      </AppProvider>
    </div>
  );
};

export default App;
