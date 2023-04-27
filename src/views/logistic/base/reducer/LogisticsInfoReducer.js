import * as types from 'erp/logistic/base/action/LogisticsInfoActionType';

const initialState = {
    codeList: [],
    detailCodeList: [],
    warehouseList: []
};

const logisticsinfo = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DEAIL_CODE_LIST_SUCCESS:
            console.log(action);
            return;
        case types.CODE_LIST:
            if (action.mode === 'search') {
                let detailList = [];
                action.data.codeList.map(ele => {
                    detailList = [...detailList, ele.codeDetailTOList];
                    return ele;
                });
                return {
                    ...state,
                    codeList: action.data.codeList,
                    detailCodeList: detailList
                };
            } else if (action.mode === 'add') {
                let newList = [...state.codeList, action.codeTo]; //[]
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'update') {
                let newList = state.codeList.map(ele => {
                    if (action.divisionCodeNo === ele.divisionCodeNo) {
                        ele.status = 'UPDATE';
                    }
                    return ele;
                });
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'delete') {
                let newList = action.newList; //[]
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'save') {
                console.log('action.codeList', action.codeList);
                if (action.codeList !== undefined) {
                    return {
                        ...state,
                        codeList: action.codeList
                    };
                }
                return {
                    ...state
                };
            }
        /* falls through */
        case types.DETAIL_CODE_LIST:
            //console.log('add접근');
            //console.log(action);
            let newList = state.detailCodeList.map(ele => {
                if (ele[0].divisionCodeNo === action.detailCodeTo.divisionCodeNo) {
                    ele.push(action.detailCodeTo);
                }
                return ele;
            });
            //console.log(newList)
            return {
                ...state,
                detailCodeList: newList
            };

        case types.SEARCH_WAREHOUSE_LIST:
            return {
                ...state
            };
        case types.SEARCH_WAREHOUSE_SUCCESS:
            console.log(action.payload.gridRowJson)
            return {
                ...state,
                warehouseList: action.payload.gridRowJson
            };
        case types.SEARCH_WAREHOUSE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        /* falls through */
        case types.WAREHOUSE_LIST:
            if (action.mode === 'add') {
                //console.log("추가?", action.warehouseTo);
                let newList = [...state.warehouseList, action.warehouseTo];
                return {
                    ...state,
                    warehouseList: newList
                };
            } else if (action.mode === 'del') {
                let newList = action.warehouseTo;
                return {
                    ...state,
                    warehouseList: newList
                };
            } else if (action.mode === 'update') {
                let newList = action.warehouseTo;
                return {
                    ...state,
                    warehouseList: newList
                };
            };

        /* falls through */
        default:
            return state;
    }
};

export default logisticsinfo;
