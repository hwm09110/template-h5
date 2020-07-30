import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Index from '../pages/Index' //Index
import Error from '../pages/Error' //404

Vue.use(Router)

// webpack导入各个模块的路由
let requireRouteFilePaths = require.context('./', true, /^.\/.*\/.*\.js$/)
let otherRoutes = requireRouteFilePaths.keys()
                  .map(routeFilePath => requireRouteFilePaths(routeFilePath)["default"])
                  .reduce((prev,next) => prev.concat(next))


const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: "index"}
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta:{title:'电子班牌'}
    },
    ...otherRoutes,
    {
      path: '*',
      name: '404',
      component: Error,
      meta:{title:'404'}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});


export default router;
