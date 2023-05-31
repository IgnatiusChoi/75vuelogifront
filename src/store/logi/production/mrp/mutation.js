export default {

  //수주로 MPS 등록 건 조회
  SET_MPS_LIST_BY_CONTRACT(state, data) {
    let filteredMpsList = [];
    filteredMpsList = data.filter((list) => list.mpsPlanClassification==='수주');
    state.mpsListByContract = filteredMpsList
  },

  //판매계획으로 MPS 등록 건 조회
  SET_MPS_LIST_BY_SALESPLAN(state, data) {
    let filteredMpsList = [];
    filteredMpsList = data.filter((list) => list.mpsPlanClassification==='판매계획');
    state.mpsListBySalesPlan = filteredMpsList
  },

  // MRP 모의전개 LIST 띄우기
  SET_SEARCH_MRP_LIST(state, mrpList) {
    state.mrpList = mrpList
  },

  // 품목별 조달구분 탭 눌렀을 시
  SET_MRP_GATHER_LIST(state, mrpGatherList) {
    const mrpNoAndItemCodeList = {}
    const size = mrpGatherList.length

    for (let mrpIndex = 0; mrpIndex < size; mrpIndex++) {
      mrpNoAndItemCodeList[mrpGatherList[mrpIndex].mrpNo] = mrpGatherList[mrpIndex].itemCode
    }

    state.mrpNoAndItemCodeList = mrpNoAndItemCodeList
    state.getMrpGatherList = mrpGatherList
  },

  SET_MRP_RESULT_LIST(state, mrpResultList) {
    state.mrpResultList = mrpResultList
  },

  // 소요량취합 조회
  SET_SEARCH_MRP_GATHERING(state, searchMrpGathering) {
    state.searchMrpGatheringList = searchMrpGathering
  },
}
