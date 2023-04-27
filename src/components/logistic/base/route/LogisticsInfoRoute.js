import React from 'react';
import { Route } from 'react-router-dom';
//************************************************물류정보 관리 ********************************************************
import { default as CodeInfo } from 'erp/logistic/base/page/CodeInfo/CodeInfo'; //*****2020-11-28 이숭규 코드관리
import { default as ItemInfo } from 'erp/logistic/base/page/ItemInfo/ItemInfo'; //*****2020-11-28 황경윤 품목관리
import { default as WarehouseInfo } from 'erp/logistic/base/page/WareHouseInfo/WareHouseInfo'; //*****2020-11-28 노원찬 창고관리

function LogisticsInfoRoute() {
    return (
        <>
            {/* 물류 정보 관리 */}
            <Route exact path="/app/logistic/base/codeInfo" component={CodeInfo} />
            {/*2020-11-18 이숭규 */}
            <Route exact path="/app/logistic/base/itemInfo" component={ItemInfo} />
            {/*2020-11-28 황경윤 */}
            <Route exact path="/app/logistic/base/wareHouseInfo" component={WarehouseInfo} />
        </>
    );
}

export default LogisticsInfoRoute;
