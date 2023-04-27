import {
  searchCompanyList,
  searchWorkplaceList,
  searchDeptList,
  searchClientList,
} from "@/api/logi/compinfo";
// 액션을 위한 api 통신 대상

// 여긴 물류정보 중 기초정보 ( 회사, 사업장, 부서, 거래처 )
export default {

  async SEARCH_COMPANY_LIST({ commit }, divisionCode) {
    try {
      const res = await searchCompanyList(divisionCode)
      const itemList = res.data.detailCodeList
      commit('SEARCH_COMPANY_LIST', itemList)
      return itemList
    } catch (err) {
      throw new Error(err)
    }
  },


  async SEARCH_WORKPLACE_LIST({ commit },payload) {
    const res = await searchWorkplaceList()
    const result=res.data
    commit('SEARCH_WORKPLACE_LIST', itemList)
  },


  async SEARCH_DEPT_LIST({ commit },payload) {
    const res = await searchDeptList()
    commit('SEARCH_DEPT_LIST', itemList)
  },


  async SEARCH_CLIENT_LIST({ commit },payload) {
    const res = await searchClientList()
    commit('SEARCH_CLIENT_LIST', itemList)
  },




}
