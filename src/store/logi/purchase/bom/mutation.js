export default {
  SEARCH_ITEM_CODE_LIST(state, itemCodeList) {
    state.itemCodeList = itemCodeList
  },
  SEARCH_BOM_LIST(state, bomList) {
    state.bomList = bomList
  },
  SEARCH_REGIST_BOM_LIST(state, bomRegistList) {
    state.bomRegistList = bomRegistList
  },

  //dbs
  SEARCH_BOM_DATA_LIST(state, bomDataList) {
    state.bomDataList = bomDataList;
  },

  BATCH_BOM_LIST(state, bomRegistList) {
    state.bomRegistList = bomRegistList
  },

}
