export default {

    SEARCH_INFO(state, estimateList) {
        state.estimateList = estimateList

        let rowData = []
        estimateList.map(e => {
            const { estimateDetailTOList } = e
            rowData = rowData.concat(estimateDetailTOList)
        })
        state.estimateDetailList = rowData

        console.log(`estimateList${estimateList}`)
        console.log(JSON.stringify(rowData))
    },

    setGrid(state, gridRow) {
        state.outsourceGrid=gridRow
        // state.detailGrid = []
        // state.grid = gridRow
    },
    setOutsourcInfo(state, gridRow){
        state.outsourceInfoGrid=gridRow
    },
    setFowardInfo(state, gridRow){
        state.outFowardInfoGrid=gridRow
    },
    setInspectionInfo(state, gridRow){
      state.inspectionInfo=gridRow
    },
    setDetailGrid(state, gridRow) {
        state.detailGrid = gridRow
    },
    setTable(state, tableColumns) {
        state.tableColumns = tableColumns[0].tableColumns
        state.detailTableColumns = tableColumns[0].detailTableColumns
    },
}
