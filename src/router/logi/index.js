import OutsourcRoute from './OutsourceRoute';
import ProductionRoute from './ProductionRoute';
import salesRoute from './SalesRoute';
import purchaseRoute from './purchase';
import LogisticsInfoRoute from './LogisticsInfoRoute';

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
  ...salesRoute,
  ...ProductionRoute,
  ...OutsourcRoute,
  ...purchaseRoute,
  ...LogisticsInfoRoute
]
export default logiRouter
