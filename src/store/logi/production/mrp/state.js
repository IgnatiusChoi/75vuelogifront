
import mutations from './mutation'
import actions from '@/store/logi/production/mrp/action.js'

export default {
    namespaced: true,
    state : {
        mpsListByContract : [],
        mpsListBySalesPlan : [],
        mrpList : [],
        getMrpGatherList : [],
        mrpResultList : [],
        mrpNoAndItemCodeList : [],
        searchMrpGatheringList : [],
    },

    mutations,
    actions,
}
