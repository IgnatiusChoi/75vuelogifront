export default {
  SEARCH_ITEM(state, itemList) {
    state.itemList = itemList
  },
  GET_WAREHOUSE_LIST(state,warehouseList) {
    state.warehouseList=warehouseList
  },
  setTable(state, tableColumns) {
    state.tableColumns = tableColumns[0].tableColumns
    state.detailTableColumns = tableColumns[0].detailTableColumns
  },

  GET_COMPANY_INFO(state, payload) {
    state.companyInfo = payload
  },

  SEARCH_CLIENT_LIST(state, payload){
    state.nClientList = payload
  },
  RESET_CLIENT(state){
    state.nClientList=[]
  },

  setGrid(state, gridRow) {
    state.grid = gridRow
  },

  LogiCompany(state, companyCode){
    state.companyCode = companyCode
    console.log(companyCode)
  },

  GET_DEPT_INFO(state, payload){
    state.deptInfo = payload
  },

  GET_WAREHOUSE_DETAIL_LIST(state,payload){
    state.warehouseDetailList=payload
  },
  SET_CODE(state, data){
    state.codeList = data
  },

  // logi 모듈에서 warehouseList 상태를 삭제하는 mutation 함수

  DELETE_WAREHOUSE_LIST(state, warehouseList) {
    console.log(state.warehouseList)
    state.warehouseList = state.warehouseList.filter((item)=>item.customerCode !== customerCode);

  },
  SET_ITEM(state, item) {
    state.itemList=item;
  }



}

