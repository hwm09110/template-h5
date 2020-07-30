import router from './router';


//全局前置导航守卫
router.beforeEach( async (to,from,next)=>{
  console.log('route from', from)
  console.log('route to', to)
  let title = to.meta.title

  if(title){
    if(to.name == 'index'){
      document.title = "首页"
    }else{
      document.title = title
    }
  }

  next()
})

export default router
