import { ActionTree } from 'vuex'

// @ts-ignore
import { searchOrderList } from '@/api/logi/purchase'
import { Order } from '@/store/logi/purchase/order/state'

const actions: ActionTree<Order, Object> = {

  // 재고처리/발주필요 목록조회
  async SEARCH_ORDER_LIST({ commit }, payload) {
    try {
      const { data } = await searchOrderList(payload)
      console.log(data)
      commit('SET_ORDER_LIST', data.gridRowJson)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },
}

export default actions
