import axios from 'axios';
import Moment from 'moment';
import { endpoint } from './apiEndpoint';

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
  },
});


/**
 * Convert string to local datetime format
 * @param  {data} key
 * @returns {string} retrun
 */
export const toDate = (data: string) => {
  return Moment(data).format('YYYY-MM-DD')
}

export const toDateTime = (data: string) => {
  return Moment(data).format('HH:mm YYYY-MM-DD')
}