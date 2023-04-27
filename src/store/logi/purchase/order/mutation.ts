import { MutationTree } from 'vuex'
import { Order } from '@/store/logi/purchase/order/state'

export const mutations: MutationTree<Order> = {

  // 재고처리/발주필요 목록조회
  SET_ORDER_LIST(state, orderList) {
    state.orderList = orderList
  },
}

export default mutations
