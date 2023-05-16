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

//작업지시 필요항목 조회
function searchWorkOrderList() {
  return logiApi.get('/production/getWorkOrderableMrpList')
}

//생산실적관리-생산실적조회Button
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

function searchWorkOrderListInfo(){
  return logiApi.get('/production/getWorkOrderableMrpList')
}



function searchWorkOrderInfoListStatus(){
  console.log('searchWorkOrderInfoListStatus')
  return logiApi.get('/production/getWorkOrderInfoListStatus')
}

function searchWorkSite(){
  return logiApi.get('/production/getWorkSiteList')
}

//작업장 로그 조회(작업장 조회-상세)
function searchProductionProcessCode(payload){
  console.log('searchProductionProcessCode')
  console.log(payload)
  const processcode = payload.productionProcessCode
  console.log(sitecode)
  const sitecode=payload.workSiteCode
  console.log(processcode)
  return logiApi.get('/production/getProductionProcessCode', {
    params: {
      workSiteCode : sitecode,
      productionProcessCode :processcode,

    },
  })
}

//작업장 추가
function insertWorkPlaceList(workPlaceList){
  console.log("workPlaceList" + workPlaceList)
  return logiApi.post('/production/insertWorkPlaceList', workPlaceList)
}

//작업장 삭제
function deleteWorkPlaceList(workPlaceList){
  console.log("deleteWorkPlaceList" + workPlaceList)
  return logiApi.post('/production/deleteWorkPlaceList', workPlaceList)
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
  showWorkOrderDialog,
  searchWorkOrderListInfo,
  searchWorkOrderInfoListStatus,
  searchWorkSite,
  searchProductionProcessCode,
  insertWorkPlaceList,
  deleteWorkPlaceList,
}
