import {hrApi, logiApi} from '../index'

const Departments = 'base/deptList'
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
//회사 정보 조회
function getCompanyInfo(){
  return logiApi.get('/base/getcompanyInfo')
}

function SelectDepartmentCode() {
  return hrApi.get(`${Departments}`)
}

function getWarehouseDetailList(warehouseCode) {
  console.log(warehouseCode)
  return logiApi.get('/purchase/warehouseStockList',warehouseCode)
}

function searchClientList() {
  return logiApi.get('/base/searchClientList')
}

function insertClient(data){
  return logiApi.post('base/insertClient',data)
}

function deleteClient(data){
  return logiApi.post('base/deleteClient',data)
}

export {
  searchItem, getStandardUnitPrice,getWarehouseList,getWarehouseDetailList, deleteWarehouseList, getCompanyInfo, searchClientList,
    insertClient, deleteClient, SelectDepartmentCode
}
