import mutations from '@/store/logi/production/mrp/mutation';
import actions from '@/store/logi/production/mrp/action';
export class Mrp {
    constructor() {
        this.mpsList = [];
        this.mrpList = [];
        this.getMrpGatherList = [];
        this.mrpResultList = [];
        this.mrpNoAndItemCodeList = Object;
        this.searchMrpGatheringList = [];
    }
}
const Production = {
    namespaced: true,
    state: new Mrp(),
    mutations,
    actions,
};
export default Production;
