import {
  searchEstimateInfo,
  searchContract,
  searchContractDetail,
  searchEstimateInContractAvailable,
  searchEstimateDetailInfo,
  addNewContract,
  searchDeliverableContractList,
  addNewEstimate,
  Selectsalesplane,
  InsertSalesplan,
  searchInputContract,
  UpdateSalesplan,
  delivery,

} from '@/api/logi/sales'
import {SelectDepartmentCode} from "@/api/logi/base";
import async from "async";

export default {
  async searchContract({ commit }, date) {
    try {
      const res = await searchContract(date)
      const gridRow = res.data.gridRowJson
      commit('setGrid', gridRow)
      console.log(gridRow)
      // return res
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_ESTIMATE_INFO({ commit }, payload) {
    // 객체로 넘어오면 {}
    // 견적일련번호
    try {
      const  {data}  = await searchEstimateInfo(payload)
      console.log(data)
      commit('SEARCH_INFO', data.gridRowJson)
      console.log(data.gridRowJson[0])
      console.log(JSON.stringify(data.gridRowJson[0]) )/* field가 맵핑하는게 배열이기 때문에 그대로 보내줌 */
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  async searchContractDetail({ commit }, contractNo) {
    try {
      const res = await searchContractDetail(contractNo)
      const gridRow = res.data.gridRowJson
      commit('setDetailGrid', gridRow)
      console.log(gridRow)
    } catch (err) {
      throw new Error(err)
    }
  },

  async searchInputContract({ commit }, searchedData) {
    try {
      console.log("searchedData")
      console.log(searchedData)
      commit('searchGrid', searchedData)
    } catch (err) {
      throw new Error(err)
    }
  },


  setTable({ commit }, tableColumns) {
    commit('setTable', tableColumns)
  },
  async addNewContract({ commit }, param) {
    try {
      const res = await addNewContract(param)
    } catch (err) {
      throw new Error(err)
    }
  },
  async searchEstimateInContractAvailable({ commit }, sendDate) {
    try {
      const res = await searchEstimateInContractAvailable(sendDate)
      const gridRow = res.data.gridRowJson
      commit('setGrid', gridRow)
    } catch (err) {
      throw new Error(err)
    }
  },
  async searchEstimateDetailInfo({ commit }, estimateNo) {
    try {
      const res = await searchEstimateDetailInfo(estimateNo)
      const gridRow = res.data.gridRowJson
      commit('setDetailGrid', gridRow)
    } catch (err) {
      throw new Error(err)
    }
  },
  async searchDeliverableContractList({ commit }, searchData) {
    try {
      const res = await searchDeliverableContractList(searchData)
      const gridRow = res.data.gridRowJson
      commit('setGrid', gridRow)
    } catch (err) {
      throw new Error(err)
    }
  },

  async deliverycontractDetailTOList({commit},payload){
    console.log("딜리버리액션",payload)


    try {
      const res = await delivery(payload)

    } catch (err) {
      throw new Error(err)
    }
  },

  async ADD_NEW_ESTIMATE({ commit }, newEstimate) {
    try {
      await addNewEstimate(newEstimate)
      return true
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_ALL_SalesPlane({ commit }) {
    try {
      const response = await Selectsalesplane()
      console.log("이거다",response.data.gridRowJson[0])
      commit('salesplane', response.data.gridRowJson)
      // eslint-disable-next-line no-undef
      console.log(this.salesplane)
    } catch (err) {
      throw new Error(err)
    }
  },

  async INSERT_SALES_PLAN({ commit }, payload) {
    try {
      const response = await InsertSalesplan(payload);
      console.log(response); // 응답 확인
      /*commit('SET_SALES_PLAN', response.data);*/
    } catch (error) {
      throw new Error(error);
    }
  },

  async UPDATE_SALES_PLAN({ commit }, payload) {
    try{
      const resaponse = await UpdateSalesplan(payload);
     console.log(resaponse);
    }catch(error){
      throw new Error(error);
    }
  },

}
