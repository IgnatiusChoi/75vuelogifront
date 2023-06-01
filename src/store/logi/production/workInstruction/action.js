import { showWorkInfoList, searchWorkOrderList, productionPerformanceInfoList, showWorkOrderDialog, searchWorkOrderListInfo, searchWorkOrderInfoListStatus,
  searchWorkSite, searchProductionProcessCode, insertWorkPlaceList, deleteWorkPlaceList, workOrder, workOrderCompletion, editCellBlur} from '@/api/logi/production.js'

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

  //작업지시 Tab -  작업지시 필요항목 조회
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

  //작업지시 Tab -  작업지시 모의전개
  async SHOW_WORK_ORDER_DIALOG({ commit },payload){
    try {
      const { data } = await showWorkOrderDialog(payload)
      console.log("나와랍!!!")
      //commit('SET_PRODUCTION_PERFORMANCE_INFO_LIST', data.gridRowJson)
      commit('SET_WORK_ORDER_DIALOG', data.result);
      console.log(data.result)
      // return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  //작업지시 Tab - 작업지시 모의전개 버튼 누른 후 - 실제 작업 지시 버튼
  async WORK_ORDER({commit}, param) {
    try {
      console.log(param)
      const {data} = await workOrder(param)
      console.log(data)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

  //작업지시현황 Tab - 작업지시현황조회
  async SEARCH_WORK_ORDER_INFO_LIST_STATUS({commit}){
    try{
      console.log('searchWorkOrderInfoListStatus')
      const { data } = await searchWorkOrderInfoListStatus()
      console.log(data)
      data.forEach(item => {
        item.isEdit=false
      })
      console.log(data)
      commit('SEARCH_WORK_ORDER_INFO_LIST_STATUS', data)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }

  },
  //작업지시현황 Tab - 작업완료등록
  async WORK_ORDER_COMPLETION({commit}, payload){
    try{
      console.log('WORK_ORDER_COMPLETION')
      const {data} = await workOrderCompletion(payload)
      console.log(data)
      commit('WORK_ORDER_COMPLETION', data.result)
      console.log(data.result)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }

  },

  async EDIT_CELL_BLUR({commit}, payload){
    try{
      console.log('EDIT_CELL_BLUR', payload)
      const {data} = await editCellBlur(payload)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return data;
    }
  },

  //생산실적관리 Tab - 생산실적조회
  async SEARCH_PRODUCTION_PERFORMANCE_INFO_LIST({ commit }){
    try {
      const { data } = await productionPerformanceInfoList()
      console.log("SEARCH_PRODUCTION_PERFORMANCE_INFO_LIST")
      console.log(data)
      commit('SET_PRODUCTION_PERFORMANCE_INFO_LIST', data)
      // return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },



  // async SEARCH_WORK_ORDER_LIST_INFO({commit}){
  //   try{
  //     console.log('searchWorkOrderListInfo')
  //     const {data} = await searchWorkOrderListInfo()
  //     console.log(data)
  //     commit('SEARCH_WORK_ORDER_LIST_INFO', data.gridRowJson)
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       throw new Error(err.message)
  //     }
  //     return null
  //   }
  //
  // },









//작업장/작업장 로그 = 작업장 조회
  async SEARCH_WORK_SITE({commit}){
    try {
      console.log('SEARCH_WORK_SITE01')
      const { data } = await searchWorkSite()
      console.log("data =",data)
      console.log("data.workSiteList =",data.WorkSiteList)
      console.log('SEARCH_WORK_SITE02')
      commit('SET_WORK_SITE', data.WorkSiteList)


    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

//작업장/작업장 로그 = 작업장 로그 조회
  async SEARCH_PRODUCTION_PROCESS_CODE({ commit }, payload){
    try{
      console.log('SEARCH_PRODUCTION_PROCESS_CODE')
      console.log(payload)
      const res = await searchProductionProcessCode(payload)
      console.log(res)
      // const gridRow = res.data.gridRowJson
      commit('SEARCH_PRODUCTION_PROCESS_CODE', res.data)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
      return null
    }
  },

// //작업장/작업장 로그 = 작업장 추가
//   async INSERT_WORK_PLACE_LIST({ commit }, param){
//     console.log('INSERT_WORK_PLACE_LIST')
//     const { data } = await insertWorkPlaceList(param)
//     console.log("param" + param)
//     commit('INSERT_WORK_PLACE_LIST', data.workPlaceList)
//   },

  // //작업장/작업장 로그 = 작업장 삭제
  // async DELETE_WORK_PLACE_LIST({commit}, param){
  //   console.log(param)
  //   console.log(param[0])
  //   const {data} = await deleteWorkPlaceList(param)
  //   console.log(data)
  //   console.log(data.workOrderNo)
  // },








}
