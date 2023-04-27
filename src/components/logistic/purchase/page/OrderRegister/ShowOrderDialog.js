import React, { useState, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import moment from 'moment';
import showOrderColumn from './showOrderColumn';
import axios from 'axios';
import Swal from 'sweetalert2';
const ShowOrderDialog = ({ girdData, close, onClickGetOrderList, mrpGatheringNoList }) => {
    let today = moment(new Date()).format('yyyy-MM-DD');
    const [orderDay, setOrderDay] = useState(today);

    const onChange = useCallback(e => {
        setOrderDay(e.target.value);
    }, []);

    const onClickOrder = useCallback(
        e => {
            console.log("mrpGatheringNoList")
            console.log(mrpGatheringNoList)

            axios
                .get('http://localhost:8282/logi/purchase/order', {
                    params: {
                        mrpGatheringNoList: mrpGatheringNoList.join(',')
                    }
                })
                .then(({ data }) => {
                    if (data.errorCode < 0) {
                        return Swal.fire({
                            icon: 'error',
                            title: data.errorMsg
                        });
                    }
                    Swal.fire({
                        icon: 'success',
                        title: data.errorMsg
                    });
                    onClickGetOrderList();
                    
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: e
                    });
                });

                close();
        },
        [close, mrpGatheringNoList, onClickGetOrderList]
    );
    return (
        <>
            <MyGrid column={showOrderColumn} title={'주문'} list={girdData} rowSelection="multiple">
                <TextField
                    label="주문일"
                    type={'date'}
                    value={orderDay}
                    onChange={onChange}
                    style={{ marginRight: '1vw' }}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickOrder}
                >
                    현재 전개된 결과 발주 및 재고처리
                </Button>
            </MyGrid>
        </>
    );
};
export default ShowOrderDialog;
