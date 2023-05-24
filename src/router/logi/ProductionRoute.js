const ProductionRoute = [

  {
    path: '/logi/production/mps',
    name: 'mps',
    component: () => import('@/views/logistic/production/mps/MpsPage'),
    meta: {
      pageTitle: 'Mps 등록',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '주생산계획(MPS)',
        },
      ],
    },
  },
  {

    path: '/logi/production/mrpRegister',
    name: 'mrpRegister',
    component: () => import('@/views/logistic/production/mrp/MrpRegisterPage'),
    meta: {
      pageTitle: '소요량전개',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '소요량전개(MRP)',
        },
        {
          text: '소요량전개',
        },
      ],
    },
  },
  {
    path: '/logi/production/mrpInfo',
    name: 'mrpInfo',
    component: () => import('@/views/logistic/production/mrp/MrpInfoPage'),
    meta: {
      pageTitle: '소요량전개/취합 조회',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '소요량전개/취합(MRP)',
        },
        {
          text: '소요량전개/취합 조회',
        },
      ],
    },
  },
  {
    path: '/logi/production/WorkInstruction',
    name: 'workInstruction',
    component: () => import('@/views/logistic/production/WorkInstructionPage'),
  },
  {
    path: '/logi/production/workPlace',
    name: 'workPlace',
    component: () => import('@/views/logistic/production/WorkSite.vue'),
    meta: {
      pageTitle: '작업장/작업장로그',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '작업장/작업장로그',
        },

      ],
    },
  },
]
export default ProductionRoute
