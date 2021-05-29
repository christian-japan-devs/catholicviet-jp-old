//Utilities
import * as R from 'ramda';
import React, { createContext, useReducer } from 'react';
import { remove, store } from '../utils/localStorage';
import {AuthState, authReducer, authInitialState } from '../utils/reducer.auth';
import { login as LoginUser, Login, logout as LogoutUser } from '../utils/endpoints';
import {loginEndPoint, signUpEndPoint} from '../utils/constants';

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {

	const [state, dispatch] = useReducer(authReducer, authInitialState)

	async function login(data:AuthState) {
		try {
			fetch(loginEndPoint, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: data.username,
					password: data.password
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			})
			.then(resJson => {
				store('token', resJson.key);
				dispatch({
					type: 'loginSuccess',
                    payload:  resJson
				})
			})
			.catch(error => {
				dispatch({
					type: 'loginFailed',
                    payload:  'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại'
				})
			});
		} catch (error) {
			dispatch({
				type: 'loginFailed',
				payload:  'Đã có lỗi hệ thống xảy ra'
			})
		}
	}

	/**
	 * Logout the user from the application
	 * Steps:
	 * 1) Remove user token
	 * 2) Reset the user into the User store. TODO: THIS ONE SHOULD BE COMPLETED
	 * 3) Redirect user to login page
	 */
	async function logout() {
		await LogoutUser();

		remove('token');

		dispatch({ type: 'logout', payload:false });

	}

	return {
		login,
		logout,
	};
}