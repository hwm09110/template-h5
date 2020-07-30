import axios from 'axios';
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});


//添加请求拦截器
http.interceptors.request.use( config => {
  const appType = '1';
  if (config.method === 'post') {
    if(config.data) {
      config.data += `&app=${appType}`
    }else{
      config.data = `app=${appType}`
    }
    // config.data._t = Date.parse(new Date()) / 1000
  } else if (config.method === 'get') {
    config.params = {
      ...config.params,
      app: appType,
       _t: Date.parse(new Date()) / 1000,
    }
  }
  return config;
}, error => {
  // error 的回调信息,看贵公司的定义
  return Promise.reject(error);
});


//添加响应拦截器
http.interceptors.response.use(res => {
  //code 9001 非登录或登录失效
  if(res.data){
    if(res.data.code == '9001'){
      Vue.prototype.$toast(res.data.message)
    }
  }else{
    Vue.prototype.$toast('请求服务器出错！')
  }
  return res;
},error => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  // const responseCode = error.response.status;
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      Vue.prototype.$toast('请求超时，请检查网络是否连接正常')
    } else {
      Vue.prototype.$toast('请求失败，请检查网络是否已连接')
    }
    return
  }
  return Promise.reject(error);
});

export default http;
