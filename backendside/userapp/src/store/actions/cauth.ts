import axios from 'axios';
import * as actionTypes from './actionTypes';
import { VCJTOKEN, EXPIRATION_DATE } from '../../constants';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error: string) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem(VCJTOKEN);
  localStorage.removeItem(EXPIRATION_DATE);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    axios
      .post('http://127.0.0.1:8000/rest-auth/login/', {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = `token ${res.data.key}`;
        const expirationDate = String(
          new Date(new Date().getTime() + 3600 * 1000)
        );
        localStorage.setItem(VCJTOKEN, token);
        localStorage.setItem(EXPIRATION_DATE, expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  return (dispatch: any) => {
    dispatch(authStart());
    axios
      .post('http://127.0.0.1:8000/rest-auth/registration/', {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = String(
          new Date(new Date().getTime() + 3600 * 1000)
        );
        localStorage.setItem(VCJTOKEN, token);
        localStorage.setItem(EXPIRATION_DATE, expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(VCJTOKEN);
    if (token === null) {
      dispatch(logout());
    } else {
      const strExpirationDate = localStorage.getItem(EXPIRATION_DATE);
      if (strExpirationDate !== null) {
        const expirationDate = new Date(strExpirationDate);
        if (expirationDate <= new Date()) {
          dispatch(logout());
        } else {
          dispatch(authSuccess(token));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    }
  };
};
