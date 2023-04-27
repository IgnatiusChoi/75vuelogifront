import Vuex, { Module } from 'vuex'
import mutations from '@/store/logi/purchase/order/mutation'
import actions from '@/store/logi/purchase/order/action'

export class Order {
    public orderList: Object[] = [];
}

const Purchase: Module<Order, Object> = {
    namespaced: true,
    state: new Order(),
    mutations,
    actions,
}

export default Purchase
