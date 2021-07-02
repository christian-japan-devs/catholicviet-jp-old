import axios from 'axios';
import Moment from 'moment';
import { endpoint } from './apiEndpoint';
import { read, remove, store } from './localStorage';
import {
  VCJTOKEN
  , EXPIRATION_DATE
} from './constants';

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

export const getHeaderWithAuthentication = ()=>{
  let token = `Token ${read(VCJTOKEN)}`;
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
  };
  return headers;
}