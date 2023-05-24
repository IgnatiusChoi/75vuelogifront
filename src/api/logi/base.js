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
  return logiApi.post('/base/warehousebatchListProcess', payload)
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
function searchClientDetailList(payload){
  return logiApi.get('/base/searchClientDetailList', {
    params: {
      customerCode: payload
    }
  })
}
function searchFinanceList() {
  return logiApi.get('/base/searchFinanceList')
}
function searchFinanceDetailList(payload){
  return logiApi.get('/base/searchFinanceDetailList', {
    params: {
      code: payload
    }
  })
}
function insertClient(data){
  return logiApi.post('base/insertClient',data)
}
function updateClient(data){
  return logiApi.post('base/updateClient',data)
}
function deleteClient(data){
  return logiApi.post('base/deleteClient',data)
}
function insertFinance(data){
  return logiApi.post('base/insertFinance',data)
}
function updateFinance(data){
  return logiApi.post('base/updateFinance',data)
}
function deleteFinance(data){
  return logiApi.post('base/deleteFinance',data)
}
function searchCodeList(){
  return logiApi.get('base/searchCodeList')
}
function addCode(payload){
  return logiApi.post('base/batchListProcess', payload)
}
function deleteCode(payload){
  return logiApi.post('base/batchListProcess', payload)
}
function searchItemList(){
  return logiApi.get('base/searchItemList')
}
function insertItem(payload){
  return logiApi.post('base/itemBatchListProcess',payload)
}
function updateItem(payload){
  return logiApi.post('base/itemBatchListProcess',payload)
}
function deleteItem(payload){
  return logiApi.post('base/itemBatchListProcess',payload)
}
function insertItemGroup(payload){
  return logiApi.post('base/itemGroupBatchListProcess',payload)
}
function updateItemGroup(payload){
  return logiApi.post('base/itemGroupBatchListProcess',payload)
}
function deleteItemGroup(payload){
  return logiApi.post('base/itemGroupBatchListProcess',payload)
}
function searchItemGroupList(){
  return logiApi.get('base/searchItemGroupList')
}

export {
  searchItem, getStandardUnitPrice,getWarehouseList,getWarehouseDetailList, deleteWarehouseList,getDeptInfo,SelectCompanyCode,
  insertClient, deleteClient, searchClientList, getCompanyInfo, searchCodeList, addCode, searchItemList, searchItemGroupList,
  searchClientDetailList, searchFinanceList, searchFinanceDetailList, deleteCode, updateClient, insertFinance, updateFinance,
  deleteFinance, insertItem, updateItem, deleteItem, insertItemGroup, updateItemGroup, deleteItemGroup
}


// {
//   params:{
//     divisionCodeNo: null,
//         codeType: payload.codeType,
//         divisionCodeName: payload.divisionCodeName,
//         codeChangeAvailable: payload.codeChangeAvailable,
//         description: payload.description,
//         status: payload.status
//   }}
