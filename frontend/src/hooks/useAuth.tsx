//Utilities
import history, { push, getRedirectPath } from '../utils/history'
import * as R from "ramda";
import React, { createContext, useReducer } from 'react';
import { remove, store } from "../utils/localStorage";
import {authReducer, authInitialState } from '../utils/reducer.auth';
import { login as LoginUser, Login, logout as LogoutUser } from "../utils/endpoints";

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {

	const [state, dispatch] = useReducer(authReducer, authInitialState)

	async function login({ username, password }: Login) {
		try {
			const res = await LoginUser({
				username,
				password,
			});

			const isSuccess = res.data.success;
			if (isSuccess) {
				store("token", "test-isSuccess");

				dispatch({
					type: 'loginSuccess',
                    payload: ''
				});

				const redirectPath = R.pathOr(null, ["query", "redirect"])(history.location);
				if (redirectPath) {
					push(redirectPath);
					return;
				}

				push("/");
			} else {
				// eslint-disable-next-line no-throw-literal
				throw { message: "Something went wrong" };
			}
		} catch (error) {
			throw error;
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

		remove("token");

		dispatch({ type: 'logout', payload:false });

		push(`/auth/login?redirect=${getRedirectPath()}`);
	}

	return {
		login,
		logout,
	};
}