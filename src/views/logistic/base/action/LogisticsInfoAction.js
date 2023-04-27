import { createAction } from 'redux-actions';
import * as types from 'erp/logistic/base/action/LogisticsInfoActionType';

/******************************************************** 물류정보 관리 ***************************************************************/
// 코드 관리(이숭규)
export const codeList = createAction(types.CODE_LIST);
export const searchCodeList = createAction(types.SEARCH_CODE_LIST);
export const addCodeList = createAction(types.ADD_CODE_LIST);
export const updateCodeList = createAction(types.UPDATE_CODE_LIST);
export const saveCodeList = createAction(types.SAVE_CODE_LIST);
export const delCodeTO = createAction(types.DEL_CODE_LIST);
//상세코드 관리(이숭규)
export const DetailCodeList = createAction(types.DETAIL_CODE_LIST);
export const addDetailCodeList = createAction(types.ADD_DEAIL_CODE_LIST);
export const saveDetailCodeList = createAction(types.SAVE_DEAIL_CODE_LIST);

/******************************************************** 창고정보 관리 ***************************************************/
export const warehouseList = createAction(types.WAREHOUSE_LIST);
export const searchWarehouseList = createAction(types.SEARCH_WAREHOUSE_LIST);
export const searchWarehouseSuccess = createAction(types.SEARCH_WAREHOUSE_SUCCESS);
export const searchWarehouseFailure = createAction(types.SEARCH_WAREHOUSE_FAILURE);
export const saveWarehouseList = createAction(types.SAVE_WAREHOUSE_LIST);
