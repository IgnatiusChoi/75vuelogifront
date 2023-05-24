/* eslint-disable import/prefer-default-export */

import { logiApi } from '../index'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

/********************
     주생산계획(MPS)
 *********************/


/**
 * MPS 등록가능 수주 조회
 */
function searchContractDetailInMpsAvailable(payload) {
  return logiApi.get('/production/searchContractDetailInMpsAvailable', {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
      searchCondition: payload.searchCondition,
    },
  })
}

/**
 *  MPS 등록
 */

function convertContractDetailToMps(payload) {
  return logiApi.post('/production/convertContractDetailToMps', payload)
}

/**

 * 차트 데이터 용 MPS List 조회
 */
function searchMps(){
  return logiApi.get('/production/searchMpsList')
}




/********************
     소요량전개(MRP)
 *********************/

/**
 *  MPS 조회

 *  소요량전개 등록/취합 Tab-MRP등록

 */
function searchMpsList(payload) {
  return logiApi.get('/logistics/production/searchMpsInfo', {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
}

/**
 *  MPS 수정
 */
function updateMps(payload){
  return logiApi.post('/logistics/production/updateMps', payload[0])
}

/**
 *  MRP 모의전개 모달
 */
function searchMrpList(payload) {
  return logiApi.get('/logistics/production/openMrp', {
    params: {
      mpsNo: payload[0].mpsNo,
    },
  })
}

/**
 *  전개결과 MRP 등록
 */

function registerMrp(payload) {
  return logiApi.put('/logistics/production/registerMrp', payload, axiosConfig)
}


/*****************
     소요량취합
 *****************/

/**
 *   품목별 조달계획 디폴트 테이블
 */
function mrpGatherList(payload) {
  return logiApi.get('/logistics/production/mrpGathering/getMrpList', {
    params: {
      mrpGatheringStatusCondition: payload.mrpGatheringStatusCondition,
    },
  })
}

/**
 *   품목별 소요량 취합 실행 버튼
 */
function mrpGatherResultList(payload) {
  return logiApi.get('/logistics/production/mrpGathering/getMrpGatheringList', {
    params: {
      mpsNoList: payload,
    },
  })
}

/**
 *   소요량 취합 실행 모달 -> 소요량 취합 등록 버튼
 */
function gatherResultRegist(payload) {
  return logiApi.put('/logistics/production/mrpGathering/registerMrpGathering', payload, axiosConfig)
}

// 소요량취합 조회
function searchMrpGathering(payload) {
  return logiApi.get('/logistics/production/mrpGathering/searchMrpGathering', {
    params: {
      searchDateCondition: payload.searchDateCondition,
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
}
function showWorkInfoList() {
  return logiApi.get('/production/showWorkOrderInfoList')
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

  searchMps,
  updateMps,

  searchWorkOrderListInfo,
  searchWorkOrderInfoListStatus,
  searchWorkSite,
  searchProductionProcessCode,
  insertWorkPlaceList,
  deleteWorkPlaceList,

}
