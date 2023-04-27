import { logiApi } from '../index'
import { sys } from '../index'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// 전체조회
function searchOrderList(payload) {
  return logiApi.get('/purchase/getOrderList', {
    params: {
      startDate: payload.startDate,
      endDate: payload.endDate,
    },
  })
}

function searchItemCodeList(payload) {

  console.log("searchItemCodeList실행")
  return sys.get('/findPayStepCodeDetailList', {
    params: {
      itemClassificationCondition: payload,
    },
  })
}

function searchBomList(payload) {
  console.log("searchBomList실행")
  const {
    itemClassificationCondition,
    deployCondition,
    itemCode,
  } = payload
  return logiApi.get('/purchase/searchBomDeploy', {
    params: {
      itemClassificationCondition,
      deployCondition,
      itemCode,
    },
  })
}

function searchRegistBomList(payload) {
  console.log("searchRegistBomList실행")
  const {
    parentItemCode,
  } = payload
  return logiApi.get('/purchase/searchBomInfo', {
    params: {
      parentItemCode,
    },
  })
}

function getWarehouseDetailList(payload) {
  console.log("warehouseCode")
  console.log(payload.warehouseCode)
  return logiApi.get('/purchase/warehouseStockList',
      {params:{warehouseCode: payload.warehouseCode}})
}

function getStockList() {
  console.log("getStockList")
  return logiApi.get('/purchase/searchStockList')
}

export {
  // eslint-disable-next-line import/prefer-default-export
  searchOrderList,
  searchItemCodeList,
  searchBomList,
  searchRegistBomList,
  getWarehouseDetailList,
  getStockList,

}