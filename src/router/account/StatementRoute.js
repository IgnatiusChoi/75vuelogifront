const StatementRoute = [
  /**
     * 일계표
     */
  {
    path: '/acc/account/statement/detailTrialBalance',
    name: 'detailTrialBalance',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/statement/DetailTrialBalancePage.vue'),
  },
  /**
     * 현금 출납장
     */
  {
    path: '/acc/account/statement/cashJournal',
    name: 'cashJournal',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/statement/CashJournalPage.vue'),
  },
  /**
     * 합계잔액시산표.
     */
  {
    path: '/acc/account/statement/totalTrialBalance',
    name: 'totalTrialBalance',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/statement/TotalTrialBalancePage.vue'),
  },
  /**
     * 손익계산서
     */
  {
    path: '/acc/account/statement/incomeStatement',
    name: 'incomeStatement',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/statement/IncomeStatementPage.vue'),
  },
  /**
     * 재무상태표
     */
  {
    path: '/acc/account/statement/financialPosition',
    name: 'financialPosition',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/statement/FinancialPositionPage.vue'),
  },
  /**
     * 월별손익계산서
     */
  {
    path: '/acc/account/statement/monthIncomeStatement',
    name: 'monthIncomeStatement',
    component: () => import('@/views/account/statement/MonthIncomeStatementPage.vue'),
  },
  /**
     * 현금흐름표
     */
  {
    path: '/acc/account/statement/cashFlowStatement',
    name: 'cashFlowStatement',
    component: () => import('@/views/account/statement/CashFlowStatementPage.vue'),
  },
  /**
     * 원가명세서
     */
  {
    path: '/acc/account/statement/costStatement',
    name: 'costStatement',
    component: () => import('@/views/account/statement/CostStatementPage.vue'),
  },

]

export default StatementRoute
