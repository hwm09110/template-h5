/**
 * @desc: 获取url参数
 * @param {String}
 * @return:
 */
export function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
}

/**
 * @desc: 对象序列化
 * @param {Object}
 * @return:
 */
export function stringfyQs(obj) {
  if (!obj) return ''
  let pairs = []

  for (let key in obj) {
    let value = obj[key]
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]))
      }
      continue
    }
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
  }
  return pairs.join('&')
}
