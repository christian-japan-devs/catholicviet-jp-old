import axios, { AxiosInstance } from 'axios';
import * as R from 'ramda';

// a new instance of axios with a custom config.
const instance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8000/',
	timeout: 1000,
	headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.response.use(response => {
	return R.pathOr(response, ['data'])(response);
});

export default instance;