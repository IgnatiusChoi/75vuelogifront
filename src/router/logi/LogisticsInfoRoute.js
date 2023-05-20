/*import React from 'react';
import { Route } from 'react-router-dom';
************************************************물류정보 관리 ********************************************************
import { default as CodeInfo } from 'erp/logistic/base/page/CodeInfo/CodeInfo'; //!*****2020-11-28 이숭규 코드관리
import { default as ItemInfo } from 'erp/logistic/base/page/ItemInfo/ItemInfo'; //!*****2020-11-28 황경윤 품목관리
import { default as WarehouseInfo } from 'erp/logistic/base/page/WareHouseInfo/WareHouseInfo'; //!*****2020-11-28 노원찬 창고관리

function LogisticsInfoRoute() {
    return (
        <>
            {/!* 물류 정보 관리 *!/}
            <Route exact path="/app/logistic/base/codeInfo" component={CodeInfo} />
            {/!*2020-11-18 이숭규 *!/}
            <Route exact path="/app/logistic/base/itemInfo" component={ItemInfo} />
            {/!*2020-11-28 황경윤 *!/}
            <Route exact path="/app/logistic/base/wareHouseInfo" component={WarehouseInfo} />
        </>
    );
}

export default LogisticsInfoRoute;*/

const ERP = '/logi/base'


const LogisticsInfoRoute = [
//물류 정보 : 코드 관리, 품목 관리, 창고 관리

    {
        path: '/logi/base/codeInfo',
        name: 'codeInfo',
        component: () => import('@/views/logistic/base/codeInfo/codeInfoPage'),
        meta: {
            pageTitle: '코드 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '코드 관리',},
            ],
        },
    },
    {
        path: '/logi/base/itemInfo',
        name: 'itemInfo',
        component: () => import('@/views/logistic/base/itemInfo/itemInfoPage'),
        meta: {
            pageTitle: '품목 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '품목 관리',active:true},
            ],
        },
    },
    {
        path: '/logi/base/warehouseInfo',
        name: 'warehouseInfo',
        component: () => import('@/views/logistic/base/warehouseInfo/WarehouseInfoPage'),
        meta: {
            pageTitle: '코드정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '창고 관리',active:true},
            ],
        },
    },



    {
        path: '/logi/base/companyInfo',
        name: 'CompanyInfo', // 이건 navigation Route와 같음
        component: () => import('@/views/logistic/base/baseInfo/CompanyInfoPage'),
        meta: {
            pageTitle: '회사 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '기초 정보',},
                {text: '회사 정보',active: true,},
            ],
        },
    },
    {
        path: `${ERP}/workplaceInfo`,
        name: 'WorkplaceInfo', // 이건 navigation Route와 같음
        component: () => import('@/views/logistic/base/baseInfo/WorkplaceInfoPage'),
        meta: {
            pageTitle: '사업장 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '기초 정보',},
                {text: '사업장 정보',active: true,},
            ],
        },
    },
    {
        path: `${ERP}/deptInfo`,
        name: 'DeptInfo', // 이건 navigation Route와 같음
        component: () => import('@/views/logistic/base/baseInfo/DeptInfoPage'),
        meta: {
            pageTitle: '부서 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '기초 정보',},
                {text: '부서 정보',active: true,},
            ],
        },
    },
    {
        path: `${ERP}/clientInfo`,
        name: 'ClientInfo', // 이건 navigation Route와 같음
        component: () => import('@/components/logistic/base/page/ClientInfo/ClientInfoMain.vue'),
        meta: {
            pageTitle: '거래처 정보',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '기초 정보',},
                {text: '거래처 정보',active: true,},
            ],
        },
    },
    {
        path: `${ERP}/codeSearch`,
        name: 'CodeSearch', // 이건 navigation Route와 같음
        component: () => import('@/views/logistic/base/baseInfo/CodeSearch.vue'),
        meta: {
            pageTitle: '코드 관리',
            breadcrumb: [
                {text: '물류 정보',},
                {text: '코드 관리',},
                {text: '코드 조회',active: true,},
            ],
        },
    },
]
export default LogisticsInfoRoute
