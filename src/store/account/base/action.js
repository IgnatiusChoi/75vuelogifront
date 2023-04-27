import {
  fetchAccountCode,
  fetchAccountCustomerCode,
  fetchAccountControllCode,
  fetchAccountLedger,
  fetchGeneralAccountLedger,
  fetchAccountCodeList,
  deleteAccountCode,
  addAccountCode, searchCustomerInfoList, deleteCustomerCode,
  saveCustomer
} from '@/api/account/base'

export default {
  /**
   * 모든계정코드 찾기
   * @param commit
   * @returns {Promise<*>}
   * @constructor
   */
  async FETCH_ACCOUNT_CODE_LIST({ commit }) {
    try {
      const { data } = await fetchAccountCodeList()
      commit('SET_ACCOUNT_CODE_LIST', data.accoundCodeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 계정코드 삭제
   * APPROVAL_SLIP을 주석을 참조하시면 이해하실수 있습니다.
   * @param _
   * @param accountCode
   * @returns {Promise<*>}
   * @constructor
   */
  async DELETE_ACCOUNT_CODE(_, deleteCodeList) {
    try {
      const updateList = []
      await deleteCodeList.reduce((pre, code) => pre.then(async () => {
            const response = await deleteAccountCode(code)
            updateList.push(response.data.updateCodeNo)
          }),
          Promise.resolve())

      return updateList
    } catch (err) {
      throw new Error(err)
    }
  },
  // 해당 계정추가
  async ADD_ACCOUNT_CODE(_, accountCode) {
    try {
      return await addAccountCode(accountCode)
    } catch (err) {
      return err
    }
  },

  // 해당 계정과목 찾기
  async FETCH_ACCOUNT_CODE({ commit }, searchCode) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountCode(searchCode)
      commit('SET_ACCOUNTCODE_LIST', data.accoundCodeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  // 고객사 찾기
  async FETCH_ACCOUNT_CUSTOMER_CODE({ commit }) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountCustomerCode()
      console.log(data)
      commit('SET_ACCOUNT_CUSTOMER_LIST', data.accountCustomerList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  // 분개상세 코드 찾기
  async FETCH_ACCOUNT_CONTROLL_CODE({ commit }) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountControllCode()
      console.log(data)
      commit('SET_ACCOUNT_CONTROLL_CODE_LIST', data.accountControllCodeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 계정별원장
   */
  async FETCH_ACCOUNT_LEDGER({ commit }, searchData) {
    try {
      const response = await fetchAccountLedger(searchData)
      console.log(response)
      commit('SET_ACCOUNT_LEDGER_LIST', response.data.accountLederList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 총계정원장
   */
  async FETCH_GENERAL_ACCOUNT_LEDGER({ commit }, searchData) {
    try {
      const response = await fetchGeneralAccountLedger(searchData)
      console.log(response)
      commit('SET_GENERAL_ACCOUNT_LEDGER', response.data)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 거래처조회 조현준
   */
  async SEARCH_CUSTOMER_INFO_LIST({commit}){
    try {

      const {data} = await searchCustomerInfoList()
      console.log(data)
      console.log('커스터머리스트액션',data.accountCustomerList)
      commit('SEARCH_CUSTOMER_INFO', data.accountCustomerList)
      return data
    } catch (err){
      throw new Error(err)
    }
  },

  async DELETE_CUSTOMER_CODE({commit}, customerCode){
    try {
      console.log('커스터머코드',customerCode)
       await deleteCustomerCode(customerCode)
      commit('DELETE_CUSTOMER_CODE',customerCode)
      return data
    } catch (err){
      throw new Error(err)
    }
  },

  async SAVE_CUSTOMER_CODE({commit}, newCustomer){
    try {
      console.log('커스터머',newCustomer)
      await saveCustomer(newCustomer)
     // commit('DELETE_CUSTOMER_CODE',customerCode)
     // return data
    } catch (err){
      throw new Error(err)
    }
  }

}
