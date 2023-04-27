import mutations from './mutation'
import actions from './action'

export default {
    namespaced: true,
    state: {
        stockAmountDetailList:[],
        stockList:[],
    },
    getters: {},

    mutations,

    actions,

}