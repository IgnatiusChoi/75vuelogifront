import {
  searchEstimateInfo, searchContract, searchContractDetail, searchEstimateInContractAvailable, searchEstimateDetailInfo, addNewContract,
  searchDeliverableContractList, addNewEstimate,
} from '@/api/logi/sales'

export default {
  async searchContract({ commit }, date) {
    try {
      const res = await searchContract(date)
      const gridRow = res.data.gridRowJson
      commit('setGrid', gridRow)

      // return res
    } catch (err) {
      throw new Error(err)
    }
  },
  async SEARCH_ESTIMATE_INFO({ commit }, payload) { // 객체로 넘어오면 {}
    try {
      const { data } = await searchEstimateInfo(payload)
      commit('SEARCH_INFO', data.gridRowJson) /* field가 맵핑하는게 배열이기 때문에 그대로 보내줌 */
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

  async ADD_NEW_ESTIMATE({ commit }, newEstimate) {
    try {
      await addNewEstimate(newEstimate)
      return true
    } catch (err) {
      throw new Error(err)
    }
  },

}
