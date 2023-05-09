import { logiApi } from '../index'

// 기초정보 항목에 대한 api - 회사, 사업장, 부서, 거래처

// 회사정보
function searchCompanyList() {
    return logiApi.get('/compinfo/customer/list')
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


// 사업장정보
function searchWorkplace(workplaceCode) {
    return logiApi.get('/base/workplaceInfo',
        {params: {workplaceCode: workplaceCode }
        })
}

// 사업장목록
function searchWorkplaceList() {
    return logiApi.get('/base/workplaceList')
}


function insertWorkplace(payload) {
    console.log(payload)
    console.log("payload")
    return logiApi.post('/base/workplace', payload )
}

function deleteWorkplace(workplaceCode) {
    return logiApi.delete('/base/workplaceCode',
        {params: {workplaceCode: workplaceCode }
        })
}

function updateWorkplace(payload) {
    return logiApi.post('/base/workplaceupdate', payload)
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
    searchWorkplace,
    deleteWorkplace,
    insertWorkplace,
    updateWorkplace

}
