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
}
