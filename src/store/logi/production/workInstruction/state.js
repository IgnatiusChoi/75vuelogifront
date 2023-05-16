import Vuex, { Module } from 'vuex'
import mutations from './mutation.js'
import actions from './action.js'

// export class WorkInstruction {

export default {
  namespaced: true,
  state: {
    contractDetailList:[],
    grid:[],
    detailGrid:[],
    tableColumns:[],
    detailTableColumns:[],
    workOrderListItem:[],
    workPerformanceManagementListItem:[],
    workOrderDialog:[],
    workOrderInfo:[],
    workSiteList:[],
    workSiteLogList:[],
    workSite:[],
    workOrderInfoListStatus:[],
    workPlaceDetailList: [],
    workPlaceDetailColumns: []
  },
  mutations,
  actions
}

// const Production: Module<WorkInstruction, Object> = {
//   namespaced: true,
//   state: new WorkInstruction(),
//   mutations,
//   actions,
//
// }
