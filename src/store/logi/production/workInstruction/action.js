import { ActionContext, ActionTree } from 'vuex'
// @ts-ignore
import { showWorkInfoList, searchWorkOrderList, productionPerformanceInfoList, showWorkOrderDialog, searchWorkOrderListInfo, searchWorkOrderInfoListStatus,  searchWorkSite, searchProductionProcessCode, insertWorkPlaceList, deleteWorkPlaceList} from '@/api/logi/production.js'
import { WorkInstruction } from './state'
import {searchContractDetail} from "@/api/logi/sales";
// import {deleteClientList, insertClientList} from "@/api/logi/compInfo";

// const actions: ActionTree<WorkInstruction, Object> = {
//
//   setTable(state: ActionContext<WorkInstruction, Object>, tableColumns) {
//     state.commit('SET_TABLE', tableColumns)
//   },


export default {
  // 작업지시조회
  // ActionContext안에 state commit dispatch가 들어있음
  // eslint-disable-next-line consistent-return
  async SHOW_WORK_INFO_LIST() {
    try {
      const { data } = await showWorkInfoList()
      console.log(data)

      const gridRow = data.gridRowJson
      console.log(gridRow)
      commit('SHOW_WORK_INFO_LIST', gridRow)

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
      console.log('searchWorkOrderList')
      const { data } = await searchWorkOrderListInfo() // 뒤단 요청해서 데이터 받음
      console.log("searchWorkOrderList")
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
  // 생산실적관리
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

  async SEARCH_WORK_ORDER_LIST_INFO({commit}){
    try{
      console.log('searchWorkOrderListInfo')
      const {data} = await searchWorkOrderListInfo()
      console.log(data)
      commit('SEARCH_WORK_ORDER_LIST_INFO', data.gridRowJson)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }

  },


  async SEARCH_WORK_ORDER_INFO_LIST_STATUS({commit}){
    try{
      console.log('searchWorkOrderInfoListStatus')
      const { data } = await searchWorkOrderInfoListStatus()
      console.log(data)
      commit('SEARCH_WORK_ORDER_INFO_LIST_STATUS', data.gridRowJson)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }

  },





  async SEARCH_WORK_SITE({commit}){
    try {
      console.log('SEARCH_WORK_SITE01')
      const { data } = await searchWorkSite()
      console.log(data)
      console.log(data[0])
      console.log('SEARCH_WORK_SITE02')
      commit('SET_WORK_SITE', data.gridRowJson)


    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },


  async SEARCH_PRODUCTION_PROCESS_CODE({ commit }, payload){
    try{
      console.log('SEARCH_PRODUCTION_PROCESS_CODE')
      console.log(payload)
      const res = await searchProductionProcessCode(payload)
      const gridRow = res.data.gridRowJson
      commit('SEARCH_PRODUCTION_PROCESS_CODE', gridRow)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },


  async INSERT_WORK_PLACE_LIST({ commit }, param){
    console.log('INSERT_WORK_PLACE_LIST')
    const { data } = await insertWorkPlaceList(param)
    console.log("param" + param)
    commit('INSERT_WORK_PLACE_LIST', data.workPlaceList)
  },

  async DELETE_WORK_PLACE_LIST({commit}, param){
    console.log(param)
    console.log(param[0])
    const {data} = await deleteWorkPlaceList(param)
    console.log(data)
    console.log(data.workOrderNo)
  }



}
