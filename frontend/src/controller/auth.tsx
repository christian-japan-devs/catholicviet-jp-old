import React, { useState, useReducer } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import Copyright from '../components/Copyright';
import { LoginForm } from '../components/Login';

import { useAuth } from '../hooks/useAuth';
import { AuthState, authInitialState, authReducer } from '../utils/reducer.auth'

export type Props = {
  hiden: boolean;
};

const Login = (props: Props) => {
  const { login } = useAuth();
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  console.log(state);
  const {
    isAuthenticated,
    helperText,
    isError,
    loading } = state;

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log('start login');
    await login(state);
    console.log(state);
  };

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: 'setUsername',
          payload: event.target.name
        });
        return;
      }
      case 'password': {
        dispatch({
          type: 'setPassword',
          payload: event.target.name
        });
        return;
      }
    }
  };

  //console.log(props);

  if (isAuthenticated) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <LoginForm
          state={state}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
        />
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

export default Login;