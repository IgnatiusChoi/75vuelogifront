import {
  fetchDetailTrialBalance, fetchCashJournal, fetchTotalTrialBalance, fetchIncomeList, fetchFinancialPositionList, fetchMonthIncomeList, fetchCashFlowList, fetchCostList,
} from '@/api/account/statement'

export default {
  /**
     *  일(월)계표
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_DETAIL_TRIAL_BALANCE_LIST({ commit }, searchData) {
    try {
      const response = await fetchDetailTrialBalance(searchData)
      console.log(response)
      commit('SET_DETAIL_TRIAL_BALANCE_LIST', response.data.detailTrialBalanceList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
     *  현금출납장
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_CASH_JOURNAL_LIST({ commit }, searchData) {
    try {
      const response = await fetchCashJournal(searchData)
      console.log(response)
      commit('SET_CASH_JOURNAL_LIST', response.data.cashJournalList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
     *  합계잔액시산표
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_TOTAL_TRIAL_BALANCE_LIST({ commit }, searchData) {
    try {
      const response = await fetchTotalTrialBalance(searchData)
      console.log(response)
      commit('SET_TOTAL_TRIAL_BALANCE_LIST', response.data.totaltrialList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
     * 손익계산서 조회
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_INCOME_LIST({ commit }, searchData) {
    try {
      const response = await fetchIncomeList(searchData)
      console.log(response)
      commit('SET_INCOME_LIST', response.data.incomeList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
     *  재무상태표
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_FINANCIAL_POSITION_LIST({ commit }, searchData) {
    try {
      const response = await fetchFinancialPositionList(searchData)
      console.log(response)
      commit('SET_FINANCIAL_POSITION_LIST', response.data.financialPositionList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
     * 월별 손익 계산서
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_MONTH_INCOME_LIST({ commit }, searchData) {
    try {
      const response = await fetchMonthIncomeList(searchData)
      commit('SET_MONTH_INCOME_LIST', response.data.monthIncomeList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
     * 현금 흐름표
     * @param commit
     * @param searchData
     * @returns {Promise<*>}
     * @constructor
     */
  async FETCH_CASH_FLOW_LIST({ commit }, searchData) {
    try {
      const response = await fetchCashFlowList(searchData)
      commit('SET_CASH_FLOW_LIST', response.data.cashFlowList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_COST_LIST({ commit }, searchData) {
    try {
      const response = await fetchCostList(searchData)
      commit('SET_COST_LIST', response.data.costList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

}
