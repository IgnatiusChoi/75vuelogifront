import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import { TextField, Button, FormControl } from '@material-ui/core';
import moment from 'moment';
import orderListColumn from './orderListColumn';
import MyDialog from 'util/LogiUtil/MyDialog';
import ShowOrderDialog from './ShowOrderDialog';
import Swal from 'sweetalert2';
import HrAppBar from 'erp/hr/util/HrAppBar';
import MySelect from 'erp/hr/util/MySelect';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const OptionOrder = ({ close }) => {
    const [menuItemMap, setMenuItemMap] = useState([]);
    const [checkItem, setCheckItem] = useState(null);
    const [checkAmount, setCheckAmount] = useState('');

    const [optionOrder, optionOrderDialogFetch] = useAsync((param) =>api.optionOrderDialog(param), [], false);
    useEffect(() => {

        if(optionOrder.data){
                if (optionOrder.data.errorCode < 0) {
                    return Swal.fire({
                        icon: 'error',
                        title: optionOrder.data.errorMsg
                    });
                }
                const dataJsonList = optionOrder.data.gridRowJson;
                let itemList = [];
                for (let dataJson of dataJsonList) {
                    itemList.push({ value: dataJson.itemCode, key: dataJson.itemName });
                }
                console.log(itemList);
                setMenuItemMap(itemList);
            }
        
        if(optionOrder.error){
                Swal.fire({
                    icon: 'error',
                    title: optionOrder.error
                });
        }
            },[optionOrder.data, optionOrder.error]);

    const selectonChange = useCallback(e => {
        setCheckItem(e.target.value);
    }, []);
    const amountChange = useCallback(e => {
        setCheckAmount(e.target.value);
    }, []);

    const [clickOptionOrder, onClickOptionOrderFetch] = useAsync((param) =>api.onClickOptionOrder(param), [], true);
    const onClickOptionOrder = useCallback(() => {

        const params = {
            itemCode: checkItem,
            itemAmount: checkAmount
        }
        onClickOptionOrderFetch(params);
    }, [checkAmount, checkItem, onClickOptionOrderFetch]);
useEffect(() => {

    if(clickOptionOrder.data){
    if (clickOptionOrder.data.errorCode < 0) {
        return Swal.fire({
            icon: 'error',
            title: clickOptionOrder.data.errorMsg
        });
    }
    Swal.fire({
        icon: 'success',
        title: clickOptionOrder.data.errorMsg
    });
    close();
}

if(clickOptionOrder.error){
    Swal.fire({
        icon: 'error',
        title: clickOptionOrder.error
    });
close();
}

},[clickOptionOrder.data, clickOptionOrder.error, close]);

    return (
        <>
            <HrAppBar title="임의 발주" />
            <div align="center">
                <FormControl style={{ minWidth: '250px' }}>
                    <MySelect menuItemMap={menuItemMap} selectonChange={selectonChange} />
                </FormControl>
                <br />
                <FormControl style={{ minWidth: '250px' }}>
                    <TextField label="수량" value={checkAmount} onChange={amountChange} />
                </FormControl>
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickOptionOrder}
                >
                    임의 발주
                </Button>
            </div>
        </>
    );
};
export default OptionOrder;
