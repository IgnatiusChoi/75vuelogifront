// import { MutationTree } from 'vuex'
// import { WorkInstruction } from '@/store/logi/production/workInstruction/state'

// export const mutations: MutationTree<WorkInstruction> = {

export default {

  SHOW_WORK_INFO_LIST(state, gridRow) {
    state.detailGrid = []
    state.grid = gridRow
  },

  SET_TABLE(state, tableColumns) {
    state.tableColumns = tableColumns[0].tableColumns
    state.detailTableColumns = tableColumns[0].detailTableColumns
  },

  SET_WORK_ORDER_LIST(state, workOrderListItem) {
    console.log('워크오더리스트 뮤테이션',workOrderListItem)
    state.workOrderListItem=workOrderListItem
  },

  SET_PRODUCTION_PERFORMANCE_INFO_LIST(state, productionPerformanceInfoListItem) {
    state.workPerformanceManagementListItem=productionPerformanceInfoListItem
  },

  SET_WORK_ORDER_DIALOG(state,workOrderDialog){
    state.workOrderDialog=workOrderDialog
  },

  SEARCH_WORK_ORDER_INFO(state, workOrderInfo){
    console.log('SEARCH_WORK_ORDER_INFO', workOrderInfo)
    state.workOrderInfo=workOrderInfo
  },

  SET_WORK_SITE(state, workSiteList){
    console.log('SET_WORK_SITE')
    console.log(workSiteList)
    state.workSiteList=workSiteList
  },

  SEARCH_WORK_ORDER_INFO_LIST_STATUS(state, workOrderInfo){
    console.log('SEARCH_WORK_ORDER_INFO_LIST_STATUS')
    console.log(workOrderInfo)
    state.workOrderInfo=workOrderInfo
  },

  SEARCH_PRODUCTION_PROCESS_CODE(state, productionProcessCode){
    console.log('SEARCH_PRODUCTION_PROCESS_CODE')
    state.workPlaceDetailList = productionProcessCode
  },


}

