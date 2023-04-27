import Vuex, { Module } from 'vuex'
import mutations from '@/store/logi/production/mps/mutation'
import actions from '@/store/logi/production/mps/action'

export class Mps {
    public contractDetailList: Object[] = [];
}

const Production: Module<Mps, Object> = {
  namespaced: true,
  state: new Mps(),
  mutations,
  actions,

}

export default Production
