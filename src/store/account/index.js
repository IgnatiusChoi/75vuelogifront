import account from './account/state'
import base from './base/state'
import statement from './statement/state'

export default {
  namespaced: true,
  modules: {
    account,
    base,
    statement,
  },
  state: {
    connect: false,

  },
  getters: {
  },
  mutations: {
  },
}
