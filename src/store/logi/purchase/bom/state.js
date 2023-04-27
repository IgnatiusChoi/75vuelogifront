import mutations from './mutation'
import actions from './action'

export default {
    namespaced: true,
    state: {
        itemCodeList: [],
        bomList: [],
        bomRegistList: [],
    },
    getters: {
    },

    mutations,
    actions,

}
