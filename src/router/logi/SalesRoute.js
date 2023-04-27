const ERP = '/logi/sales'
const salesRoute = [
  {

    path: `${ERP}/EstimateInfo`,
    name: 'EstimateInfo',
    component: () => import('@/views/logistic/sales/Estimate/EstimateInfo.vue'),
    meta: {
      pageTitle: '견적 조회',
      breadcrumb: [
        {
          text: '영업 관리',
        },
        {
          text: '견적 관리',
        },
        {
          text: '견적 조회/수정',
          active: true,
        },
      ],
    },
  },
  {

    path: `${ERP}/EstimateRegiste`,
    name: 'EstimateRegiste',
    component: () => import('@/views/logistic/sales/Estimate/EstimateRegisteUpgrade'),
    meta: {
      pageTitle: '견적 등록',
      breadcrumb: [
        {
          text: '영업 관리',
        },
        {
          text: '견적 관리',
        },
        {
          text: '견적 등록',
          active: true,
        },
      ],
    },
  },
  {
    path: `${ERP}/contractInfo`,
    name: 'contractInfo',
    component: () => import('@/views/logistic/sales/contract/ContractInfoPage'),
    meta: {
      pageTitle: '수주 조회',
      breadcrumb: [
        {
          text: '영업 관리',
        },
        {
          text: '수주 관리',
        },
        {
          text: '수주 조회',
          active: true,
        },
      ],
    },
  },
  {
    path: `${ERP}/registContract`,
    name: 'registContract',
    component: () => import('@/views/logistic/sales/contract/ContractRegistPage'),
    meta: {
      pageTitle: '수주 등록',
      breadcrumb: [
        {
          text: '영업 관리',
        },
        {
          text: '수주 관리',
        },
        {
          text: '수주 등록',
          active: true,
        },
      ],
    },
  },
  {
    path: `${ERP}/deliveryInfoPage`,
    name: 'deliveryInfoPage',
    component: () => import('@/views/logistic/sales/deliveryInfo/DeliveryInfo'),
    meta: {
      pageTitle: '납품 관리',
      breadcrumb: [
        {
          text: '영업 관리',
        },
        {
          text: '납품 관리',
          active: true,
        },
      ],
    },
  },
]

export default salesRoute
