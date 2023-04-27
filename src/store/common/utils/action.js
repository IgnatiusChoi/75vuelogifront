export default {

  // Alert Dialog
  OPEN_ALERT_DIALOG({ commit }, alertDialogInfo) {
    commit('SET_OPEN_ALERT_DIALOG', alertDialogInfo)
  },
  CLOSE_ALERT_DIALOG({ commit }) {
    commit('SET_CLOSE_ALERT_DIALOG')
  },
}
