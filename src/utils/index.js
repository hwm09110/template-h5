/**
 * 工具函数库
 */
import * as functions from './modules/function'
import * as device from './modules/device'
import * as url from './modules/url'

export default {
  ...functions,
  ...device,
  ...url,
}


