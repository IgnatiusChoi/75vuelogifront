
import {  searchContractDetailInMpsAvailable,
          convertContractDetailToMps,
          searchMps,
    searchSalesPlanInMpsAvailable,
    convertSalesPlanToMps,
        }

from '@/api/logi/production'

export default {
  async SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE({commit}, payload) {

      const res = await searchContractDetailInMpsAvailable(payload)
      const gridRowJson = res.data.gridRowJson;

      commit('SET_SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE', gridRowJson)
  },

  async CONVERT_CONTRACT_DETAIL_TO_MPS({commit}, payload) {
    try {
      const {data} = await convertContractDetailToMps(payload)
      commit('SET_CONTRACT_DETAIL_LIST', data.result.data.gridRowJson[0])
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },


    async SEARCH_SALESPLAN_IN_MPS_AVAILABLE({commit}, payload) {

        const res = await searchSalesPlanInMpsAvailable(payload)
        console.log(res.data)
        console.log("res.data")

        commit('SET_SEARCH_SALESPLAN_IN_MPS_AVAILABLE', res.data)
    },


    async CONVERT_SALESPLAN_TO_MPS({commit}, payload) {
      console.log(payload)
      console.log("payload")

        try {
            const {data} = await convertSalesPlanToMps(payload)
            commit('SET_SALESPLAN_LIST', data.result.data.gridRowJson[0])
            return data
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message)
            }
            return null
        }
    },

  //차트용
  async SEARCH_MPS_LIST({commit}) {
    const data = await searchMps()
    console.log(data.data.result)
    console.log("data.data.result")

    commit('SEARCH_MPS_LIST', data.data.result)
  },
}
