// 控制页面级组件缓存
import store from '@/store'

/**
 * 控制页面组件缓存
 * @param { route } to
 * @param { route } from
 */
export async function controlRouteCache(to, from) {
  let cacheToRouteName = ['absencenewdetail', 'absencenewapply', 'zynoticedetail', 'xynoticedetail']; //to 路由名称
  let clearCacheFromRouteName = ['absencenewlist', 'zynoticelist', 'xynoticelist']; //from 路由名称
  let cacheName = ['AbsencenewIndex', 'ZynoticeIndex', 'XynoticeIndex']; //要缓存的页面组件(注意要存组件的name，不是路由name)

  if(cacheToRouteName.includes(to.name)) {
    store.commit('SET_CACHEROUTE', cacheName);
    console.log('缓存组件', cacheName);
  } else {
    if(clearCacheFromRouteName.includes(from.name)) {
      store.commit('SET_CACHEROUTE', []);
      console.log('清除缓存组件');
    }
  }
}

/**
 * 清store里面的 cacheRoute
 * @param { String | Array } name
 */
export async function clearCacheName(name) {
  let newCacheName = [];

  if(typeof name === 'string') {
    newCacheName = store.state.cacheRoute.filter(item => item !== name);
  } else if(Array.isArray(name)) {
    newCacheName = store.state.cacheRoute.filter(item => !name.includes(item));
  }
  console.log('newCacheName', newCacheName);
  store.commit('SET_CACHEROUTE', newCacheName);
}

