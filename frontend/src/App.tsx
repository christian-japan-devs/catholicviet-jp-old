import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components

//Utilities and hooks
import { read } from './utils/localStorage';
import './App.css';
import {
  Login,
  Signup,
  ResetPasswordRequest,
  ResetPassword,
} from './controller/authControl';
import Layout from './components/Layout';
import { authInitialState, authReducer } from './utils/reducer.auth';
import { AuthDispatchContext, AuthStateContext } from './contexts/AuthContext';

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(authReducer, authInitialState);

  React.useEffect(() => {
    if (read('token')) {
      dispatch({
        type: 'isAuthenticated',
        payload: false, //TODO: true here cannot go to login when isAuthenticated
      });
    }
  }, []);

  return (
    <div className="App">
      <AuthDispatchContext.Provider value={dispatch}>
        <AuthStateContext.Provider value={state}>
          <BrowserRouter>
            <Route exact path="/" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/account/request-password"
              component={ResetPasswordRequest}
            />
            <Route path="/account/resset-password/" component={ResetPassword} />
          </BrowserRouter>
        </AuthStateContext.Provider>
      </AuthDispatchContext.Provider>
    </div>
  );
};

export default App;
