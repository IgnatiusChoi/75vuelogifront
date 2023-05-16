export default {

    SEARCH_WORKPLACE(state, workplaceListDetail) {
        state.workplaceListDetail = workplaceListDetail;
    },

    SEARCH_WORKPLACE_LIST(state, workplaceList) {
        state.workplaceList = workplaceList;
    },

    setTable(state, tableColumns) {
        state.tableColumns = tableColumns[0].tableColumns
        state.detailTableColumns = tableColumns[0].detailTableColumns
    },

}

