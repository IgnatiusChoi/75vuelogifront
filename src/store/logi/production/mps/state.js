
import mutations from '@/store/logi/production/mps/mutation.js'
import actions from '@/store/logi/production/mps/action.js'

export default {
    namespaced: true,
    state: {
        contractDetailList: [],
        MpsCount:[],

        salesPlanList: [],
    },

  mutations,
  actions,

}
