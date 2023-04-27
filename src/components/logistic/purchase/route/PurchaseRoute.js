import React from 'react';
//************************************************자재구매 관리 ********************************************************
import { default as Purchase } from 'erp/logistic/purchase/page/LogisticsBOM/LogisticsBOM'; //*****2020-12-01 유길현 자재명세서(BOM)
import { default as OrderRegisterContainer } from 'erp/logistic/purchase/page/OrderRegister/OrderRegisterContainer'; //*****2020-12-01 정준혁 발주 및 재고처리
import { default as StockInfoContainer } from 'erp/logistic/purchase/page/StockInfo/StockInfoContainer'; //*****2020-12-03 정준혁 입고
import { Route } from 'react-router-dom';

function PurchaseRoute() {
    return (
        <>
            {/* 자재구매 관리 */}
            <Route exact path="/app/logistic/purchase/logisticsBOM" component={Purchase} />
            {/*2020-12-01 유길현 */}
            <Route
                exact
                path="/app/logistic/purchase/orderRegister"
                component={OrderRegisterContainer}
            />
            {/*2020-12-02 정준혁*/}
            <Route exact path="/app/logistic/purchase/stockInfo" component={StockInfoContainer} />
            {/*2020-12-03 정준혁*/}
        </>
    );
}

export default PurchaseRoute;
