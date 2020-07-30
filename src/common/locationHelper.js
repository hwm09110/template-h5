// 获取当前地理位置信息
import axios from 'axios';

// 获取当前位置
const getLocatinUrl = `//ip.ws.126.net/ipquery?ie=utf-8` //获取位置

export function getLocationInfo() {
  return axios.get(getLocatinUrl)
  .then(function (res) {
    if(res.status == 200 && res.data) {
      let resultStr = res.data;
      let result = resultStr.match(/.+lc="(.*)";.*/);
      let result2 = resultStr.match(/.+lo="(.*)",.*/);
      let cityName = result && result[1];
      let provName = result2 && result2[1];
      console.log(cityName, provName);
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}
