import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    itemList: [],
    codeList: [],
    companyCode:[],
    warehouseList: [],
    warehouseDetailList: [],
    deptList: [],
    DeptInfo:[],

    grid: [],
    detailGrid: [],
    tableColumns: [],
    detailTableColumns: [],


  },
  getters: {
  },

  mutations,

  actions,

}
