

/**
 * @desc: 深拷贝
 * @param {Object}
 * @return {Object}
 */
export function deepCopy(source){
  if(!source && typeof source !== 'object'){
      throw new Error('error')
  }
  var targetObj = source.constructor === Array ? [] : {};
  for(var keys in source){
    if(source.hasOwnProperty(keys)){
      if(source[keys] && typeof source[keys] === 'object' ){
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepCopy(source[keys]);
      }else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/**
 * @desc: 防抖函数
 * @param {type}
 * @return:
 */
export function debounce(fn, delay, options) {
  let timer = null
  let canRun = true
  return function() {
    let context = this
    let args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    if(options && options.immediate){
      timer = setTimeout(() => {
        canRun = true
      }, delay)
      canRun && fn.apply(context, args)
      canRun = !canRun
    }else{
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * @desc: 节流函数
 * @param {type}
 * @return:
 */
export function throttle(fn, wait) {
  let previous = 0
  return function(){
    let now = Date.now()
    let context = this;
    let args = arguments;
    if(now - previous > wait){
      fn.apply(context, args)
      previous = now
    }
  }
}
