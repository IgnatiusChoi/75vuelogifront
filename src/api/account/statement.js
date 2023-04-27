import { accountApi } from '@/api'

const DETAIL_TRIAL_BALANCE_URL = '/statement/detailTrialBalances'
const CASH_JOURNAL_URL = '/statement/cashJournals'
const TOTAL_TRIAL_BALANCE_URL = '/statement/totalTrialBalances'
const INCOME_URL = '/statement/incomeStatements'
const FINANCIAL_POSITION_URL = '/statement/financialPositions'
const MONTH_INCOME_URL = '/statement/monthIncomeStatements'
const CASH_FLOW_URL = '/statement/cashFlowStatements'
const COST_URL = '/statement/costStatements'
/**
 *  일(월)계표 조회
 * @returns {*}
 */
function fetchDetailTrialBalance({ startDate, endDate }) {
  return accountApi.get(`${DETAIL_TRIAL_BALANCE_URL}`, {
    params: {
      startDate,
      endDate,
    },
  })
}

/**
 *  현급출남장 조회
 * @param startDate
 * @param endDate
 * @returns {*}
 */
function fetchCashJournal({ startDate, endDate }) {
  return accountApi.get(`${CASH_JOURNAL_URL}`, {
    params: {
      startDate,
      endDate,
    },
  })
}

/**
 * 합계잔액시산표
 */
function fetchTotalTrialBalance(searchDate) {
  return accountApi.get(`${TOTAL_TRIAL_BALANCE_URL}`, {
    params: {
      searchDate,
    },
  })
}

/**
 * 손익계산서
 */
function fetchIncomeList(searchDate) {
  return accountApi.get(`${INCOME_URL}`, {
    params: {
      searchDate,
    },
  })
}

/**
 * 재무상태표
 * @param searchDate
 * @returns {*}
 */
function fetchFinancialPositionList(searchDate) {
  return accountApi.get(`${FINANCIAL_POSITION_URL}`, {
    params: {
      searchDate,
    },
  })
}

/**
 * 월별손익계산서
 * @param searchDate
 */
function fetchMonthIncomeList(searchDate) {
  return accountApi.get(`${MONTH_INCOME_URL}`, {
    params: {
      searchDate,
    },
  })
}

/**
 * 현금흐름표
 * @param searchDate
 * @returns {*}
 */
function fetchCashFlowList(searchDate) {
  return accountApi.get(`${CASH_FLOW_URL}`, {
    params: {
      searchDate,
    },
  })
}

/**
 * 원가보고서
 */
function fetchCostList(searchDate) {
  return accountApi.get(`${COST_URL}`, {
    params: {
      searchDate,
    },
  })
}
export {
  fetchDetailTrialBalance, fetchCashJournal, fetchTotalTrialBalance, fetchIncomeList, fetchFinancialPositionList, fetchMonthIncomeList, fetchCashFlowList, fetchCostList,
}
