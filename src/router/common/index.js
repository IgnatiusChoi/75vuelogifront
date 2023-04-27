const commonRouter = [
  {
    path: '/musicPlayer',
    name: 'music-player',
    component: () => import('@/views/MusicPlayerPage'),
    meta: {
      pageTitle: 'musicPlayer',
      breadcrumb: [
        {
          text: 'Dashboards',
        },
        {
          text: 'music player',
          active: true,
        },
      ],
    },
  },
]
export default commonRouter
