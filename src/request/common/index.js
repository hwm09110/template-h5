/**
 * XX模块
 */
import http from '../http';
import Qs from 'qs';

const aa = (params) => http.get('/aa/1', {params}).then(res => res.data);
const bb = (params) => http.get('/aa/1', {params}).then(res => res.data);




export default {
  aa,
  bb,
}
