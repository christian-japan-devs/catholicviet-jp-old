

export type AuthAction = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'isAuthenticated', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'logout', payload: boolean }
  | { type: 'setIsError', payload: boolean };

export type AuthState = {
    username: string
    password: string
    isAuthenticated: boolean
    helperText?: string
    token?: string
    isError: boolean
    loading?: boolean
}

export const authInitialState : AuthState = {
    username : '',
    password : '',
    isAuthenticated: false,
    token: '',
    isError: false
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'isAuthenticated':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'loginSuccess':
            console.log('login ok');
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isAuthenticated: false,
                isError: true
            };
        case 'logout':
            return {
                ...state,
                isAuthenticated: false
            };
        case 'setIsError':
            return {
                ...state,
                isError: false
            };
        default:
            return state;
    }
}