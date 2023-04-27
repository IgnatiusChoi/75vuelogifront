//import {SET_ALL_EMP_LIST} from './mutation-types'
/*** VUE version 2 TYPESCRIPT 를 구현함 ***/
var MutationTypes;
(function (MutationTypes) {
    MutationTypes["SET_ALL_EMP_LIST"] = "SET_ALL_EMP_LIST";
})(MutationTypes || (MutationTypes = {}));
/////////////////////////위에꺼 안써도됨////////////////////////////////
export const mutations = {
    SET_ALL_EMP_LIST(state, payload) {
        state.allEmpList = payload;
    },
    SET_EMP_DETAIL(state, payload) {
        state.empDetail = payload;
    }
};
export default mutations;
