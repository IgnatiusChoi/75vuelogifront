import { MutationTree } from 'vuex'
import { Mrp } from '@/store/logi/production/mrp/state'

export const mutations: MutationTree<Mrp> = {

  // mrpPage -> mps 조회
  SET_SEARCH_MPS_LIST(state, mpsList) {
    console.log('test')
    console.log(mpsList)
    state.mpsList = mpsList
  },

  // MRP 모의전개 LIST 띄우기
  SET_SEARCH_MRP_LIST(state, mrpList) {
    state.mrpList = mrpList
  },

  // 소요량취합 탭 눌렀을 시
  SET_MRP_GATHER_LIST(state, mrpGatherList) {
    const mrpNoAndItemCodeList = {}
    const size = mrpGatherList.length
    // eslint-disable-next-line no-plusplus
    for (let mrpIndex = 0; mrpIndex < size; mrpIndex++) {
      // @ts-ignore
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
    console.log(state.searchMrpGatheringList)
  },
}

export default mutations
