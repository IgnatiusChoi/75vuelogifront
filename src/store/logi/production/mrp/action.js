
import {
  searchMpsList,
  searchMrpList,
  registerMrp,
  mrpGatherList,
  mrpGatherResultList,
  gatherResultRegist,
  searchMrpGathering,
  updateMps

} from '@/api/logi/production'

export default {

  /**
   * MPS 계획일자 별 MPS 조회
   */
  async SEARCH_MPS_LIST({ commit }, payload) {
    try {
      const { data } = await searchMpsList(payload)
      commit('SET_SEARCH_MPS_LIST', data.result)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  /**
   * Mps 수정
   */
  async UPDATE_MPS(_, payload) {
    await updateMps(payload)
  },

  /**
   * MRP모의전개
   */
  async SEARCH_MRP_LIST({ commit }, payload) {
    try {
      const { data } = await searchMrpList(payload)
      commit('SET_SEARCH_MRP_LIST', data.result)
      return data
    }
    catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  /**
   * MRP 등록
   */
  async REGISTER_MRP(_, payload) {
    try {
      const { data } = await registerMrp(payload)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },


  /**
   * 품목별 조달 계획 디폴트 테이블
   */
  async SEARCH_MRP_GATHER_LIST_REQUEST({ commit }, payload) {
    try {
      const { data } = await mrpGatherList(payload)
      commit('SET_MRP_GATHER_LIST', data.gridRowJson)
      return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  /**
   * 품목별 조달 계획 - 소요량 취합 실행 버튼
   */
  async SEARCH_MRP_GATHER_RESULT_LIST({ commit }, payload) {
    try {
      const { data } = await mrpGatherResultList(payload)
      commit('SET_MRP_RESULT_LIST', data.gridRowJson)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  /**
   * 품목별 조달 계획 - 소요량 취합 실행 버튼 - 취합 결과 등록 버튼
   */
  async GATHER_RESULT_REGIST(_, payload) {
    try {
      const { data } = await gatherResultRegist(payload)
      return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  // 소요량취합 조회
  async SEARCH_MRP_GATHERING({ commit }, payload) {
    try {
      const { data } = await searchMrpGathering(payload)
      commit('SET_SEARCH_MRP_GATHERING', data.gridRowJson)
      return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },
}
