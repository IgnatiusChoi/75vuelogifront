import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    itemList: [],
    codeList: [],

    warehouseList: [],
    warehouseDetailList: [],

    grid: [],
    detailGrid: [],
    tableColumns: [],
    detailTableColumns: [],
    companyInfo: [],
    deptList: [],
    DeptInfo: [],
    nClientList: [],
    fClientList: [],

  },
  getters: {
  },


  mutations,

  actions,

}