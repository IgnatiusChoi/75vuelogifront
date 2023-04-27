//2020-12-02 64기 정준혁
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import moment from 'moment';
import orderListColumn from './orderListColumn';
import MyDialog from 'util/LogiUtil/MyDialog';
import ShowOrderDialog from './ShowOrderDialog';
import OptionOrderDialog from './OptionOrderDialog';
import Swal from 'sweetalert2';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const OrderRegisterContainer = () => {
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [orderList, setOrderList] = useState(null);
    const [orderOpenList, setOrderOpenList] = useState([]);
    const [orderListgridRow, setOrderListgridRow] = useState();
    const [showOrderDialog, setShowOrderDialog] = useState(false);
    const [optionOrderDialog, setOptionOrderDialog] = useState(false);
    const [ mrpGatheringNoList, setMrpGatheringNoList] = useState();

    const basicInfo = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const showClose = () => {
        setShowOrderDialog(false);
    };
    const optionClose = () => {
        setOptionOrderDialog(false);
    };
    const onChangeDate = e => {
        e.target.id === 'startDate' ? setStartDate(e.target.value) : setEndDate(e.target.value);
    };

    const [clickOrderList, onClickGetOrderListFetch] = useAsync((param) =>api.onClickGetOrderList(param), [], true);
    const onClickGetOrderList = useCallback(() => {

        const params = {
            startDate: startDate,
            endDate: endDate
        }
        onClickGetOrderListFetch(params);
          
    }, [startDate, endDate, onClickGetOrderListFetch]);
    useEffect(() => {
        console.log(clickOrderList.data);
        if(clickOrderList.data){
        if (clickOrderList.data.errorCode < 0) {
            return Swal.fire({
                icon: 'error',
                title: clickOrderList.data.errorMsg
            });
        }
        setOrderList(clickOrderList.data.gridRowJson);
    }

    if(clickOrderList.error){
        Swal.fire({
            icon: 'error',
            title: clickOrderList.error
        });
    }
    },[clickOrderList.data, clickOrderList.error]);

    const orderGirdApi = params => {
        setOrderListgridRow(params.api);
    };

    const [clickOrderOpen, onClickOrderOpenFetch] = 
    useAsync((param) =>api.onClickOrderOpen(param), [], true);
    
    const onClickOrderOpen = useCallback(() => {
        const selectNodes = orderListgridRow.getSelectedNodes();
        const rowsCount = orderListgridRow.getDisplayedRowCount();
        if (rowsCount === 0) {
            return Swal.fire({
                icon: 'error',
                title: '조회 후 진행해 주세요'
            });
        } else if (selectNodes.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: '선택 후 진행해 주세요'
            });
        }
        let mrpGatheringNoArr = [];
        for (let selectNode of selectNodes) {
            mrpGatheringNoArr.push(selectNode.data.mrpGatheringNo);
        }

        setMrpGatheringNoList(mrpGatheringNoArr);

        let param = {
            mrpGatheringNoList: mrpGatheringNoArr.join(',')
        }
        onClickOrderOpenFetch(param);

    },[onClickOrderOpenFetch, orderListgridRow]);
    useEffect(() => {

        if(clickOrderOpen.data){
        if (clickOrderOpen.data.errorCode < 0) {
            return Swal.fire({
                icon: 'error',
                title: clickOrderOpen.data.errorMsg
            });
        }
       
        setOrderOpenList(clickOrderOpen.data.result);
        setShowOrderDialog(true);
    }

    if(clickOrderOpen.error){
    Swal.fire({
        icon: 'error',
        title: clickOrderOpen.error
    });
}
    },[clickOrderOpen]); //의존성 때문에 발주 안됨 확인



    const onClickOptionOrderOpen = useCallback(() => {
        setOptionOrderDialog(true);
    }, []);
    return (
        <>
            <MyGrid
                column={orderListColumn}
                title={'발주 및 재고처리'}
                list={orderList}
                onCellClicked={undefined}
                rowSelection="multiple"
                api={orderGirdApi}
            >
                <div style={{ float: 'left' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onClick={onClickOrderOpen}
                    >
                        모의재고처리 및 취합발주
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh', marginTop: '1vh' }}
                        onClick={onClickOptionOrderOpen}
                    >
                        임의 발주
                    </Button>
                </div>
                <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '1vh' }}
                    onClick={onClickGetOrderList}
                >
                    재고처리/발주필요 목록조회
                </Button>
            </MyGrid>
            <MyDialog open={showOrderDialog} close={showClose} maxWidth={'150%'}>
                <div>
                    <ShowOrderDialog
                        girdData={orderOpenList}
                        close={showClose}
                        onClickGetOrderList={onClickGetOrderList}
                        mrpGatheringNoList={mrpGatheringNoList}
                    />
                </div>
            </MyDialog>
            <MyDialog open={optionOrderDialog} close={optionClose}>
                <div>
                    <OptionOrderDialog close={optionClose} />
                </div>
            </MyDialog>
        </>
    );
};

export default OrderRegisterContainer;
