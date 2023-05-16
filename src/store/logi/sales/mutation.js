export default {

  SEARCH_INFO(state, estimateList) {
    //견적상세일련번호
    state.estimateList = estimateList
    console.log(estimateList)
    let rowData = []
    estimateList.map(e => {
      const { estimateDetailTOList } = e
      rowData = rowData.concat(estimateDetailTOList)
      console.log(rowData)
    })
    state.estimateDetailList = rowData


  },

  setGrid(state, gridRow) {
    state.detailGrid = []
    state.grid = gridRow
  },

  searchGrid(state, searchData) {
    state.searchGrid = searchData

  },

  setDetailGrid(state, gridRow) {
    state.detailGrid = gridRow
  },
  setTable(state, tableColumns) {
    state.tableColumns = tableColumns[0].tableColumns
    state.detailTableColumns = tableColumns[0].detailTableColumns
  },
  salesplane(state, gridRow) {
    state.salesplan = gridRow
  },
}
