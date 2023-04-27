import { ActionContext, ActionTree } from 'vuex'
import { Mps } from 'C:/Users/user/vue_front/src/store/logi/production/mps/state'


// @ts-ignore
import { searchContractDetailInMpsAvailable, convertContractDetailToMps } from '@/api/logi/production'

const actions: ActionTree<Mps, Object> = {
  async SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE(state: ActionContext<Mps, Object>, payload) {
    try {
      const { data } = await searchContractDetailInMpsAvailable(payload)
      state.commit('SET_SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE', data.result.data.gridRowJson)

      return data
    } catch (err) {
      // 기존에는 err의 타입이 any였는데,
      // tsconfig에서 `strict: true`인 경우 err의 타입이 unknown으로 변경되었다.
      if (err instanceof Error) {
        console.error(err.message) // 이렇게 사용해야 한다
      }
      return null // 왜 여기에도 리턴을...
    }
  },

  async CONVERT_CONTRACT_DETAIL_TO_MPS({ commit }, payload) {
    try {
      const { data } = await convertContractDetailToMps(payload)
      commit('SET_CONTRACT_DETAIL_LIST', data.result.data.gridRowJson[0])
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },
}

export default actions
