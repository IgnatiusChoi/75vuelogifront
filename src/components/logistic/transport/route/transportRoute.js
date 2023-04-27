import React from 'react';
import { Route } from 'react-router-dom';
//************************************************운송관리 ********************************************************
import { default as Transport } from 'erp/logistic/transport/page/transport';  //최수진 출차관리
import { default as TransportIn } from 'erp/logistic/transport/page/transportIn';  // 입차관리
//갓냐
function transportRoute() {
    return (
        <>
            <Route exact path="/app/logistic/transport/transportInfo" component={Transport} />
            <Route exact path="/app/logistic/transport/transportInInfo" component={TransportIn} />
        </>
    );
}

export default transportRoute;