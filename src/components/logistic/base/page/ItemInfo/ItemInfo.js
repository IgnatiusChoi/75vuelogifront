import React, { useState, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button, Grid } from '@material-ui/core';
import SelectItemInfo from './SelectItemInfo';
import Axios from 'axios';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddItemDialog from './AddItemDialog';
import useAsync from 'util/useAsync';
import * as Api from 'erp/logistic/base/api';

function ItemInfo(props) {
    const [list, setList] = useState([]);
    const columns = {
        columnDefs: [
            { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
            { headerName: '품목 코드', field: 'itemCode' },
            { headerName: '품목명', field: 'itemName', editable: true },
            { headerName: '품목군 코드', field: 'itemGroupCode', editable: true },
            { headerName: '품목 분류', field: 'itemClassification', editable: true },
            { headerName: '단위', field: 'unitOfStock' },
            { headerName: '손실율', field: 'lossRate', editable: true },
            { headerName: '소요일', field: 'leadTime', editable: true },
            { headerName: '표준단가', field: 'standardUnitPrice', editable: true },
            { headerName: '설명', field: 'description', editable: true },
            { headerName: '품목 사용여부', field: 'codeUseCheck', editable: true }
        ]
    };
    const getList = getList => {
        setList(getList);
    };

    const [code, setCode] = useState('');
    const [detailCode, setDetailCode] = useState('');

    const getDivisionCode = getDivisionCode => {
        if (getDivisionCode === 'IT') {
            setCode('ITEM_CLASSIFICATION');
        }
        if (getDivisionCode === 'IT-GROUP') {
            setCode('ITEM_GROUP_CODE');
        }
    };

    const getDetailCode = getDetailCode => {
        setDetailCode(getDetailCode);
    };
/*
    const [state, refetch] = 
    useAsync(() => Api.searchItem(code,detailCode,setList), [code,detailCode,setList], true);

    console.log(state);
  */  
    useEffect(() => {
        if (detailCode !== '') {
            if (code === 'ITEM_GROUP_CODE') {
                Api.searchItemA(code,detailCode).then(function(respones) {
                    setList(respones.data.gridRowJson);
                });
            }
            if (code === 'ITEM_CLASSIFICATION') {
                Api.searchItemB(code, detailCode).then(function(respones) {
                    setList(respones.data.gridRowJson);
                });
            }
        }
    }, [code, detailCode]);


    const [openDialog, setOpenDialog] = useState(false);
    const close = () => {
        setOpenDialog(false);
    };

    const addClick = () => {
        setOpenDialog(true);
    };

    function onSubmit(itemTo) {
        console.log(itemTo);
        var map = [];
        map.push(itemTo);
        try {
                Api.batchItemListProcess(map).then(function(respones) {
                console.log(respones.data.errorCode);
                if (parseInt(respones.data.errorCode) > 0) {
                    alert('신청 성공하였습니다.^^ ' + respones.data.errorMsg);
                }
                if (parseInt(respones.data.errorCode) < 0) {
                    alert('신청 실패하였습니다.');
                }
            });
        } catch (e) {
            alert(e);
        }
    }

    const [selectList, setSelectList] = useState(null);
    const [delData, setDelData] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [grid, setGrid] = useState();

    const api = params => {
        setGrid(params.api);
    };

    // const onRowSelected = (e) => {
    //     var rows = e.api.getSelectedRows();
    //     for(var row of rows){
    //          row.status = 'DELETE';
    //      }
    //      setDelData(rows);

    //     console.log("체크한 delete 정보 : ", delData);
    // }

    const deleteItem = () => {
        var getList = [];
        const rowsCount = grid.getDisplayedRowCount();
        var rows = grid.getSelectedRows();
        for (var row of rows) {
            row.status = 'DELETE';
        }
        for (var i = 0; i < rowsCount; i++) {
            getList.push(grid.getRowNode(i).data);
        }
        var newList = getList.filter(ele => {
            if (ele.status !== 'DELETE') {
                return ele;
            }
        });

        var delList = getList.filter(ele => {
            if (ele.status === 'DELETE') {
                return ele;
            }
        });
        console.log(delList);
        setList(newList);
        // axios 해서 delList 보낸다.
        try {
            Api.delBatchList(delList).then(function(respones) {
                console.log(respones.data.errorCode);
                if (parseInt(respones.data.errorCode) > 0) {
                    alert('삭제되었습니다.^^ ' + respones.data.errorMsg);
                }
                if (parseInt(respones.data.errorCode) < 0) {
                    alert('삭제 실패');
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const updataItem = () => {
        var rows = grid.getSelectedRows();
        for (var row of rows) {
            row.status = 'UPDATE';
        }
        console.log(rows);
        try {
            Api.rowsBatchList(rows).then(function(respones) {
                console.log(respones.data.errorCode);
                if (parseInt(respones.data.errorCode) > 0) {
                    alert('수정되었습니다.^^ ' + respones.data.errorMsg);
                }
                if (parseInt(respones.data.errorCode) < 0) {
                    alert('수정실패.');
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    const save = () => {
        console.log('삭제할 delData : ', delData);
        console.log('수정할 updateDate : ', updateData);
    };

    return (
        <div>
            <MyGrid
                column={columns}
                title={'품 목 조 회'}
                list={list}
                rowSelection="multiple"
                //onRowSelected={onRowSelected}
                api={api}
                onGridReady={event => {
                    event.api.sizeColumnsToFit();
                    setSelectList(event.api);
                }}
            >
                <div align="left" style={{ float: 'left' }}>
                    <SelectItemInfo
                        getList={getList}
                        getDivisionCode={getDivisionCode}
                        getDetailCode={getDetailCode}
                    />
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    품목 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={updataItem}
                >
                    수정사항 저장
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={deleteItem}
                >
                    선택삭제
                </Button>
            </MyGrid>
            <MyDialog close={close} open={openDialog}>
                <div>
                    <AddItemDialog onSubmit={onSubmit} />
                </div>
            </MyDialog>
        </div>
    );
}

export default ItemInfo;
