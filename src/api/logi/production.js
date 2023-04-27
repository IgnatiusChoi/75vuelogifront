/* eslint-disable import/prefer-default-export */

import { logiApi } from '../index'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 *  주생산계획(MPS)
 */
// 전체조회
function searchContractDetailInMpsAvailable(payload) {
  return logiApi.get('/production/searchContractDetailInMpsAvailable', {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
      searchCondition: payload.searchCondition,
    },
  })
}

// 수주상세 -> Mps
function convertContractDetailToMps(payload) {
  return logiApi.post('/production/convertContractDetailToMps', payload)
}

/**
 *  소요량전개 등록/취합 Tab-MRP등록
 */
// Mps조회
function searchMpsList(payload) {
  return logiApi.get('/production/searchMpsInfo', {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
}

// MRP모의전개 모달 값 가져오기
function searchMrpList(payload) {
  return logiApi.get('/logistics/production/openMrp', {
    params: {
      mpsNoListStr: payload[0].mpsNo,
    },
  })
}

// 전개결과 MRP 등록
function registerMrp(payload) {
  return logiApi.put('/logistics/production/registerMrp', payload, axiosConfig)
}

/**
 *  소요량전개 등록/취합 Tab-소요량취합
 */
// MrpGather Tab 조회
function mrpGatherList(payload) {
  return logiApi.get('/logistics/production/getMrpList', {
    params: {
      mrpGatheringStatusCondition: payload.mrpGatheringStatusCondition,
    },
  })
}

// MrpGather 결과 조회
function mrpGatherResultList(payload) {
  return logiApi.get('/logistics/production/getMrpGatheringList', {
    params: {
      mpsNoList: payload,
    },
  })
}

// 취합 결과 등록
function gatherResultRegist(payload) {
  return logiApi.put('/logistics/production/registerMrpGathering', payload, axiosConfig)
}
function showWorkInfoList() {
  return logiApi.get('/production/showWorkOrderInfoList')
}

// 소요량취합 조회
function searchMrpGathering(payload) {
  return logiApi.get('/logistics/production/searchMrpGathering', {
    params: {
      searchDateCondition: payload.searchDateCondition,
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
}


function searchWorkOrderList() {
  return logiApi.get('/production/getWorkOrderableMrpList')
}

function productionPerformanceInfoList(){
  return logiApi.get('/production/getProductionPerformanceInfoList')
}

function showWorkOrderDialog(payload){
  return logiApi.get('/production/showWorkOrderDialog',{
    params: {
      mrpNo: payload.mrpNo,
      mrpGatheringNo: payload.mrpGatheringNo,
    },
  })
}
export {
  searchContractDetailInMpsAvailable,
  convertContractDetailToMps,
  searchMpsList,
  searchMrpList,
  registerMrp,
  mrpGatherList,
  mrpGatherResultList,
  gatherResultRegist,
  searchMrpGathering,
  showWorkInfoList,
  searchWorkOrderList,
  productionPerformanceInfoList,
  showWorkOrderDialog
}
