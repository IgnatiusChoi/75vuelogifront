export const mutations = {
    SHOW_WORK_INFO_LIST(state, gridRow) {
        state.detailGrid = [];
        state.grid = gridRow;
    },
    SET_TABLE(state, tableColumns) {
        state.tableColumns = tableColumns[0].tableColumns;
        state.detailTableColumns = tableColumns[0].detailTableColumns;
    },
    SET_WORK_ORDER_LIST(state, workOrderListItem) {
        console.log('워크오더리스트 뮤테이션',workOrderListItem)
        state.workOrderListItem=workOrderListItem;
    },
    SET_PRODUCTION_PERFORMANCE_INFO_LIST(state, productionPerformanceInfoListItem) {
        state.workPerformanceManagementListItem=productionPerformanceInfoListItem
    },
    SET_WORK_ORDER_DIALOG(state,workOrderDialog){
        state.workOrderDialog=workOrderDialog
    }
};
export default mutations;
