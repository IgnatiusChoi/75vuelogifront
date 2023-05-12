export default {
  SET_SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE(state, contractDetail) {
    state.contractDetailList = contractDetail
  },

  // mps 등록 조회
  SET_CONTRACT_DETAIL_LIST(state, contractDetail) {
    if (state.contractDetailList.length > 1) {
      const result = state.contractDetailList.filter((list) => list.contractDetailNo !== contractDetail.contractDetailNo);
      state.contractDetailList = result
    } else {
      state.contractDetailList = []
    }
  },

  SEARCH_MPS_LIST(state, mpsList){
    const months = mpsList.map(item => parseInt(item.mpsPlanDate.split('-')[1]));
    state.MpsCount = months
  }

}
