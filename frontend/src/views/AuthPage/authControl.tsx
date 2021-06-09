import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
// Shared componentss
import { LoginForm } from '../../components/Login';
import { SignupForm } from '../../components/Signup';
import { ResetPasswordRequestForm } from '../../components/RequestPassword';
import { ResetPasswordForm } from '../../components/ResetPassword';
import Layout from '../../components/Layout';
//Utils
import {
  ValidateEmail
  , ValidatePassword
} from '../../utils/formValidation';
import {
  AUTH_SET_UNAME
  , AUTH_SET_UPASS
  , AUTH_SET_OLDPASS
  , AUTH_SET_REUPASS
  , AUTH_SET_EMAIL
  , AUTH_SET_ERROR_AT
} from '../../utils/actionTypes';
//App context
import { AppContext } from '../../contexts/AppContext';
//Auth actions
import { useAuth } from '../../hooks/authAction';

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
export const Login = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { AuthLogin } = useAuth();
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (state.auth.username.length <= 5) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'username',
          helperText: 'Tên đăng nhập phải dài hơn 5 ký tự',
        },
      });
    } else if (state.auth.password.length < 8) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: 'Mật khẩu phải dài tối thiểu 8 ký tự',
        },
      });
    } else {
      await AuthLogin(dispatch, state.auth);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: AUTH_SET_UNAME,
          payload: event.target.value,
        });
        return;
      }
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value,
        });
        return;
      }
    }
  };

  if (state.auth.isAuthenticated) {
    if (state.auth.redirect) {  // return to profile page
      return <Redirect to={state.auth.redirect} />
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return (
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <LoginForm
            state={state.auth}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        </Container>
      </Layout>
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

export const Signup = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { AuthSignup } = useAuth();
  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (state.auth.username.length <= 5) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'username',
          helperText: 'Tên đăng nhập phải dài hơn 5 ký tự',
        },
      });
      return;
    }
    const femail = ValidateEmail(state.auth.email);
    if (!femail) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'email',
          helperText: 'Địa chỉ email không hợp lệ',
        },
      });
      return;
    }
    const isPassValid = ValidatePassword(state.auth.password, state.auth.username);
    if (!isPassValid.check) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: isPassValid.helperText,
        },
      });
      return;
    }
    if (state.auth.rePassword !== state.auth.password) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'rePassword',
          helperText: 'Mật khẩu xác nhận phải trùng nhau',
        },
      });
      return;
    }
    await AuthSignup(dispatch, state.auth);
  };

  //Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'username': {
        dispatch({
          type: AUTH_SET_UNAME,
          payload: event.target.value,
        });
        return;
      }
      case 'email': {
        dispatch({
          type: AUTH_SET_EMAIL,
          payload: event.target.value,
        });
        return;
      }
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value,
        });
        return;
      }
      case 'rePassword': {
        dispatch({
          type: AUTH_SET_REUPASS,
          payload: event.target.value,
        });
        return;
      }
      case 'agree': {
        dispatch({
          type: 'setPassword',
          payload: event.target.value,
        });
        return;
      }
    }
  };

  //Load register form
  if (state.auth.isAuthenticated) {
    if (state.auth.redirect) {  // return to profile page
      return <Redirect to={state.auth.redirect} />
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return (
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignupForm
            state={state.auth}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        </Container>
      </Layout>
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
export const ResetPasswordRequest = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { AuthResetPasswordRequest } = useAuth();

  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const femail = ValidateEmail(state.auth.email);
    if (!femail) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'email',
          helperText: 'Địa chỉ email không hợp lệ',
        },
      });
      return;
    }
    await AuthResetPasswordRequest(dispatch, state.auth);
  };

  //Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email': {
        dispatch({
          type: AUTH_SET_EMAIL,
          payload: event.target.value,
        });
        return;
      }
    }
  };

  const handleOnClear = () => {
    dispatch({
      type: AUTH_SET_EMAIL,
      payload: "",
    });
  }

  //Load register form
  if (state.auth.isAuthenticated) {
    return <Redirect to="/account/reset-password" />;
  } else {
    return (
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ResetPasswordRequestForm
            state={state.auth}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
            handleOnClear={handleOnClear}
          />
        </Container>
      </Layout>
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

export const ResetPassword = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { AuthResetPassword } = useAuth();

  //Handle Submit change
  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const isoldPassValid = ValidatePassword(state.auth.password);
    if (!isoldPassValid.check) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'oldPassword',
          helperText: isoldPassValid.helperText,
        },
      });
      return;
    }
    const isPassValid = ValidatePassword(state.auth.password);
    if (!isPassValid.check) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'password',
          helperText: isPassValid.helperText,
        },
      });
      return;
    }
    if (state.auth.rePassword !== state.auth.password) {
      dispatch({
        type: AUTH_SET_ERROR_AT,
        payload: {
          isErrorAt: 'rePassword',
          helperText: 'Mật khẩu xác nhận phải trùng nhau',
        },
      });
      return;
    }
    await AuthResetPassword(dispatch, state.auth);
  };

  //Handle form input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'password': {
        dispatch({
          type: AUTH_SET_UPASS,
          payload: event.target.value,
        });
        return;
      }
      case 'rePassword': {
        dispatch({
          type: AUTH_SET_REUPASS,
          payload: event.target.value,
        });
        return;
      }
      case 'oldPassword': {
        dispatch({
          type: AUTH_SET_OLDPASS,
          payload: event.target.value,
        })
      }
    }
  };

  const handleOnClear = () => {
    dispatch({
      type: AUTH_SET_OLDPASS,
      payload: "",
    });
  }

  //Load register form
  if (state.auth.redirect) {
    return <Redirect to={state.auth.redirect} />;
  } else {
    return (
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <ResetPasswordForm
            state={state.auth}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
            handleOnClear={handleOnClear}
          />
        </Container>
      </Layout>
    );
  }
};
