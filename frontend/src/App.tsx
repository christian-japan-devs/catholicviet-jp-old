import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Shared components

// Local components

//Utilities and hooks
import { read } from "./utils/localStorage";
import { AuthProvider } from './utils/authState';
import './App.css';
import Login from './controller/auth';
import SignupForm from './components/Signup';
import { AuthState, authInitialState, authReducer } from './utils/reducer.auth'
import { AppDispatchContext, AppStateContext } from './contexts/AuthContext';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  React.useEffect(() => {
    if (read("token")) {
      console.log('readed token');
      dispatch({
        type: 'loginSuccess',
        payload: ''
      });
    }
  }, []);

  return (
    <div className="App">
      <AppDispatchContext.Provider value={dispatch}>
        <AppStateContext.Provider value={state}>
          <BrowserRouter>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignupForm} />
          </BrowserRouter>
        </AppStateContext.Provider>
      </AppDispatchContext.Provider>
    </div>
  );
}

export default App;
