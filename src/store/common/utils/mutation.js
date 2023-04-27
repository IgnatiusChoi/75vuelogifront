// 상태 변경 리엑트의 reducer느낌

export default {

  SET_OPEN_ALERT_DIALOG(state, payload) {
    state.alertDialogInfo = payload
    state.alertDialogToggle = true
  },
  SET_CLOSE_ALERT_DIALOG(state) {
    state.alertDialogInfo = null
    state.alertDialogToggle = false
  },

}
