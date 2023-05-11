import {accountApi, hrApi, logiApi} from '../index'
//Api
const CompanyCode ='/company/searchCompany'
const Departments = '/base/deptList'

function searchItem(divisionCode) {
  console.log(divisionCode)
  return logiApi.get('/base/codeList', {
    params: {
      divisionCode,
    },
  })
}
function getStandardUnitPrice(itemCode) {
  console.log(itemCode)
  return logiApi.get('/base/getStandardUnitPrice', {
    params: {
      itemCode,
    },
  })
}

//창고조회
function getWarehouseList() {
  console.log("getWarehouseList")
  return logiApi.get('/base/warehouseInfo')
}
//창고삭제
function deleteWarehouseList(payload) {
  return logiApi.post('/base/warehousebatchListProcess2', payload)
}


function getWarehouseDetailList(warehouseCode) {
  console.log(warehouseCode)
  return logiApi.get('/purchase/warehouseStockList',warehouseCode)
}

function SelectCompanyCode() {
  return hrApi.get(`${CompanyCode}`)
}

function SelectDepartmentCode() {
  return hrApi.get(`${Departments}`)
}



export {
  searchItem, getStandardUnitPrice,getWarehouseList,getWarehouseDetailList, deleteWarehouseList,SelectCompanyCode,SelectDepartmentCode
}
