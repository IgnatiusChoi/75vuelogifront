import Vuex, { Module } from 'vuex'
import mutations from '@/store/logi/production/workInstruction/mutation'
import actions from '@/store/logi/production/workInstruction/action'

export class WorkInstruction {

  public contractDetailList: Object[] = [];
  public grid: Object[] = [];
  public detailGrid: Object[] = [];
  public tableColumns: Object[] = [];
  public detailTableColumns: Object[] = [];

  public workOrderListItem: Object[] = [];
  public workPerformanceManagementListItem: Object[] = [];
  public workOrderDialog: Object[] = [];
}

const Production: Module<WorkInstruction, Object> = {
  namespaced: true,
  state: new WorkInstruction(),
  mutations,
  actions,

}

export default Production
