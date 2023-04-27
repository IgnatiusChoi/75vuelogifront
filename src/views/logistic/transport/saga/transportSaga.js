import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_TRANSPORT_LIST = 'src/erp/logistic/Saga/SEARCH_TRANSPORT_LIST';

export const searchTransportList = createAction(SEARCH_TRANSPORT_LIST);

const searchTransportListSaga = createRequestSaga(SEARCH_TRANSPORT_LIST, api.searchTransportList);

export default function* transport() {
    console.log('사가 함수');
    yield takeEvery(SEARCH_TRANSPORT_LIST, searchTransportListSaga);
}