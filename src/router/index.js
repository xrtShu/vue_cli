import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 默认路由地址
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userId = '2018.6.1'
  if (userId === '' || typeof userId === 'undefined') {
    if (to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
