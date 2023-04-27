import mutations from '@/store/logi/production/workInstruction/mutation';
import actions from '@/store/logi/production/workInstruction/action';
export class WorkInstruction {
    constructor() {
        this.contractDetailList = [];
        this.grid = [];
        this.detailGrid = [];
        this.tableColumns = [];
        this.detailTableColumns = [];
        this.workOrderListItem = [];
        this.workPerformanceManagementListItem = [];
        this.workOrderDialog=[];
    }
}
const Production = {
    namespaced: true,
    state: new WorkInstruction(),
    mutations,
    actions,
};
export default Production;
