export default {
  /**
     * 일계표 state 셋팅
     * @param state
     * @param detailTrialBalanceList
     * @constructor
     */
  SET_DETAIL_TRIAL_BALANCE_LIST(state, detailTrialBalanceList) {
    state.detailTrialBalanceList = detailTrialBalanceList
  },
  /**
     *  일계표 그리드를 비워지는 함수
     * @param state

     * @constructor
     */
  CLEAR_DETAIL_TRIAL_BALANCE_LIST(state) {
    state.detailTrialBalanceList = []
  },

  /**
     *  현급출남장 셋팅
     * @param state
     * @param cashJournalList
     * @constructor
     */
  SET_CASH_JOURNAL_LIST(state, cashJournalList) {
    state.cashJournalList = cashJournalList
  },
  /**
     *   init 현금출납장
     * @param state
     * @constructor
     */
  CLEAR_CASH_JOURNAL_LIST(state) {
    state.cashJournalList = []
  },
  /**
     * 합계잔액시산표
     * @param state
     * @param totaltrialList
     * @constructor
     */
  SET_TOTAL_TRIAL_BALANCE_LIST(state, totaltrialList) {
    state.totaltrialList = totaltrialList
  },
  CLEAR_TOTAL_TRIAL_BALANCE_LIST(state) {
    state.totaltrialList = []
  },
  /**
     * 손익계산서
     * @param state
     * @param incomeList
     * @constructor
     */
  SET_INCOME_LIST(state, incomeList) {
    state.incomeList = incomeList
  },
  CLEAR_INCOME_LIST(state) {
    state.incomeList = []
  },
  /**
     * 재무상태표
     * @param state
     * @param financialPositionList
     * @constructor
     */
  SET_FINANCIAL_POSITION_LIST(state, financialPositionList) {
    state.financialPositionList = financialPositionList
  },
  CLEAR_FINANCIAL_POSITION_LIST(state) {
    state.financialPositionList = []
  },
  /**
     *  월별 손익계산서
     */

  SET_MONTH_INCOME_LIST(state, monthIncomeList) {
    state.monthIncomeList = monthIncomeList
  },
  CLEAR_MONTH_INCOME_LIST(state) {
    state.monthIncomeList = []
  },
  /**
     * 현금흐름표
     */
  SET_CASH_FLOW_LIST(state, cashFlowList) {
    state.cashFlowList = cashFlowList
  },
  CLEAR_CASH_FLOW_LIST(state) {
    state.cashFlowList = []
  },
  /**
     * 원가명세서
     */
  SET_COST_LIST(state, costList) {
    state.costList = costList
  },
  CLEAR_COST_LIST(state) {
    state.costList = []
  },

}
