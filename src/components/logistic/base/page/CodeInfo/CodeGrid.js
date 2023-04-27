import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchCodeList,
    addCodeList,
    saveCodeList,
    updateCodeList,
    delCodeTO
} from 'erp/logistic/base/action/LogisticsInfoAction';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddCodeInfo from './AddCodeInfo';

function CodeGrid(props) {
    const dispatch = useDispatch();
    const codeList = useSelector(state => state.logistic.logisticsinfo.codeList);
    const list = codeList.filter(ele => {
        if (ele.status !== 'DELETE') {
            return ele;
        }
    });
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [codeGird, setCodeGrid] = useState();

    const column = {
        columnDefs: [
            { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
            { headerName: '구분 코드', field: 'divisionCodeNo' }, // hide:true
            { headerName: '코드 타입', field: 'codeType' },
            { headerName: '코드명', field: 'divisionCodeName' },
            { headerName: '변경', field: 'codeChangeAvailable' },
            { width: '400', headerName: '설명', field: 'description', editable: edit },
            { headerName: '상태', field: 'status', hide: true } // editable : 편집가능  hide:true
        ]
    };

    const onCellClicked = params => {
        props.onClick(params.data.divisionCodeNo);
        if (params.data.codeChangeAvailable === '변경가능') {
            props.setEdit(true);
            setEdit(true);
            codeGird.sizeColumnsToFit();
            UpdateRow(params);
        } else {
            props.setEdit(false);
            setEdit(false);
            codeGird.sizeColumnsToFit();
        }
    };
    const UpdateRow = params => {
        params.data.status = 'UPDATE';
        dispatch(updateCodeList({ divisionCodeNo: params.data.divisionCodeNo }));
    };

    const codeApi = params => {
        setCodeGrid(params.api);
    };

    const addClick = () => {
        setAddOpenDialog(true);
    };

    const delClick = () => {
        const selRowIndex = codeGird.getSelectedNodes();
        for (var i = 0; i < selRowIndex.length; i++) {
            var nodeIndex = selRowIndex[i].childIndex;
            if (codeGird.getRowNode(nodeIndex).data.status === 'INSERT')
                codeGird.getRowNode(nodeIndex).data.status = '';
            else codeGird.getRowNode(nodeIndex).data.status = 'DELETE';
        }

        //console.log(rowsCount);
        var newList = [];
        codeGird.forEachNodeAfterFilter(ele => {
            newList = [...newList, ele.data];
            return ele.data;
        });
        dispatch(delCodeTO({ newList }));
    };

    const close = () => {
        setAddOpenDialog(false);
    };
    const codeSubmit = codeTo => {
        dispatch(addCodeList({ codeTo }));
        setAddOpenDialog(false);
    };

    const saveClick = () => {
        var list = [];
        codeGird.forEachNode(node => {
            list = [...list, node.data];
        });
        var delList = codeList.filter(ele => {
            if (ele.status === 'DELETE') return ele;
        });
        // console.log('list',list);
        //console.log('delList',delList);
        var totalList;
        if (delList[0] !== undefined) {
            var nList = delList.map(ele => {
                // if(ele===undefined)
                //     return list;
                return [...list, ele];
            });
            totalList = nList[0];
        }
        if (delList[0] === undefined) {
            totalList = list;
        }
        //console.log(totalList)
        dispatch(saveCodeList(totalList));
    };

    useEffect(() => {
        dispatch(searchCodeList());
    }, []);

    return (
        <>
            <MyGrid
                column={column}
                title={'코드 관리'}
                list={list}
                onCellClicked={onCellClicked}
                rowSelection="multiple"
                api={codeApi}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    코드 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={delClick}
                >
                    코드 삭제
                </Button>
                <Button variant="contained" color="secondary" onClick={saveClick}>
                    일괄저장
                </Button>
            </MyGrid>
            <MyDialog open={addOpenDialog} close={close}>
                <div>
                    <AddCodeInfo onSubmit={codeSubmit} />
                </div>
            </MyDialog>
        </>
    );
}

export default CodeGrid;
