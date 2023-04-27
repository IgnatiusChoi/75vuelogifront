//2020-12-03 64기 정준혁
import React, { useState, useCallback, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import stockListColumn from './stockListColumn';
import MyCalendar from 'erp/hr/util/MyCalendar';
import { Button } from '@material-ui/core';
import { setSearchStockListAxios } from './stockAxios';
import MyDialog from 'util/LogiUtil/MyDialog';
import ShowOrderDialog from './ShowOrderDialog';
const StockInfoContainer = () => {
    const [searchStockList, setSearchStockList] = useState([]);
    const [showOrderDialog, setShowOrderDialog] = useState(false);

    useEffect(() => {
        setSearchStockListAxios(setSearchStockList);
    }, []);

    const showClose = () => {
        setShowOrderDialog(false);
    };
    const onClickOptionOrderOpen = useCallback(() => {
        setShowOrderDialog(true);
    }, []);

    return (
        <>
            <MyGrid
                column={stockListColumn}
                title={'재고'}
                list={searchStockList}
                onCellClicked={undefined}
                rowSelection="single"
                api={undefined}
            >
                <MyCalendar label="입고" onChangeDate={undefined} />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh', marginTop: '1vh' }}
                    onClick={onClickOptionOrderOpen}
                >
                    입고
                </Button>
            </MyGrid>

            <MyDialog open={showOrderDialog} close={showClose} maxWidth={'150%'}>
                <div>
                    <ShowOrderDialog close={showClose} />
                </div>
            </MyDialog>
        </>
    );
};
export default StockInfoContainer;
