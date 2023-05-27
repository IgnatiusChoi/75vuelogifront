export default {

  /*** 수주 ***/
  SET_SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE(state, contractDetail) {
    state.contractDetailList = contractDetail
  },

  SET_CONTRACT_DETAIL_LIST(state, contractDetail) {
    if (state.contractDetailList.length > 1) {
      const result = state.contractDetailList.filter((list) => list.contractDetailNo !== contractDetail.contractDetailNo);
      state.contractDetailList = result
    } else {
      state.contractDetailList = []
    }
  },

  /*** 판매계획 ***/
  SET_SEARCH_SALESPLAN_IN_MPS_AVAILABLE(state, salesPlanList) {
    state.salesPlanList = salesPlanList
  },

  SET_SALESPLAN_LIST(state, salesPlanList) {
    if (state.salesPlanList.length > 1) {
      const result = state.salesPlanList.filter((list) => list.contractDetailNo !== contractDetail.contractDetailNo);
      state.salesPlanList = result
    } else {
      state.salesPlanList = []
    }
  },

  //차트용
  SEARCH_MPS_LIST(state, mpsList){
    const months = mpsList.map(item => parseInt(item.mpsPlanDate.split('-')[1]));
    state.MpsCount = months
  },
}
