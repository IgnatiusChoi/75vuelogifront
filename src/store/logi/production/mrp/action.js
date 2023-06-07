
import {
  searchMpsList,
  searchMrpList,
  registerMrp,
  mrpGatherList,
  mrpGatherResultList,
  gatherResultRegist,
  searchMrpGathering,
  updateMps,
  searchMrpGatheringCalendar,

} from '@/api/logi/production'

export default {

  /**
   * 수주로 MPS 등록 건 조회
   */
  async SEARCH_MPS_LIST_BY_CONTRACT({ commit }, payload) {
    try {
      const { data } = await searchMpsList(payload)
      commit('SET_MPS_LIST_BY_CONTRACT', data.result)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },
  /**
   * 판매계획으로 MPS 등록 건 조회
   */
  async SEARCH_MPS_LIST_BY_SALESPLAN({ commit }, payload) {
    try {
      const { data } = await searchMpsList(payload)
      commit('SET_MPS_LIST_BY_SALESPLAN', data.result)
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
   * MRP 모의전개
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

  /**
   * 소요량 취합 결과 조회
   */
  async SEARCH_MRP_GATHERING({ commit }, payload) {
    try {
      const { data } = await searchMrpGathering(payload)
      commit('SET_SEARCH_MRP_GATHERING', data)
      return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  /**
   * 소요량 취합 캘린더
   */
  async SEARCH_MRP_GATHERING_CALENDAR({ commit }, month) {
    try {
      const { data } = await searchMrpGatheringCalendar(month)
      console.log(data)
      console.log("data")

      commit('SET_SEARCH_MRP_GATHERING_CALENDAR', data)
      return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

}
