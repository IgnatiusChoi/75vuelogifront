import {accountApi, hrApi, logiApi} from '../index'
//Api
const CompanyCode ='/company/searchCompany'

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

function getWarehouseDetailList(warehouseCode) {
  console.log(warehouseCode)
  return logiApi.get('/purchase/warehouseStockList',warehouseCode)
}

function SelectCompanyCode() {
  return hrApi.get(`${CompanyCode}`)
}

function getDeptInfo() {
  return logiApi.get(`/base/getdeptInfo`)
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
function searchCodeList(){
  return logiApi.get('base/searchCodeList')
}
function addCode(payload){
  return logiApi.post('base/batchListProcess', {
    divisionCodeNo: payload[0].divisionCodeNo,
    codeType: payload[0].codeType,
    divisionCodeName: payload[0].divisionCodeName,
    codeChangeAvailable: payload[0].codeChangeAvailable,
    description: payload[0].description,
    status: payload[0].status
  })
}
function searchItemList(){
  return logiApi.get('base/searchItemList')
}
function searchItemGroupList(){
  return logiApi.get('base/searchItemGroupList')
}

export {
  searchItem, getStandardUnitPrice,getWarehouseList,getWarehouseDetailList, deleteWarehouseList,getDeptInfo,SelectCompanyCode,
  insertClient, deleteClient, searchClientList, getCompanyInfo, searchCodeList, addCode, searchItemList, searchItemGroupList
}
