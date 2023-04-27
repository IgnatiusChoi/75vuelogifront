import { logiApi } from '../index'

// 기초정보 항목에 대한 api - 회사, 사업장, 부서, 거래처

// 회사정보
function searchCompanyList() {
    return logiApi.get('/compinfo/customer/list')
}

// 사업장정보
function searchWorkplaceList() {
    return logiApi.get('/compinfo/workplace/list'),
    {params: {companyCode: 'COM-01'}}
}



// 부서정보
function searchDeptList(payload) {
    return logiApi.get('/compinfo/department/list',{
        params: {
            searchCondition: payload.searchCondition,
            companyCode: payload.companyCode,
            workplaceCode: payload.workplaceCode
        }
    })
}



// 거래처정보
function searchClientList(payload) {
    return logiApi.get('/compinfo/customer/list', {
        params: {
            searchCondition: payload.searchCondition,
            workplaceCode: payload.workplaceCode,
            companyCode: payload.companyCode,
            itemGroupCode: payload.itemGroupCode
        }
    })
}


export {
    searchCompanyList,
    searchWorkplaceList,
    searchDeptList,
    searchClientList,
}
