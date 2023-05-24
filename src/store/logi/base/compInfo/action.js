import {
  searchCompanyList,
  searchWorkplace,
  searchWorkplaceList,
  searchDeptList,
  searchClientList,
  deleteWorkplace,
  insertWorkplace,
  updateWorkplace,
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


  /** 사업장 정보 **/
  async SEARCH_WORKPLACE({ commit }, workplaceCode) {
    try {
      console.log("____")
      console.log(workplaceCode)
      const res = await searchWorkplace(workplaceCode)
      console.log("res.data.workplaceInfo")
      console.log(res.data.workplaceInfo)
      commit('SEARCH_WORKPLACE', res.data.workplaceInfo)
    } catch (err) {
      throw new Error(err)
    }
  },

  /** 사업장 목록 **/
  async SEARCH_WORKPLACE_LIST({ commit }) {
    const res = await searchWorkplaceList()
    console.log("res")
    console.log(res)
    commit('SEARCH_WORKPLACE_LIST', res.data.workplaceList)
  },

  /** 사업장 추가 **/
  async INSERT_WORKPLACE(_, payload) {
    console.log(payload)
    console.log("payload")
    console.log(typeof payload)
    console.log("typeof payload")
    await insertWorkplace(payload);
  },

  /** 사업장 삭제 **/
  async DELETE_WORKPLACE(_, workplaceCode) {
    console.log(workplaceCode)
    console.log("workplaceCode")

    await deleteWorkplace(workplaceCode);
  },

  /** 사업장 수정 **/
  async UPDATE_WORKPLACE(_, payload) {
    await updateWorkplace(payload);
  },


  async SEARCH_DEPT_LIST({ commit },payload) {
    const res = await searchDeptList()
    commit('SEARCH_DEPT_LIST', itemList)
  },


  async SEARCH_CLIENT_LIST({ commit },payload) {
    const res = await searchClientList()
    commit('SEARCH_CLIENT_LIST', itemList)
  },


  setTable({ commit }, tableColumns) {
    commit('setTable', tableColumns)
  },



}
