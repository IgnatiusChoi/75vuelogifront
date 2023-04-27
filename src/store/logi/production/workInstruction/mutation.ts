import { MutationTree } from 'vuex'
import { WorkInstruction } from '@/store/logi/production/workInstruction/state'

export const mutations: MutationTree<WorkInstruction> = {

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
  }
}

export default mutations
