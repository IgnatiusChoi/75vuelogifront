const AccountRoute = [

  {
    path: '/acc/account/slimForm',
    name: 'slimForm',
    component: () => import('@/views/account/account/SlipFormPage.vue'),
  },
  {
    path: '/acc/account/addSlipForm',
    name: 'addSlipForm',
    component: () => import('@/views/account/account/SlipAddFormPage.vue'),
  },
  {
    path: '/acc/account/journalForm',
    name: 'journalForm',
    props: true, // true로 설정하면 데이터를 props로도 받습니다.
    component: () => import('@/views/account/account/JournalFormPage.vue'),
  },
  {
    path: '/acc/account/approvalManagerForm',
    name: 'approvalManagerForm',
    props: true, // true로 설정하면 데이터를 props로도 받습니다.
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/account/ApprovalManagerPage.vue'),
  },
  {
    path: '/acc/account/journal',
    name: 'journal',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/account/JournalPage.vue'),
  }, {
    path: '/acc/account/journalDetailForm2',
    name: 'journalForm222',
    props: true, // true로 설정하면 데이터를 props로도 받습니다.
    component: () => import('@/views/account/account/JournalFormPage.vue'),
  },
  {
    path: '/acc/account/journalDetailForm2',
    name: 'journalForm222',
    props: true, // true로 설정하면 데이터를 props로도 받습니다.
    component: () => import('@/views/account/account/JournalFormPage.vue'),
  },

]

export default AccountRoute
