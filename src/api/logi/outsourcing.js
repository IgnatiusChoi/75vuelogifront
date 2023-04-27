/* eslint-disable import/prefer-default-export */

import { logiApi } from '../index'

// 조회

function searchOutsource(date) {

    console.log(date)
    const {
        searchDateCondition
        ,startDate
        ,endDate
    } = date
    return logiApi.get('/outsourc/searchOderableList', {
        params: {
            searchDateCondition,
            startDate,
            endDate,
        },
    })
}
function insertOutsource(payload) {

    console.log(payload)
    return logiApi.post('/outsourc/insertOutsourc', payload)
}

function searchOutsourceInfo(date) {

    console.log(date)
    const {
        searchDateCondition
        ,startDate
        ,endDate
    } = date
    return logiApi.get('/outsourc/searchOutsourcInfoList', {
        params: {
            searchDateCondition,
            startDate,
            endDate,
        },
    })
}
function searchFowardInfo(date) {

    console.log(date)
    const {
        searchDateCondition
        ,startDate
        ,endDate
    } = date
    return logiApi.get('/outsourc/searchForwardableList', {
        params: {
            searchDateCondition,
            startDate,
            endDate,
        },
    })
}
function updateFowardChange(payload) {

    console.log(payload)
    return logiApi.post('/outsourc/updateForwardStatus', {outsourcNo : payload})
}
function searchInspecionInfo() {
    return logiApi.get('/outsourc/outInspectionInfoList')
}
function updateInspecionInfo(payload) {
    console.log("데이터맞냐")
    console.log(payload)
    return logiApi.post('/outsourc/outInspectionCompletion', payload)
}

export {
    searchOutsource, insertOutsource, searchOutsourceInfo, searchFowardInfo, updateFowardChange, searchInspecionInfo,updateInspecionInfo
}
