import { ActionTree } from 'vuex'
import { Mrp } from '@/store/logi/production/mrp/state'

import {
  searchMpsList,
  searchMrpList,
  registerMrp,
  mrpGatherList,
  mrpGatherResultList,
  gatherResultRegist,
  searchMrpGathering,
// @ts-ignore
} from '@/api/logi/production'

const actions: ActionTree<Mrp, Object> = {

  // MRP에서 MPS조회
  async SEARCH_MPS_LIST({ commit }, payload) {
    try {
      const { data } = await searchMpsList(payload)
      commit('SET_SEARCH_MPS_LIST', data.result.data.gridRowJson)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  // MRP모의전개
  async SEARCH_MRP_LIST({ commit }, payload) {
    try {
      const { data } = await searchMrpList(payload)
      commit('SET_SEARCH_MRP_LIST', data.gridRowJson)

      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  // 전개결과 MRP 등록
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

  // 소요량취합 Tab TableList
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

  // MrpGather 결과 조회
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

  // 취합 결과 등록
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

export default actions
