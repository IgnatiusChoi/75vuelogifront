import Vue from 'vue'
import VueRouter from 'vue-router'
// import AccountRoute from './account/AccountRoute'

import insaRouter from './hr/BaseRoute'
import logiRouter from './logi'
import accountRouter from './account/BaseRoute'
import commonRouter from './common'

Vue.use(VueRouter)

/* const requireAuth = () => (to, from, next) => {
  if (sessionStorage.getItem('authorityCode')) {
    return next()
  }
  next('/login')
} */

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...insaRouter,
    ...accountRouter,
    ...logiRouter,
    ...commonRouter,
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/hr/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
      beforeEnter: ((to, from, next) => {
        console.log('enter')
        next()
      }),
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (sessionStorage.getItem('authorityCode') === null && to.name !== 'login') {
    next('/login')
  }
  next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
