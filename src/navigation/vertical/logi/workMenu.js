export default [
  {
    title: '메인페이지',
    route: 'logiHome',
    icon: 'BoxIcon',
  },
  {
    title: '영업 관리',
    route: 'sals-tap',
    icon: 'FileIcon',
  },
  {
    title: '견적 관리',
    route: 'Estimate',
    icon: 'BoxIcon',
    children: [
      {
        title: '견적 조회',
        route: 'EstimateInfo',
        icon: 'FileIcon',
      },
      {
        title: '견적 등록',
        route: 'EstimateRegiste',
        icon: 'FileIcon',
      },
    ],
  },
]
