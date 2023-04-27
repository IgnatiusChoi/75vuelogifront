import { put, takeEvery, delay, all, call } from 'redux-saga/effects';
import axios from 'axios';
import * as types from 'erp/logistic/base/action/LogisticsInfoActionType';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

//code
function* codeInfo(action) {
    try {
        const { data } = yield axios.get('http://localhost:8282/logi/base/searchCodeList', null);
        if (data.errorCode > 0) {
            yield put({ type: types.CODE_LIST, mode: 'search', data });
        } else {
            alert(data.errorMsg + '로 인한 구분코드 조회 실패');
        }
    } catch (error) {
        alert(error);
    }
}

function* addCodeInfo(action) {
    try {
        // console.log('action',action)
        yield put({ type: types.CODE_LIST, mode: 'add', codeTo: action.payload.codeTo });
    } catch (error) {
        alert(error);
    }
}

function* updateCodeInfo(action) {
    try {
        yield put({
            type: types.CODE_LIST,
            mode: 'update',
            divisionCodeNo: action.payload.divisionCodeNo
        });
    } catch (error) {
        alert(error);
    }
}

function* delCodeInfo(action) {
    try {
        yield put({ type: types.CODE_LIST, mode: 'delete', newList: action.payload.newList });
    } catch (error) {
        alert(error);
    }
}

const saveCodeInfo = createRequestSaga(types.SAVE_DEAIL_CODE_LIST,api.saveCodeInfo);

export function* codeinfo() {
    yield takeEvery(types.SEARCH_CODE_LIST, codeInfo);
    yield takeEvery(types.ADD_CODE_LIST, addCodeInfo);
    yield takeEvery(types.SAVE_CODE_LIST, saveCodeInfo);
    yield takeEvery(types.UPDATE_CODE_LIST, updateCodeInfo);
    yield takeEvery(types.DEL_CODE_LIST, delCodeInfo);
}

//detailCode
function* addDetailCodeInfo(action) {
    // console.log(action);
    try {
        yield put({ type: types.DETAIL_CODE_LIST, mode: 'add', detailCodeTo: action.payload });
    } catch (error) {
        alert(error);
    }
}

const saveDetailCodeInfo = createRequestSaga(types.SAVE_DEAIL_CODE_LIST, api.saveDetailCodeInfo);

export function* detailcodeinfo() {
    yield takeEvery(types.ADD_DEAIL_CODE_LIST, addDetailCodeInfo);
    yield takeEvery(types.SAVE_DEAIL_CODE_LIST, saveDetailCodeInfo);
}

// WAREHOUSE_LIST Saga
const warehouseInfo = createRequestSaga(types.SEARCH_WAREHOUSE_LIST, api.warehouseInfo);
const  saveWarehouseInfo = createRequestSaga(types.SAVE_WAREHOUSE_LIST, api.saveWarehouseInfo);


export function* warehouseinfo() {
    yield takeEvery(types.SEARCH_WAREHOUSE_LIST, warehouseInfo);
    yield takeEvery(types.SAVE_WAREHOUSE_LIST, saveWarehouseInfo);
}

export default function* LogisticsInfoSaga() {
    yield all([call(codeinfo), call(detailcodeinfo), call(warehouseinfo)]);
}
