// 상태 변경 리엑트의 reducer느낌

export default {
  /**
   *  전표
   * @param state
   * @param slipFormList
   * @constructor
   */
  SET_SILP_LIST(state, slipFormList) {
    state.slipFormList = slipFormList
  },
  /**
   * 전표한개
   * @param state
   * @param slipForm
   * @constructor
   */
  SET_SILP(state, slipForm) {
    state.slipForm = slipForm
  },
  /**
   * 분개장
   * @param state
   * @param journalList
   * @constructor
   */
  SET_JOURNAL_LIST(state, journalList) {
    state.journalList = journalList
  },

}
