/* eslint-disable import/prefer-default-export */

import { logiApi } from '../index'
import {SelectDepartmentCode} from "@/api/logi/base";


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

function searchInputContract(contractNo) {
  return logiApi.get("/sales/searchInputContract", {
    params: {
      contractNo,
    },
  });
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
  console.log("newEstimateDFF")
  return logiApi.post('/sales/addNewEstimates', newEstimate)
}


function Selectsalesplane() {
  return logiApi.get('/sales/jpasalesplan')
}

function InsertSalesplan(payload) {
  console.log("여기??");
  console.log(payload);
  return logiApi.post('/sales/jpasalesplansave', payload);
}

function UpdateSalesplan(payload) {
  console.log("upup");
  console.log(payload)
   logiApi.post('/sales/jpaupdatesalesplan',payload)
}

function delivery(payload) {
  console.log("delivery");
  console.log(payload);
    logiApi.post('/sales/delivery',
        {"contractDetailNo":payload}

  )
}

function deleteSalesplan(SalesPlanNo){
  return logiApi.delete('/sales/deletesalesplan',
      {params:{SalesPlanNo: SalesPlanNo}
      })
}


export {
  searchEstimateInfo, searchContract, searchContractDetail, searchEstimateInContractAvailable, searchEstimateDetailInfo, addNewContract, addNewEstimate,
  searchDeliverableContractList,Selectsalesplane,InsertSalesplan,searchInputContract,UpdateSalesplan,delivery,deleteSalesplan
}
