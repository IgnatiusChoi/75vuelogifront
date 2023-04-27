export default {
  /**
   * 모든계정코드 찾아오기
   * @param state
   * @param accountCodeList
   * @constructor
   */
  SET_ACCOUNT_CODE_LIST(state, accountCodeList) {
    state.accountCodeList = accountCodeList
  },

  // 계정코드 셋팅
  SET_ACCOUNTCODE_LIST(state, accoundCodeList) {
    state.accoundCodeList = accoundCodeList
  },
  // 계정코드 지우기
  CLEAR_CODE_LIST(state) {
    state.accoundCodeList = []
  },
  // 거래처 셋팅
  SET_ACCOUNT_CUSTOMER_LIST(state, accountCustomerList) {
    state.accountCustomerList = accountCustomerList
  },
  CLEAR_CUSTOMER_CODE_LIST(state) {
    state.accountCustomerList = []
  },

  // 분개상세 코드 찾기
  SET_ACCOUNT_CONTROLL_CODE_LIST(state, accountControllCodeList) {
    state.accountControllCodeList = accountControllCodeList
  },
  // 초기화
  CLEAR_ACCOUNT_CONTROLL_CODE_LIST(state) {
    state.accountControllCodeList = []
  },
  /**
   * 계정별원장
   */
  SET_ACCOUNT_LEDGER_LIST(state, accountLederList) {
    state.accountLederList = accountLederList
  },
  CLEAR_ACCOUNT_LEDGER_LIST(state) {
    state.accountLederList = []
  },
  /**
   * 총계정원장
   */
  SET_GENERAL_ACCOUNT_LEDGER(state, generalAccountLedgerList) {
    state.generalAccountLedgerList = generalAccountLedgerList
  },
  CLEAR_GENERAL_ACCOUNT_LEDGER(state) {
    state.generalAccountLedgerList = []
  },
  /**
   * 거래처조회
   */
  SEARCH_CUSTOMER_INFO(state, customerList){
    state.customerList = customerList
  },
  setGrid(state, gridRow) {
    state.grid = gridRow
  },
  setTable(state, tableColumns) {
    state.tableColumns = tableColumns[0].tableColumns
  },

  DELETE_CUSTOMER_CODE(state,customerCode){
    console.log('뮤테이션삭제',state.customerCode)
    state.customerList = state.customerList.filter((item)=>item.customerCode !== customerCode);
  },
  ADD_CUSTOMER_CODE(state, customerData){
    console.log('뮤테이션오냐?^__^')
    state.customerList = state.customerList.concat(customerData)
  },

}
