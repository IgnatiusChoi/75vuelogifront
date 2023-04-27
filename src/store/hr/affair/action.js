import axios from 'axios';
/*** VUE version 2 TYPESCRIPT 를 구현함 ***/
const FetchAxiosEmp = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "content-type": "application/json"
    },
});
const actions = {
    GET_ALL_EMP_LIST(state) {
        FetchAxiosEmp.get("/hr/affair/empList")
            .then((response) => {
            state.commit('SET_ALL_EMP_LIST', response.data);
        });
    },
    GET_EMP_DETAIL(state, empCode) {
        FetchAxiosEmp.get(`/hr/affair/empList/${empCode}`)
            .then((response) => {
            state.commit('SET_EMP_DETAIL', response.data);
        });
    },
};
/*class AFFAIR { // AFFAIR.GET_ALL_EMP_LIST(); 로 불러올 수 있음 (클래스+함수형 으로 해버리면 모듈화가 힘들다)
class AFFAIR { // AFFAIR.GET_ALL_EMP_LIST(); 로 불러올 수 있음
    GET_ALL_EMP_LIST() {
        console.log('액션')
        // import and DispatchHrEmp.getAll();
        return FetchAxiosEmp.get("/hr/affair/empList")
            .then((response) => {
                mutations.SET_ALL_EMP_LIST(state, response.data);
            });
    }
}*/
export default actions;
