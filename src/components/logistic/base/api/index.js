import axios from 'api/logiApi';  //'http://localhost:8282/logi'
import axios2 from 'api/hrApi'; // 'http://localhost:8282/hr'


export const warehouseInfo = () =>
    axios.get('/base/warehouseInfo');


export const saveWarehouseInfo = (action) =>
    axios.post(
        '/base/batchListProcess',
        {
            warehouseInfo: action.payload
        }
    );


export const searchItemA = 
(code, detailCode) => axios.get('/base/searchItem', {
    params: {
        searchCondition: code,
        itemClassification: 'a',
        itemGroupCode: detailCode,
        minPrice: '',
        maxPrice: ''
    }
})


/* ItemInfo.js */
export const searchItemB =
(code, detailCode) => axios.get('/base/searchItem', {
    params: {
        searchCondition: code,
        itemClassification: detailCode,
        itemGroupCode: 'c',
        minPrice: '',
        maxPrice: ''
    }
})

    export const searchList = 
    divisionCode => axios.get('/base/codeList', {
        params: {
            divisionCode: divisionCode
        }
    })

    export const batchItemListProcess =
    map => axios.post('/base/batchItemListProcess', {
        batchList: map
    })

    export const delBatchList =
    delList => axios.post('/base/batchItemListProcess', {
        batchList: delList
    })

    export const rowsBatchList =
    rows => axios.post('/base/batchItemListProcess', {
        batchList: rows
    })

    export const saveDetailCodeInfo = action => axios.post(
        '/base/batchDetailListProcess',
        {
            detailCodeList: action.payload.detailCodeList
        }
    );

    export const saveCodeInfo = action =>
    axios.post('/base/batchListProcess', {
            codeList: action.payload
        });
/* ItemInfo.js */

    export const standardUnitPrice =
    (minPrice, maxPrice) => axios.get('/base/searchItem', {
        params: {
            searchCondition: 'STANDARD_UNIT_PRICE',
            itemClassification: 'a',
            itemGroupCode: 'n', //의미없음
            minPrice: minPrice + '',
            maxPrice: maxPrice + ''
        }
    })

    export const searchAllList = 
    () => axios.get('/base/searchItem', {
        params: {
            searchCondition: 'ALL',
            itemClassification: '',
            itemGroupCode: '',
            minPrice: '',
            maxPrice: ''
        }
    })

export const searchItem = async (divisionCode,setList,props,minPrice,maxPrice) => {
        if (divisionCode !== 'standardUnitPrice' || '') {
            await axios.get('/base/codeList', {
                params: {
                    divisionCode: divisionCode
                }
            }).then(function(respones) {
                setList(respones.data.detailCodeList);
            });
        }
        if (divisionCode === 'standardUnitPrice') {
            await axios.get('/base/searchItem', {
                params: {
                    searchCondition: 'STANDARD_UNIT_PRICE',
                    itemClassification: 'a',
                    itemGroupCode: 'n', //의미없음
                    minPrice: minPrice + '',
                    maxPrice: maxPrice + ''
                }
            }).then(function(respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
        }
        if (divisionCode === '') {
            await axios.get('/base/searchItem', {
                params: {
                    searchCondition: 'ALL',
                    itemClassification: '',
                    itemGroupCode: '',
                    minPrice: '',
                    maxPrice: ''
                }
            }).then(function(respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
        }
    }


/****************** 사업장 정보 *********************/
export const workplaceInfo = () =>
    axios2.get('/company/searchWorkplace', {
        params: {
        companyCode: 'COM-01'
        }
    });

export const saveWorkplace = action =>
    axios2.post('/company/batchFinancialAccountAssociatesListProcess', {
        batchList: action.payload
    });


/****************** 일반거래처 & 금융거래처 정보 *********************/

export const searchClient = action =>
    axios2.get('/company/searchCustomer', 
    
    { params: {
            searchCondition: action.payload.searchCondition,
            workplaceCode: action.payload.workplaceCode
          }
    }
);

export const saveClient = action =>
axios2.post(
    '/company/batchWorkplaceListProcess',
    { batchList: action.payload }
);

export const searchFinan = action =>
    axios2.get('/company/searchFinancialAccountAssociatesList', 
    
    { params: {
        searchCondition: action.payload.searchCondition,
        workplaceCode: action.payload.workplaceCode
          }
    }
);

export const saveFinanInfo = action =>
axios2.post(
    '/company/batchCustomerListProcess',
    { batchList: action.payload }
);


/****************** 부서 정보 *********************/

export const deptInfoRequest = action =>
axios2.get('/company/searchDepartment', 
{
    params: {
        searchCondition: action.payload.searchCondition,
        companyCode: action.payload.companyCode,
        workplaceCode: action.payload.workplaceCode
    }
});


export const saveDeptInfo = action =>
axios2.post(
    '/company/batchDepartmentListProcess',
    { batchList: action.payload }
);

