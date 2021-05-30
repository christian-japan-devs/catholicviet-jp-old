import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
// Shared components
import Copyright from '../components/Copyright';
import { LoginForm } from '../components/Login';
import { SignupForm } from '../components/Signup';
import { ResetPasswordRequestForm } from '../components/ResetPasswordRequest';
import { ResetPasswordForm } from '../components/ResetPassword';
//
import { useAuth } from './authAction';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';
import {
  AUTH_SET_UNAME,
  AUTH_SET_UPASS,
  AUTH_SET_REUPASS,
  AUTH_SET_EMAIL,
  AUTH_SET_ERROR_AT
} from '../utils/actionTypes';
import { ValidateEmail, ValidatePassword } from '../utils/formValidation';

export type Props = {
  hiden: boolean;
};

/**
* Function: AuthLogin
* Description:
* 
* Input:
* 1) AuthDispatch
* 2) Data
* Output:
*/
export const Login = (props: Props) => {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  const { AuthLogin } = useAuth();

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (state.username.length <= 5) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'username',
          helperText: 'Tên đăng nhập phải dài hơn 5 ký tự'
        }
      })
    } else if (state.password.length < 8) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: 'Mật khẩu phải dài tối thiểu 8 ký tự'
        }
      })
    } else {
      await AuthLogin(dispatch, state);
    }
  };

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: AUTH_SET_UNAME,
          payload: event.target.value
        });
        return;
      }
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value
        });
        return;
      }
    }
  };

  if (state.isAuthenticated) {
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

/**
* Function: AuthLogin
* Description:
* 
* Input:
* 1) AuthDispatch
* 2) Data
* Output:
*/

export const Signup = (props: Props) => {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  const { AuthSignup } = useAuth();

  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (state.username.length <= 5) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'username',
          helperText: 'Tên đăng nhập phải dài hơn 5 ký tự'
        }
      })
      return;
    }
    var femail = ValidateEmail(state.email);
    if (!femail) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'email',
          helperText: 'Địa chỉ email không hợp lệ'
        }
      })
      return;
    }
    var isPassValid = ValidatePassword(state.password, state.username);
    if (!isPassValid.check) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: isPassValid.helperText
        }
      })
      return;
    }
    if (state.rePassword !== state.password) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'rePassword',
          helperText: 'Mật khẩu xác nhận phải trùng nhau'
        }
      })
      return;
    }
    console.log('user signup');
    await AuthSignup(dispatch, state);
  };

  //Handle form input change
  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: AUTH_SET_UNAME,
          payload: event.target.value
        });
        return;
      }
      case 'email': {
        dispatch({
          type: AUTH_SET_EMAIL,
          payload: event.target.value
        });
        return;
      }
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value
        });
        return;
      }
      case 'rePassword': {
        dispatch({
          type: AUTH_SET_REUPASS,
          payload: event.target.value
        });
        return;
      }
      case 'agree': {
        dispatch({
          type: 'setPassword',
          payload: event.target.value
        });
        return;
      }
    }
  };

  //Load register form
  if (state.isAuthenticated) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <SignupForm
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

/**
* Function: ResetPasswordRequest
* Description:
* TODO: check if token is still valid no need to send email.
* Input:
* 1) AuthDispatch
* 2) Data
* Output:
*/
export const ResetPasswordRequest = (props: Props) => {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  const { AuthResetPasswordRequest } = useAuth();

  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    var femail = ValidateEmail(state.email);
    if (!femail) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'email',
          helperText: 'Địa chỉ email không hợp lệ'
        }
      })
      return;
    }
    console.log('user reset password requeset');
    await AuthResetPasswordRequest(dispatch, state);
  };

  //Handle form input change
  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: AUTH_SET_UNAME,
          payload: event.target.value
        });
        return;
      }
      case 'email': {
        dispatch({
          type: AUTH_SET_EMAIL,
          payload: event.target.value
        });
        return;
      }
    }
  };

  //Load register form
  if (state.isAuthenticated) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ResetPasswordRequestForm
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

/**
* Function: ResetPassword
* Description:
*
* Input:
* 1) 
* 2)
* Output:
*/

export const ResetPassword = (props: Props) => {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  const { AuthResetPassword } = useAuth();

  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    var isPassValid = ValidatePassword(state.password);
    if (!isPassValid.check) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: isPassValid.helperText
        }
      })
      return;
    }
    if (state.rePassword !== state.password) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'rePassword',
          helperText: 'Mật khẩu xác nhận phải trùng nhau'
        }
      })
      return;
    }
    console.log('user reset password requeset');
    await AuthResetPassword(dispatch, state);
  };

  //Handle form input change
  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value
        });
        return;
      }
      case 'rePassword': {
        dispatch({
          type: AUTH_SET_REUPASS,
          payload: event.target.value
        });
        return;
      }
    }
  };

  //Load register form
  if (state.isAuthenticated) {
    return (
      <Redirect to='/' />
    )
  } else {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ResetPasswordForm
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