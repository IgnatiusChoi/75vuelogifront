import React, { useState, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import orderListColumn from './orderListColumn';
import { setSearchOrderInfoListOnDelivery, setWarehousing } from './stockAxios';
import Swal from 'sweetalert2';
import * as api from '../../api';

const ShowOrderDialog = ({ close }) => {
    const [searchStockList, setSearchStockList] = useState([]);
    const [gridApi, setGridApi] = useState();
    useEffect(() => {
        setSearchOrderInfoListOnDelivery(setSearchStockList);
    }, []);

    const onClickWarehousing = () => {
        
        close();

        if(gridApi.getSelectedRows().map(el=>el.inspectionStatus).includes('N')){
            return Swal.fire({
                icon: 'error',
                title: '원재료검사 필요.'
            });
        } 
        
        let orderNoList = gridApi.getSelectedRows().map(el=>el.orderNo);
        for (let searchStock of searchStockList) {
            orderNoList.push(searchStock.orderNo);
        }
        
        if (orderNoList.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: '입고 가능한 발주품목이 없습니다.'
            });
        }

        if(gridApi.getSelectedRows().map(el=>el.orderSlipStatus).includes('N')){
            return Swal.fire({
                icon: 'error',
                title: '결재 승인이 필요합니다.'
            });
        } 

        setWarehousing(orderNoList);
    };

    const onClickInspection = () => {
        const orderNoList = gridApi.getSelectedRows().map(el=>el.orderNo).join(",");
        const process = async (param) => {
            console.log(param);

            if(gridApi.getSelectedRows().map(el=>el.orderSlipStatus).includes('N')){
                close();
                return Swal.fire({
                    icon: 'error',
                    title: '결재 승인이 필요합니다.'
                });
            } 

            try{
            await api.inspection(param);
            close();
            Swal.fire({
                icon: 'success',
                title: '원재료검사 완료'
            });
          }catch(e){
            alert(e.message);
          }
          }

          process(orderNoList);
    }

    const onGridReady = param => {
        setGridApi(param.api);
    }
    return (
        <>
            <MyGrid
                column={orderListColumn}
                title={'발주품목 입고'}
                list={searchStockList}
                rowSelection="single"
                api={onGridReady}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickInspection}
                >
                    원재료검사
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickWarehousing}
                >
                    입고
                </Button>
            </MyGrid>
        </>
    );
};

export default ShowOrderDialog;
