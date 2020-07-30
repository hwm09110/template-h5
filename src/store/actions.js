import * as types from './mutations-type'
import http from '@/request'
import { Toast } from 'vant'


//维持登录态
const setKeepLgoin = () => {
  const time = 10*60*1000 //十分钟
  setInterval(() => {
    http.keepAlive()
  }, time)
}


export default {
  setKeepLgoin
}
