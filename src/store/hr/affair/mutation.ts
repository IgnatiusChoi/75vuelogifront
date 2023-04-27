import {EmpList} from "./state";
import {MutationTree} from "vuex";
//import {SET_ALL_EMP_LIST} from './mutation-types'

/*** VUE version 2 TYPESCRIPT 를 구현함 ***/

enum MutationTypes{
    SET_ALL_EMP_LIST = 'SET_ALL_EMP_LIST'
}

export type Mutations<S = EmpList> = {
    [MutationTypes.SET_ALL_EMP_LIST](state: S, payload: []):void
}
/////////////////////////위에꺼 안써도됨////////////////////////////////

export const mutations: MutationTree<EmpList> = {
    SET_ALL_EMP_LIST(state, payload: Object){
        state.allEmpList = payload;
    },
    SET_EMP_DETAIL(state, payload: Object){
        state.empDetail = payload;
    }

}

export default mutations;