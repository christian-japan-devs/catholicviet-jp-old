import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authSignup } from './ActionAuth';
import { TAuthState,SignUpFormData } from '../types/TypeAuth';
import Copyright from '../components/Copyright';
import SignupForm from '../components/SignupForm';


export type Props = {
  token: string;
  error: string;
  loading: boolean;
  signup: (formData:SignUpFormData) => void;
};


const Signup = (props: Props) => {
  const [values, setValues] = useState({} as SignUpFormData);
  const [errors, setErrors] = useState({} as SignUpFormData);
  const authState = props;

  const formDataValid: SignUpFormData = {
    username: '',
    holyname: '',
    name: '',
    email: '',
    address: '',
    password1: '',
    password2: '',
    message: ''
  }

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (values.username.length <= 8) {         // client side validation here
      formDataValid.username = 'Tên đăng nhập phải dài hơn 8 ký tự';
      setErrors(formDataValid);
    } else {
      formDataValid.username = '';
      setErrors(formDataValid);
      props.signup(values);
    }
  }

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values, [e.target.name]: e.target.value,
    }))
  }

  if (authState.token != null) {
    return (
      <Redirect to='/' /> //welcome popup show here
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <SignupForm 
          state={authState}
          signUpFormData={values}
          formDataValid={errors}
          handleChange={handleChange}
          handleSignup={handleSignup}
        />
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
};


//Map the states to local props
const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
});

// map actions to local props in this functional component

const mapActionsToProps = (dispatch: any) => {
  return {
    signup: (formData:SignUpFormData) =>
      dispatch(authSignup(formData.username, formData.email, formData.password1, formData.password2)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
