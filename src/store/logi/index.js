import router from '@/router/index'
import mps from '@/store/logi/production/mps/state'
import mrp from '@/store/logi/production/mrp/state'
import order from '@/store/logi/purchase/order/state'
import workInstruction from '@/store/logi/production/workInstruction/state'
import sales from './sales/state'
import base from './base/state'
import outsource from './outsourc/state'
import bom from '@/store/logi/purchase/bom/state'
import stock from '@/store/logi/purchase/stock/state'

export default {
  namespaced: true,
  state: {
    connect: false,
  },
  getters: {
  },
  actions: {
  },
  mutations: {
  },
  modules: {
    sales, mps, mrp, workInstruction, base, order, outsource, bom, stock
  },
}
