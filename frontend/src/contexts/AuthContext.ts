import { createContext, useContext } from "react";
import { AuthAction, authInitialState, AuthState } from "../utils/reducer.auth";

// Create contexts
export const AppStateContext = createContext(authInitialState as AuthState);
export const AppDispatchContext = createContext((() => 0) as React.Dispatch<AuthAction>);

// Use contexts
export const useAppDispatch = () => useContext(AppDispatchContext);
export const useAppState = () => {
	const state: AuthState = useContext(AppStateContext);
	return state;
};