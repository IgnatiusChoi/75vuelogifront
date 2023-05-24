import {
  searchItem,
  getStandardUnitPrice,
  getWarehouseList,
  deleteWarehouseList,
  SelectCompanyCode,
  getDeptInfo,
  getCompanyInfo,
  searchClientList,
  insertClient,
  deleteClient,
  searchCodeList,
  addCode,
  searchItemList,
  searchItemGroupList,
  searchClientDetailList,
  searchFinanceList,
  searchFinanceDetailList,
  deleteCode,
  updateClient,
  insertFinance,
  updateFinance,
  deleteFinance,
    insertItem,
    updateItem,
    deleteItem,
    insertItemGroup,
    updateItemGroup,
    deleteItemGroup
} from '@/api/logi/base'
import {selectSlips} from "@/api/account/account";
import {searchDeptList} from "@/api/logi/compinfo";
import {searchCustomerInfoList} from "@/api/account/base";

export default {
  async SEARCH_ITEM({commit}, divisionCode) {
    try {
      const res = await searchItem(divisionCode)
      const itemList = res.data.detailCodeList
      commit('SEARCH_ITEM', itemList)
      return itemList
    } catch (err) {
      throw new Error(err)
    }
    // getStandardUnitPrice
  },
  async GET_STANDARD_UNIT_PRICE({commit}, itemCode) {
    try {
      const res = await getStandardUnitPrice(itemCode)
      const gridRow = res.data.gridRowJson
      return gridRow
      // commit('setGrid', gridRow)
      // return res
    } catch (err) {
      throw new Error(err)
    }
  },

  //창고조회
  async GET_WAREHOUSE_LIST({commit}) {
    try {
      const {data} = await getWarehouseList();
      console.log("data of getWarehouseList")
      console.log(data)
      console.log(data.gridRowJson[0])
      console.log(data.gridRowJson[0].warehouseCode)
      console.log(data.gridRowJson)
      commit('GET_WAREHOUSE_LIST', data.gridRowJson)
    } catch (err) {
      throw new Error(err)
    }
  },
  //창고삭제
  async DELETE_WAREHOUSE_LIST({commit}, payload) {
    try {
      const {data} = await deleteWarehouseList(payload);
      //commit('GET_WAREHOUSE_LIST', data.gridRowJson)
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_ALL_CompanyCode({commit}) { // 객체로 넘어오면 {}
    try {
      const response = await SelectCompanyCode()
      console.log(response)
      commit('LogiCompany', response.data.gridRowJson)
      // eslint-disable-next-line no-undef
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },

  async GET_COMPANY_INFO({commit}) {
    try {
      const {data} = await getCompanyInfo();
      commit('GET_COMPANY_INFO', data.companyInfo)
      console.log(data.companyInfo)
    } catch (err) {
      throw new Error(err)
    }
  },

  async GET_DEPT_INFO({commit}) { // 객체로 넘어오면 {}
    try {
      const {data} = await getDeptInfo();
      commit('GET_DEPT_INFO', data.deptInfo)
      console.log(data.deptInfo)
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_CLIENT_LIST({commit}) {
    try {
      const {data} = await searchClientList()
      commit('SEARCH_CLIENT_LIST', data.clientInfo)
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_CLIENT_DETAIL_LIST({commit},payload) {
    try {
      const {data} = await searchClientDetailList(payload)
      commit('SEARCH_CLIENT_DETAIL_LIST', data.clientDetailInfo)
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_FINANCE_LIST({commit}) {
    try {
      const {data} = await searchFinanceList()
      commit('SEARCH_FINANCE_LIST', data.financeInfo)
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_FINANCE_DETAIL_LIST({commit},payload) {
    try {
      const {data} = await searchFinanceDetailList(payload)
      console.log(data.financeDetailInfo)
      commit('SEARCH_FINANCE_DETAIL_LIST', data.financeDetailInfo)
    } catch (err) {
      throw new Error(err)
    }
  },
  async INSERT_CLIENT({commit}, data) {
    try {
      await insertClient(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  async UPDATE_CLIENT({commit}, data) {
    try {
      await updateClient(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  async DELETE_CLIENT({commit}, data) {
    try {
      await deleteClient(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  async INSERT_FINANCE({commit}, data) {
    try {
      await insertFinance(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  async UPDATE_FINANCE({commit}, data) {
    try {
      await updateFinance(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  async DELETE_FINANCE({commit}, data) {
    try {
      await deleteFinance(data);
    } catch (err) {
      throw new Error(err)
    }
  },
  setTable({commit}, tableColumns) {
    commit('setTable', tableColumns)
  },
  resetClient({commit}) {
    commit('RESET_CLIENT')
  },
  resetFinance({commit}) {
    commit('RESET_FINANCE')
  },
  async SEARCH_CODE_LIST({commit}) {
    try {
      const {data} = await searchCodeList()
      console.log(data.codeList)
      console.log(Array.from(data))
      commit('SET_CODE', data.codeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  async INSERT_ITEM({commit},payload){
    try {
      const {data} = await insertItem(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  async UPDATE_ITEM({commit},payload){
    try {
      const {data} = await updateItem(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  async DELETE_ITEM({commit},payload){
    try {
      const {data} = await deleteItem(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  async INSERT_ITEM_GROUP({commit},payload){
    try {
      const {data} = await insertItemGroup(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  async UPDATE_ITEM_GROUP({commit},payload){
    try {
      const {data} = await updateItemGroup(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  async DELETE_ITEM_GROUP({commit},payload){
    try {
      const {data} = await deleteItemGroup(payload)
      return null
    } catch (err) {
      throw new Error(err)
    }
  },
  resetCodeList({commit}){
    commit('RESET_CODE_LIST')
  },
  async addCode({commit}, payload) {
    try {
      console.log('action'+payload)
      return await addCode(payload)
    } catch (err) {
      throw new Error(err)
    }
  },
  async deleteCode({commit}, payload) {
    try {
      console.log('action'+payload)
      return await deleteCode(payload)
    } catch (err) {
      throw new Error(err)
    }
  },
  async searchItemList({commit}) {
    try {
      const {data}=await searchItemList();
      console.log(data.gridRowJson)
      commit('SET_ITEM',data.gridRowJson)
    } catch (err) {
      throw new Error(err)
    }
  },
  resetItemList({commit}){
    commit('RESET_ITEM_LIST')
  },
  async searchItemGroupList({commit}){
    try {
      const {data}=await searchItemGroupList();
      console.log(data.gridRowJson)
      commit('SET_ITEM_GROUP',data.gridRowJson)
    } catch (err) {
      throw new Error(err)
    }
  },
  resetItemGroupList({commit}){
    commit('RESET_ITEM_GROUP_LIST')
  }






}
