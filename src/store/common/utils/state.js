import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    alertDialogToggle: false,
    alertDialogInfo: null,
  },
  getters: {

  },

  mutations,

  actions,

}
