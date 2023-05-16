import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {

    companyList: [],

    workplaceList: [],
    workplaceListDetail: [],

    deptList: [],
    nClientList: [],
    fClientList: [],



  },
  getters: {
  },

  mutations,

  actions,

}
