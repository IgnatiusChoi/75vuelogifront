import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    itemList: [],
    itemGroupList: [],
    codeList: [],

    companyCode:[],

    warehouseList: [],
    warehouseDetailList: [],

    deptInfo:[],

    grid: [],
    detailGrid: [],
    tableColumns: [],
    detailTableColumns: [],
    companyInfo: [],
    nClientList: [],
    nClientDetailList: [],
    fClientList: [],
    fClientDetailList: [],

  },
  getters: {
  },

  mutations,

  actions,

}
