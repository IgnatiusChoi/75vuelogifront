import Vuex, { Module } from 'vuex'
import mutations from '@/store/logi/production/mrp/mutation'
import actions from '@/store/logi/production/mrp/action'

export class Mrp {
    public mpsList: Object[] = [];
    public mrpList: Object[] = [];
    public getMrpGatherList: Object[] = [];
    public mrpResultList: Object[] = [];
    public mrpNoAndItemCodeList: Object = Object
    public searchMrpGatheringList: Object = [];

}

const Production: Module<Mrp, Object> = {
    namespaced: true,
    state: new Mrp(),
    mutations,
    actions,
}

export default Production
