const ProductionRoute = [

  {
    path: '/logi/production/contractRegistMps',
    name: 'contractRegistMps',
    component: () => import('@/views/logistic/production/mps/contractRegistMps.vue'),
    meta: {
      pageTitle: 'Mps 등록',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '주생산계획(MPS)',
        },
        {
          text: '수주로 MPS 등록',
        },
      ],
    },
  },
  {
    path: '/logi/production/salesPlanRegistMps',
    name: 'salesPlanRegistMps',
    component: () => import('@/views/logistic/production/mps/salesPlanRegistMps.vue'),
    meta: {
      pageTitle: 'Mps 등록',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '주생산계획(MPS)',
        },
        {
          text: '판매계획으로 MPS 등록',
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
      pageTitle: '소요량취합 결과 조회',
      breadcrumb: [
        {
          text: '생산관리',
        },
        {
          text: '소요량전개 (MRP)',
        },
        {
          text: '소요량취합 결과 조회',
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
    component: () => import('@/views/logistic/production/WorkPlacePage.vue'),
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
