import dashboard from '@/navigation/vertical/common/dashboard'

import salesMenu from '@/navigation/vertical/logi/salesMenu'
import logisticsInfo from '@/navigation/vertical/logi/logisicsInfo'
import production from '@/navigation/vertical/logi/production'
import outsource from '@/navigation/vertical/logi/outsource'
import purchase from "@/navigation/vertical/logi/purchase";

export default [
  ...dashboard,
  {
    title: '메인페이지',
    route: 'logiHome',
    icon: 'HomeIcon',
  },
  ...logisticsInfo,
  ...salesMenu,
  ...outsource,
  ...production,
  ...purchase,
]
