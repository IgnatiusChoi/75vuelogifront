import getters from "@/store/hr/affair/api";
import mutations from "@/store/hr/affair/mutation";
import actions from "@/store/hr/affair/action";
/*** VUE version 2 TYPESCRIPT 를 구현함 ***/
export class EmpList {
    constructor() {
        this.allEmpList = [];
        this.empDetail = [];
    }
}
const Emp = {
    namespaced: true,
    state: new EmpList(),
    getters,
    mutations,
    actions
};
/*export default{
    namespaced : true,
    state : new EmpList(),
    getters : getters,
    mutations : mutations,
    actions : actions
}*/
/*
export const state = {
    allEmpList : [],
}
*/
//export type State = typeof Emplist
export default Emp;
