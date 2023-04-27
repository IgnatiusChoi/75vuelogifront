import {EmpList} from './state'
import {GetterTree} from "vuex";

const getters: GetterTree<EmpList, Object> = {
    GETTER_ALL_EMP_LIST(state: EmpList): Object{
        return state.allEmpList;
    },
    GETTER_EMP_DETAIL(state: EmpList): Object{
        return state.empDetail;
    }
};

export default getters