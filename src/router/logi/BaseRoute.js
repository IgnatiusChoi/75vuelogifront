const ERP = '/logi'
const logiRouter = [
  {
    path: `${ERP}/home`,
    name: 'logiHome',
    component: () => import('@/views/logistic/Home.vue'),
    meta: {
      pageTitle: 'LOGI',
      breadcrumb: [
        {
          text: 'LOGI Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/logi-page',
    name: 'logi-page',
    component: () => import('@/views/SecondPage.vue'),
    meta: {
      pageTitle: 'Second Page',
      breadcrumb: [
        {
          text: 'Second Page',
          active: true,
        },
      ],
    },
  },
  {
    path: `${ERP}/home`,
    name: 'logiHome',
    component: () => import('@/views/logistic/Home.vue'),
    meta: {
      pageTitle: 'LOGI',
      breadcrumb: [
        {
          text: 'LOGI Home',
          active: true,
        },
      ],
    },
  },

]
export default logiRouter
