export default [
  {
    title: 'accountHome',
    route: 'accountHome',
    icon: 'HomeIcon',
  },
  {
    title: '전표',
    route: 'slipHome',
    children: [
      {
        title: '전표조회',
        route: { name: 'slimForm' },
        icon: 'FileIcon',
      },
      {
        title: '전표추가',
        route: { name: 'addSlipForm' },
        icon: 'FileIcon',
      },
      {
        title: '전표승인',
        route: { name: 'approvalManagerForm' },
        icon: 'FileIcon',
      },
      {
        title: '분개장',
        route: { name: 'journal' },
        icon: 'FileIcon',
      },

    ],

  },
  {
    title: '장부관리',
    route: 'ManegerLeder',
    children: [
      {
        title: '계정별원장',
        route: { name: 'accountLedger' },
        icon: 'FileIcon',
      },
      {
        title: '총계정원장',
        route: { name: 'generalAccountLedger' },
        icon: 'FileIcon',
      },
      {
        title: '일(월)계표',
        route: { name: 'detailTrialBalance' },
        icon: 'FileIcon',
      },
      {
        title: '현금출납장',
        route: { name: 'cashJournal' },
        icon: 'FileIcon',
      },
    ],
  },
  {
    title: '결산/재무제표관리',
    route: 'result',
    children: [
      {
        title: '합계잔액시산표',
        route: { name: 'totalTrialBalance' },
        icon: 'FileIcon',
      },
      {
        title: '손익계산서',
        route: { name: 'incomeStatement' },
        icon: 'FileIcon',
      },
      {
        title: '재무상태표',
        route: { name: 'financialPosition' },
        icon: 'FileIcon',
      },
      {
        title: '월별손익계산서',
        route: { name: 'monthIncomeStatement' },
        icon: 'FileIcon',
      },
      {
        title: '현금흐름표',
        route: { name: 'cashFlowStatement' },
        icon: 'FileIcon',
      },
      {
        title: '원가명세서',
        route: { name: 'costStatement' },
        icon: 'FileIcon',
      },
    ],
  },

  {
    title: '고정자산관리',
    route: { name: '3' },
    children: [
      {
        title: '고정자산등록',
        route: { name: '4' },
        icon: 'FileIcon',
      },
    ],
  },
  {
    title: '기초정보관리',
    route: { name: 'baseInfoManager' },
    children: [
      {
        title: '계정과목관리',
        route: { name: 'accountCodeManager' },
        icon: 'FileIcon',
      },
      {
        title: '거래처관리',
        route: { name: 'customerManager' },
        icon: 'FileIcon',
      },
    ],
  },

]
