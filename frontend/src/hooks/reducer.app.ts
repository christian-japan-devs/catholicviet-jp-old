import { RegisterActionTypes } from '../utils/actionTypes';
import { AuthAction } from './reducer.auth';

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
}

//Registration
export type MassType = {
    id: number,
    title?: string
}

export const initialMassState: MassType = {
    id: 0,
    title: ''
}

export type RegisterState = {
    id: number,
    mass?: MassType,
    seat?: string,
    status?: string,
    code?: string
}

export const initialRegisterState: RegisterState = {
    id: 0,
    mass: initialMassState,
    status: '',
    code: ''
}

type RegisterPayload = {
    [RegisterActionTypes.register]: {
        id: number,
        mass: MassType,
        seat: string,
        status: string,
        code: string
    };
    [RegisterActionTypes.confirm]: {
        id: number,
        status: string,
    };
    [RegisterActionTypes.cancel]: {
        id: number;
    }
}

export type RegisterAction =
    ActionMap<RegisterPayload>[keyof ActionMap<RegisterPayload>];

export const registerReducer = (
    state: RegisterState[],
    action: RegisterAction | AuthAction
) => {
    switch (action.type) {
        case RegisterActionTypes.register:
            return [
                ...state,
                {
                    id: action.payload.id,
                    mass: action.payload.mass,
                    status: action.payload.status,
                    code: action.payload.code
                }
            ];
        case RegisterActionTypes.confirm:
            return [
                ...state,
                {
                    id: action.payload.id,
                    status: action.payload.status,
                }
            ];
        case RegisterActionTypes.cancel:
            return [
                ...state.filter(register => register.id !== action.payload.id)
            ];
        default:
            return state;
    }
}