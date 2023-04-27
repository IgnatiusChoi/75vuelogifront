import React from 'react';
import { Route } from 'react-router-dom';

//************************************************기본정보 관리 ********************************************************
import { default as CompanyInfo } from 'erp/logistic/base/page/CompanyInfo'; // 2020-11-19 이숭규 회사관리
import { default as WorkplaceInfo } from 'erp/logistic/base/page/WorkplaceInfo'; // 2020-11-19 이숭규 회사관리
import { default as DeptInfo } from 'erp/logistic/base/page/DeptInfo/DeptInfo'; // 2020-11-19 최지은 부서관리
import { default as ClientInfo } from 'erp/logistic/base/page/ClientInfo/ClientInfo'; //2020-11-27 거래처 관리

function BasicInfoRoute() {
    return (
        <>
            {/* 기본 정보 관리  */}
            <Route exact path="/app/logistic/base/companyInfo" component={CompanyInfo} />{' '}
            {/*2020-11-18 이숭규 */}
            <Route exact path="/app/logistic/base/workplaceInfo" component={WorkplaceInfo} />{' '}
            {/*2020-11-18 이숭규 */}
            <Route exact path="/app/logistic/base/deptInfo" component={DeptInfo} />
            {/*2020-11-18 최지은 */}
            <Route exact path="/app/logistic/base/clientInfo" component={ClientInfo} />
            {/*2020-11-18 박민호 */}
        </>
    );
}

export default BasicInfoRoute;
