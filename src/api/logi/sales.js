/* eslint-disable import/prefer-default-export */

import { logiApi } from '../index'

// 조회
function searchEstimateInfo(payload) {
  const {
    startDate,
    endDate,
    dateSearchCondition,
  } = payload
  return logiApi.get('/sales/searchEstimates', {
    params: {
      startDate,
      endDate,
      dateSearchCondition,
    },
  })
}

function searchContract(date) {
  const {
    startDate, endDate, customerCode, searchCondition,
  } = date
  console.log(customerCode)
  return logiApi.get('/sales/searchContract', {
    params: {
      customerCode,
      startDate,
      endDate,
      searchCondition,
    },
  })
}
function searchContractDetail(contractNo) {
  return logiApi.get('/sales/searchContractDetail', {
    params: {
      contractNo,
    },
  })
}
function searchEstimateInContractAvailable(sendDate) {
  return logiApi.get('/sales/searchEstimateInContractAvailable', {
    params: {
      ...sendDate,
    },
  })
}
function addNewContract(param) {
  console.log(param)
  return logiApi.post('/sales/addNewContract', {
    batchList: param[0].batchList,
    contractDate: param[0].contractDate,
    personCodeInCharge: param[0].personCodeInCharge,
    estimateDetail: param[0].estimateDetail,
  })
}
function searchEstimateDetailInfo(estimateNo) {
  console.log(estimateNo)
  return logiApi.get('/sales/searchEstimateDetail', {
    params: {
      estimateNo,
    },
  })
}
function searchDeliverableContractList(searchData) {
  console.log(searchData)
  return logiApi.get('/sales/searchDeliverableContractList', {
    params: {
      ...searchData,
    },
  })
}
function addNewEstimate(newEstimate) {
  console.log(newEstimate)
  return logiApi.post('/sales/addNewEstimates', newEstimate)
}
export {
  searchEstimateInfo, searchContract, searchContractDetail, searchEstimateInContractAvailable, searchEstimateDetailInfo, addNewContract, addNewEstimate,
  searchDeliverableContractList,
}
