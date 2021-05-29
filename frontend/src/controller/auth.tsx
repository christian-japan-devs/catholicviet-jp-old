import React, { useState, } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import Copyright from '../components/Copyright';
import {LoginForm} from '../components/Login';

import {useAuth} from '../hooks/useAuth';
import {AuthState, authInitialState} from '../utils/reducer.auth'

export type Props = {
  hiden: boolean;
};

const Login = (props: Props) => {
    const { login } = useAuth();
    const [ data, setData ] = React.useState(authInitialState);
    const [ loading, setLoading ] = React.useState(false);
    const [ errors, setErrors ] = React.useState(false);

    const handleOnSubmit = async (evt:React.FormEvent) => {
        evt.preventDefault();
        setLoading(true);
        setData({
            ...data,
            isError: false
        });
        console.log('start login');
        const { username, password } = data;
        await login({username, password});
        setLoading(false);
        if (data && props.hiden) {
          setData({
            ...data,
            isError: true
        });
        }
    };

    const handleChange = (event:any) => {
        setData((data) => ({
            ...data,
            [event.target.name]: event.target.value,
        }));
    };

  //console.log(props);

  if (data.isAuthenticated) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <LoginForm
          state={data}
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