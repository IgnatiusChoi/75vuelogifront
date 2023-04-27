export default [

  {
    title: '생산관리',
    icon: 'CpuIcon',
    children: [
      {
        title: '주생산계획 (mps)',
        route: 'mps',
      },
      {
        title: '소요량 전개/취합 (mrp)',
        children: [
          {
            title: '소요량전개 등록/취합',
            route: 'mrpRegister',
          },
          {
            title: '소요량전개/취합 조회',
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
