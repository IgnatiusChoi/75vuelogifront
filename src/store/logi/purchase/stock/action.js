import {
  getWarehouseDetailList,
  getStockList,
} from '@/api/logi/purchase'

export default {
  async SEARCH_STOCK_DETAIL_LIST({ commit }, date) {
    try {
      const res = await getWarehouseDetailList(date)
      const gridRow = res.data.gridRowJson
      commit('GET_WAREHOUSE_DETAIL_LIST', gridRow)

      // return res
    } catch (err) {
      throw new Error(err)
    }
  },

  async SEARCH_STOCK_LIST({ commit }) {
    try {
      const res = await getStockList()
      const gridRow = res.data.gridRowJson
      commit('SEARCH_STOCK_LIST', gridRow)

      // return res
    } catch (err) {
      throw new Error(err)
    }
  },

}
