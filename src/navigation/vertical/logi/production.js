export default [

  {
    title: '생산 관리',
    icon: 'CpuIcon',
    children: [
      {
        title: '주생산계획 (MPS)',
        children: [
          {
            title: '수주->MPS',
            route: 'contractRegistMps',
          },
          {
            title: '판매계획->MPS',
            route: 'salesPlanRegistMps',
          }
        ]
      },
      {
        title: '소요량전개 (MRP)',
        children: [
          {
            title: '소요량전개',
            route: 'mrpRegister',
          },
          {
            title: '소요량취합 결과 조회',
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
