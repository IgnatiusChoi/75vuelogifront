import AccountRoute from './AccountRoute'
import StatementRoute from './StatementRoute'

const ERP = '/account'
const accountRouter = [

  {
    path: `${ERP}/home`,
    name: 'accountHome',
    component: () => import('@/views/account/Home.vue'),
    meta: {
      pageTitle: 'ACC',
      breadcrumb: [
        {
          text: 'ACC Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/account-page',
    name: 'account-page',
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
  // 계정별 원장
  {
    path: '/acc/base/accountLedger',
    name: 'accountLedger',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/base/AccountLedgerPage.vue'),
  },
  // 총계정원장
  {
    path: '/acc/base/generalAccountLedger',
    name: 'generalAccountLedger',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/base/GeneralAccountLedgerPage.vue'),
  },
  // 계정과목관리
  {
    path: '/acc/base/accountCodeManager',
    name: 'accountCodeManager',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/base/AccountCodeManagerPage.vue'),
  },
  {
    path: '/acc/base/customerManager',
    name: 'customerManager',
    component: () => import('@/views/account/base/CustomerManagerPage.vue'),
  },
  ...AccountRoute,
  ...StatementRoute,
]
export default accountRouter
