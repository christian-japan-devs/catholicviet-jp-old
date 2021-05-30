import axios from 'axios';
//Utilities
import { remove, store } from '../utils/localStorage';
import { AuthState, AuthAction } from '../utils/reducer.auth';
import { VCJTOKEN, EXPIRATION_DATE } from '../utils/constants';
import {
  loginEndPoint,
  signUpEndPoint,
  resetPassword,
  requestPassword,
} from '../utils/apiEndpoint';

import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from '../utils/actionTypes';

const AuthSuccess = (
  playload: string,
  dispatch: React.Dispatch<AuthAction>
) => {
  dispatch({
    type: AUTH_SUCCESS,
    payload: playload,
  });
};

const AuthFail = (
  payload: { helperText: string; isErrorAt: string },
  dispatch: React.Dispatch<AuthAction>
) => {
  dispatch({
    type: AUTH_FAILED,
    payload: payload,
  });
};

/**
 * Function: useAuth
 * Description:
 *
 * Input:
 * 1)
 * Output:
 */
export const useAuth = () => {
  /**
   * Function: Logout
   * Description:
   *
   * Input:
   * 1) AuthDispatch
   * Output:
   */
  async function Logout(dispatch: React.Dispatch<AuthAction>) {
    //Remove user token when out of date
    remove(VCJTOKEN);
    remove(EXPIRATION_DATE);
    dispatch({
      type: AUTH_LOGOUT,
      payload: false,
    });
  }

  /**
   * Function: CheckAuthTimeout
   * Description:
   *
   * Input:
   * 1) Timeout
   * 2) AuthDispatch
   * Output:
   */
  async function CheckAuthTimeout(
    expirationTime: number,
    dispatch: React.Dispatch<AuthAction>
  ) {
    return () => {
      setTimeout(() => {
        Logout(dispatch);
      }, expirationTime * 1000);
    };
  }

  /**
   * Function: AuthLogin
   * Description:
   *
   * Input:
   * 1) AuthDispatch
   * 2) Data
   * Output:
   */
  async function AuthLogin(
    dispatch: React.Dispatch<AuthAction>,
    data: AuthState
  ) {
    try {
      fetch(loginEndPoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((res) => {
          const token = `token ${res.token}`;
          const expirationDate = String(
            new Date(new Date().getTime() + 3600 * 1000)
          );
          store(VCJTOKEN, token);
          store(EXPIRATION_DATE, expirationDate);
          AuthSuccess(token, dispatch);
          CheckAuthTimeout(3600, dispatch);
        })
        .catch((err) => {
          const payload = {
            helperText: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
            isErrorAt: 'somewhere',
          };
          AuthFail(payload, dispatch);
        });
    } catch (error) {
      dispatch({
        type: AUTH_FAILED,
        payload: {
          helperText: 'Vui lòng kiểm tra lại kết nối mạng',
          isErrorAt: 'somewhere',
        },
      });
    }
  }

  /**
   * Function: AuthSignup
   * Description:
   *
   * Input:
   * 1) AuthDispatch
   * 2) Data
   * Output:
   */
  async function AuthSignup(
    dispatch: React.Dispatch<AuthAction>,
    data: AuthState
  ) {
    try {
      fetch(signUpEndPoint, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((res) => {
          if (res.status === 'ok') {
            const token = res.data.token;
            const expirationDate = String(
              new Date(new Date().getTime() + 3600 * 1000)
            );
            store(VCJTOKEN, token);
            store(EXPIRATION_DATE, expirationDate);
            AuthSuccess(
              'Đăng ký thành công, vui lòng xác nhận tài khoản bằng email.',
              dispatch
            );
            CheckAuthTimeout(3600, dispatch);
          } else {
            if (res.message.email !== undefined) {
              const payload = {
                helperText: 'Vui lòng thử với một địa chỉ email khác.',
                isErrorAt: 'email',
              };
              AuthFail(payload, dispatch);
            }
            if (res.message.username !== undefined) {
              const payload = {
                helperText: 'Vui lòng thử với một tên đăng nhập khác.',
                isErrorAt: 'username',
              };
              AuthFail(payload, dispatch);
            }
          }
        })
        .catch((err) => {
          const payload = {
            helperText:
              'Vui lòng thử với một tên đăng nhập khác hoặc địa chỉ email khác.',
            isErrorAt: 'somewhere',
          };
          AuthFail(payload, dispatch);
        });
    } catch (error) {
      dispatch({
        type: AUTH_FAILED,
        payload: {
          helperText: 'Vui lòng kiểm tra lại kết nối mạng',
          isErrorAt: 'somewhere',
        },
      });
    }
  }

  /**
   * Function: AuthLogin
   * Description:
   *
   * Input:
   * 1) AuthDispatch
   * 2) Data
   * Output:
   */
  async function AuthResetPasswordRequest(
    dispatch: React.Dispatch<AuthAction>,
    data: AuthState
  ) {
    try {
      fetch(requestPassword, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((res) => {
          if (res.status === 'ok') {
            AuthSuccess(
              'Vui lòng kiểm hộp thư đến trong email của bạn để tạo lại mật khẩu mới',
              dispatch
            );
          } else {
            if (res.message.email !== undefined) {
              const payload = {
                helperText: res.message.email,
                isErrorAt: 'email',
              };
              AuthFail(payload, dispatch);
            }
          }
        })
        .catch((err) => {
          const payload = {
            helperText: 'Địa chỉ email không đúng.',
            isErrorAt: 'somewhere',
          };
          AuthFail(payload, dispatch);
        });
    } catch (error) {
      dispatch({
        type: AUTH_FAILED,
        payload: {
          helperText: 'Vui lòng kiểm tra lại kết nối mạng',
          isErrorAt: 'somewhere',
        },
      });
    }
  }

  /**
   * Function: AuthLogin
   * Description:
   *
   * Input:
   * 1) AuthDispatch
   * 2) Data
   * Output:
   */
  async function AuthResetPassword(
    dispatch: React.Dispatch<AuthAction>,
    data: AuthState
  ) {
    try {
      var url_string = window.location.href;
      var url = new URL(url_string);
      var username = url.searchParams.get('username');
      var secretCode = url.searchParams.get('code');

      fetch(resetPassword, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: data.password,
          code: secretCode,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((res) => {
          if (res.status === 'ok') {
            const token = res.data.token;
            const expirationDate = String(
              new Date(new Date().getTime() + 3600 * 1000)
            );
            store(VCJTOKEN, token);
            store(EXPIRATION_DATE, expirationDate);
            AuthSuccess(res.message, dispatch);
            CheckAuthTimeout(3600, dispatch);
          } else {
            if (res.message !== undefined) {
              const payload = {
                helperText: res.message,
                isErrorAt: 'somewhere',
              };
              AuthFail(payload, dispatch);
            }
          }
        })
        .catch((err) => {
          const payload = {
            helperText: 'Không thể đổi mật khẩu, xin vui lòng liên hệ!',
            isErrorAt: 'somewhere',
          };
          AuthFail(payload, dispatch);
        });
    } catch (error) {
      dispatch({
        type: AUTH_FAILED,
        payload: {
          helperText: 'Vui lòng kiểm tra lại kết nối mạng',
          isErrorAt: 'somewhere',
        },
      });
    }
  }

  /**
   * Check the use state
   * Steps:
   * 1) Get the token
   * 2)
   */
  async function AuthCheckState(dispatch: React.Dispatch<AuthAction>) {
    const token = localStorage.getItem(VCJTOKEN);
    if (token === null) {
      localStorage.removeItem(VCJTOKEN);
      localStorage.removeItem(EXPIRATION_DATE);
    } else {
      const strExpirationDate = localStorage.getItem(EXPIRATION_DATE);
      if (strExpirationDate !== null) {
        const expirationDate = new Date(strExpirationDate);
        if (expirationDate <= new Date()) {
          Logout(dispatch);
        } else {
          AuthSuccess('', dispatch);
          CheckAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
            dispatch
          );
        }
      }
    }
  }

  return {
    AuthLogin,
    Logout,
    AuthSignup,
    AuthCheckState,
    AuthResetPassword,
    AuthResetPasswordRequest,
  };
};
