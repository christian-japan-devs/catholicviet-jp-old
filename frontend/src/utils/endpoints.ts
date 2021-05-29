import api from './api';

interface BaseRequest<T = {}>{
    data: T;
}

/////////Authentication functions
export interface Login {
    username: string;
    password: string;
}

export const login = (user: Login): Promise<BaseRequest<{ success: boolean }>> =>{
    return api.post('/rest-auth/login',{ username: user.username, password: user.password });
}

export const logout = (): Promise<any> => {
	return api.post("logout");
};

///// Fames
export interface Mass {
	id: string;
	name: string;
	image: string;
}

export const fetchMass = (id?: string): Promise<BaseRequest<Mass>> => {
	return api.get(`api/mass/${id}`);
};

export const fetchMasses = (): Promise<BaseRequest<{ list: Mass[] }>> => {
	return api.get('api/mass/');
};