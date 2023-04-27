import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
// import * as types from "erp/logistic/ActionType/ActionType";
import { useDispatch, useSelector } from 'react-redux';
import {
    searchWarehouseList,
    saveWarehouseList,
} from 'erp/logistic/base/action/LogisticsInfoAction';
import WarehouseDialog from './WareHouseDialog';
import WarehouseDialogInfo from './WareHouseDialogInfo';
import MyGrid from 'util/LogiUtil/MyGrid';

function WareHouseInfo(props) {
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const dispatch = useDispatch();
    const warehouseList = useSelector(state => state.logistic.logisticsinfo.warehouseList);
    const list = warehouseList.filter(ele => {
        if (ele.status !== 'DELETE') {
            return ele;
        }
    });

    //깃테스트중!
    const columns = {
        columnDefs: [
            // { width: "40", headerCheckboxSelection: true, checkboxSelection: true },
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                width: 50
            },
            {
                headerName: '창고 코드',
                field: 'warehouseCode'
            },
            {
                headerName: '창고 명',
                field: 'warehouseName',
                editable: true
            },
            {
                headerName: '창고 사용여부',
                field: 'warehouseUseOrNot',
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: { values: ['Y', 'N'] }
            },
            { headerName: '설명', field: 'description', editable: true }
        ]
    };

    const onClick = () => {
        //console.log("추가버튼");
        setAddOpenDialog(true);
    };

    const close = () => {
        setAddOpenDialog(false);
    };

    /*-----------------*/
    /*-----addItem-----*/
    /*-----------------*/
    const onSubmit = warehouseTo => {
        //console.log("서브밋", warehouseTo);
        console.log(warehouseTo);
        gridApi.updateRowData({add: [warehouseTo]});
        setAddOpenDialog(false);

        gridApi.forEachNode(node =>
            console.log(node.data)
        );
    };

/*--------------------*/
/*-----batchItems-----*/
/*--------------------*/
    const onSave = () => {
        var batchList = [];
        gridApi.forEachNode(node => batchList.push(node.data));
        dispatch(saveWarehouseList(batchList));
    };

    const onGridReady = params => {
        //console.log("AgCheckbox@@", params.api.getAgCheckbox());
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

/*---------------------*/
/*-----deleteItems-----*/
/*---------------------*/
    const onDelete = params => {
        const rows = gridApi.getSelectedRows();
        console.log(rows);
        gridApi.updateRowData({remove:rows});
    };
    const valueChanged = e => {
        console.log(e);
        e.data.status = 'UPDATE';
    };
    useEffect(() => {
        dispatch(searchWarehouseList());
    }, []);

    return (
        <>
            <MyGrid
                title={'창고 관리'}
                column={columns}
                list={list}
                onCellValueChanged={valueChanged}
                api={onGridReady}
                rowSelection="multiple"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onClick}
                >
                    창고 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onDelete}
                >
                    {' '}
                    삭제{' '}
                </Button>
                <Button variant="contained" color="secondary" onClick={onSave}>
                    일괄 저장
                </Button>
            </MyGrid>
            <WarehouseDialog open={addOpenDialog} close={close}>
                <div>
                    <WarehouseDialogInfo onSubmit={onSubmit} />
                </div>
            </WarehouseDialog>
        </>
    );
}

export default WareHouseInfo;
