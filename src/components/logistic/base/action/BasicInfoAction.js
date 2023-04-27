import { createAction } from 'redux-actions';
import * as types from 'erp/logistic/base/action/BasicInfoActionType';

/*******************************기본정보조회******************************* */
// 사업장 정보 조회(이숭규)
export const searchWorkplaceList = createAction(types.SEARCH_WORKPLACE_LIST);
export const searchWorkplaceListSuccess = createAction(types.SEARCH_WORKPLACE_SUCCESS);
export const searchWorkplaceListFailure = createAction(types.SEARCH_WORKPLACE_FAILURE);

export const addWorkplaceTO = createAction(types.ADD_WORKPLACE);
export const workplaceList = createAction(types.WORKPLACE_LIST);
export const delWorkplaceTO = createAction(types.DEL_WORKPLACE);

export const saveWorkplace = createAction(types.SAVE_WORKPLACE);
export const saveWorkplaceSuccess = createAction(types.SAVE_WORKPLACE_SUCCESS);
export const saveWorkplaceFailure = createAction(types.SAVE_WORKPLACE_FAILURE);

//******************************************2020-11-19 부서정보 최지은 시작************************************************** */

export const searchDeptInfo = createAction(types.SEARCH_DEPTINFO);
export const searchDeptSuccess = createAction(types.SEARCH_DEPTINFO_SUCCESS);
export const searchDeptFailure = createAction(types.SEARCH_DEPTINFO_FAILURE);
export const addDeptInfo = createAction(types.ADD_DEPTINFO);
export const savaDeptInfo = createAction(types.SAVE_DEPTINFO);
export const savaDeptSuccess = createAction(types.SAVE_DEPTINFO_SUCCESS);
export const savaDeptFailure = createAction(types.SAVE_DEPTINFO_FAILURE);
//******************************************2020-11-19 부서정보 최지은 종료************************************************** */

//*****************************************2020- 12-01 거래처정보 최지은 시작******************************************************* */

export const searchClientInfo = createAction(types.SEARCH_CLIENTINFO);
export const searchClientSuccess = createAction(types.SEARCH_CLIENTINFO_SUCCESS);
export const searchClientFailure = createAction(types.SEARCH_CLIENTINFO_FAILURE);

export const searchFinanInfo = createAction(types.SEARCH_FINANINFO);
export const searchFinanInfoSuccess = createAction(types.SEARCH_FINANINFO_SUCCESS);
export const searchFinanInfoFailure = createAction(types.SEARCH_FINANINFO_FAILURE);

export const savaClientInfo = createAction(types.SAVE_CLIENTINFO);
export const saveClientSuccess = createAction(types.SAVE_CLIENT_SUCCESS);
export const saveClientFailure = createAction(types.SAVE_CLIENT_FAILURE);

export const saveFinanInfo = createAction(types.SAVE_FINANINFO);
export const saveFinanInfoSuccess = createAction(types.SAVE_FINANINFO_SUCCESS);
export const saveFinanInfoFailure = createAction(types.SAVE_FINANINFO_FAILURE);

//*****************************************2020- 12-03 거래처정보 최지은 종료 ****************************************************** */
//테스트