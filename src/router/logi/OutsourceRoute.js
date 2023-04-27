const OutsourceRoute = [
  {
    path: '/logi/outsource/order',
    name: 'order',
    component: () => import('@/views/logistic/outsourc/order/OrderPage'),
    meta: {
      pageTitle: '외주 발주 관리',
      breadcrumb: [
        {
          text: '외주관리',
        },
        {
          text: '외주 발주 관리',
          active: true
        },
      ],
    },
  },
  {
    path: '/logi/outsource/forward',
    name: 'forward',
    component: () => import('@/views/logistic/outsourc/forward/Forward'),
    meta: {
      pageTitle: '외주 자재 출고 관리',
      breadcrumb: [
        {
          text: '외주관리',
        },
        {
          text: '외주 자재 출고 관리',
          active: true
        },
      ],
    },
  },    {
    path: '/logi/outsource/inspection',
    name: 'inspection',
    component: () => import('@/views/logistic/outsourc/inspection/Inspection'),
    meta: {
      pageTitle: '외주 자재 실적 검사',
      breadcrumb: [
        {
          text: '외주관리',
        },
        {
          text: '외주 자재 실적 검사',
          active: true
        },
      ],
    },
  },
]

export default OutsourceRoute
