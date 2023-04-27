import OutsourcRoute from '@/router/logi/OutsourceRoute'
import ProductionRoute from './ProductionRoute'
import salesRoute from './SalesRoute'
import purchaseRoute from "@/router/logi/purchase";
import LogisticsInfoRoute from "@/router/logi/LogisticsInfoRoute";

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
