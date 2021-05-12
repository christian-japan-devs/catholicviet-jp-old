import axios from 'axios';
import { endpoint } from '../constants';

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
  },
});

export const updateObject = (oldObject: any, updateProperties: any) => {
  return {
    ...oldObject,
    ...updateProperties,
  };
};