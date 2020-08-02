/**
 * @desc: 判断是否微信浏览器
 * @param {type}
 * @return {Boolean}
 */
export function isWeixin(){
  return !!navigator.userAgent.match(/MicroMessenger/i);
}

/**
 * @desc: 判断是否android
 * @param {type}
 * @return {Boolean}
 */
export function isAndroid(){
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

/**
 * @desc: 判断是否ios
 * @param {type}
 * @return {Boolean}
 */
export function isIOS(){
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
