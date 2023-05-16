export default [

  {
    title: '생산관리',
    icon: 'CpuIcon',
    children: [
      {
        title: '주계획작성 (MPS)',
        route: 'mps',
      },
      {
        title: '소요량전개 (MRP)',
        children: [
          {
            title: '소요량전개',
            route: 'mrpRegister',
          },
          {
            title: '소요량취합',
            route: 'mrpInfo',
          },
        ],
      },
      {
        title: '작업지시/생산실적관리',
        route: 'workInstruction',
      },
      {
        title: '작업장/작업장로그',
        route: 'workPlace'
      },
    ],
  },
]
