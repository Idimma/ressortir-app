import axios from 'axios/index';
import { getToken } from './NavigationRef';

// const baseURL = 'https://dev.ownafarm.biz/api/v1/';
const baseURL = 'https://prod.ownafarm.biz/api/v1/';
/**
 * Configure axios to automatically add baseUrl and authorization to needed api request
 */

const Request = () => {
  const instance = axios.create({ baseURL });
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return instance;
};
export default Request;
