import { ActionContext, ActionTree } from 'vuex'
// @ts-ignore
import { showWorkInfoList, searchWorkOrderList, productionPerformanceInfoList, showWorkOrderDialog } from '@/api/logi/production.js'
import { WorkInstruction } from '@/store/logi/production/workInstruction/state'

const actions: ActionTree<WorkInstruction, Object> = {

  setTable(state: ActionContext<WorkInstruction, Object>, tableColumns) {
    state.commit('SET_TABLE', tableColumns)
  },

  // 작업지시조회
  // ActionContext안에 state commit dispatch가 들어있음
  // eslint-disable-next-line consistent-return
  async SHOW_WORK_INFO_LIST(state: ActionContext<WorkInstruction, Object>) {
    try {
      const { data } = await showWorkInfoList()
      console.log(data)

      const gridRow = data.gridRowJson
      console.log(gridRow)
      state.commit('SHOW_WORK_INFO_LIST', gridRow)

      // commit('showWorkInfoList', data)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  async SEARCH_WORK_ORDER_LIST({ commit }){
    try {
      const { data } = await searchWorkOrderList() // 뒤단 요청해서 데이터 받음
      console.log("좀찍혀라;;;")
      console.log('이거',data)
      commit('SET_WORK_ORDER_LIST', data.gridRowJson) // commit
     // return null
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },
 //searchProductionPerformanceInfoList
  async SEARCH_PRODUCTION_PERFORMANCE_INFO_LIST({ commit }){
    try {
      const { data } = await productionPerformanceInfoList()
      console.log("나와랍!!!")
      console.log('이거',data)
       commit('SET_PRODUCTION_PERFORMANCE_INFO_LIST', data.gridRowJson)
      // return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  async SHOW_WORK_ORDER_DIALOG({ commit },payload){
    try {
      const { data } = await showWorkOrderDialog(payload)
      console.log("나와랍!!!")
      //commit('SET_PRODUCTION_PERFORMANCE_INFO_LIST', data.gridRowJson)
      commit('SET_WORK_ORDER_DIALOG', data.result);
      // return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

}

export default actions
