import React, { useState, } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
//redux stuff
import { connect } from 'react-redux';
import { authLogin } from './ActionAuth';
import { TAuthState, LoginFormDataValid, LoginFormData } from '../types/TypeAuth';
import Copyright from '../components/Copyright';
import LoginForm from '../components/LoginForm';

export type Props = {
  token: string;
  error: string;
  loading: boolean;
  login: (username: string, password: string) => void;
};

const Login = (props: Props) => {

  const [values, setValues] = useState({ username: '', password: '' } as LoginFormData);
  const [errors, setErrors] = useState({} as LoginFormDataValid);

  const authState = props;
  //console.log(props);

  const loginFormDataValid: LoginFormDataValid = {
    username: '',
    email: '',
    password: '',
    message: ''
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {       //type: React.FormEvent<HTMLFormElement>
    e.preventDefault();
    const { username, password } = values;
    console.log('start login');
    props.login(username, password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {      //type: React.ChangeEvent<HTMLInputElement>
    setValues((values) => ({
      ...values, [e.target.name]: e.target.value,
    }));
  };

  if (authState.token != null) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <LoginForm
          state={authState}
          loginFormData={values}
          formDataValid={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};

//This map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
});

// This map actions to our props in this functional component
const mapActionsToProps = (dispatch: any) => {
  return {
    login: (username: string, passowrd: string) =>
      dispatch(authLogin(username, passowrd)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
