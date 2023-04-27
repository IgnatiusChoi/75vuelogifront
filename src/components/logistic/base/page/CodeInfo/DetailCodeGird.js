import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
    addDetailCodeList,
    saveDetailCodeList,
    searchCodeList
} from 'erp/logistic/base/action/LogisticsInfoAction';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddDetailCode from './AddDetailCode';

function DetailCodeGrid(props) {
    var divisionCodeNo = props.divisionCodeNo;
    const dispatch = useDispatch();
    const detailCodeList = useSelector(state => state.logistic.logisticsinfo.detailCodeList);

    var detailList2 = detailCodeList.filter(ele => {
        if (ele[0].divisionCodeNo === divisionCodeNo) {
            return ele;
        }
    });
    const detailList = detailList2[0];
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [detailCodeGrid, setDetailCodeGrid] = useState();

    console.log(props.edit);
    const column = {
        columnDefs: [
            //{ headerName: '잠금',field: "codeUseCheckbox",checkboxSelection: true, width:120 }, //cellRenderer : onCheckClicked
            { headerName: '구분코드', field: 'divisionCodeNo', hide: true }, //
            { headerName: '상세코드', field: 'detailCode', editable: props.edit},
            { headerName: '상세코드명', field: 'detailCodeName', editable: props.edit},
            { headerName: '설명', field: 'description', editable: true, width: 400 },
            { headerName: '사용잠금', field: 'codeUseCheck', width: 100 },
            { headerName: '상태', field: 'status', hide: true } //
        ]
    };

    const addClick = () => {
        setAddOpenDialog(true);
        if (detailList === undefined) {
            alert('코드를 선택해주세요.');
            close();
        }
    };

    const onCellClicked = params => {
        //const selRow = detailCodeGrid.getSelectedRows();
        //console.log(params); // rowClick으로 만들 것!!
        if (params.colDef.field === 'codeUseCheck') {
            params.data.codeUseCheck = params.data.codeUseCheck === null ? 'N' : null;
            params.data.status = 'UPDATE';
        } else if (params.colDef.field === 'description') {
            params.data.status = 'UPDATE';
        }
        detailCodeGrid.updateRowData({ update: [params.data] });
    };

    const close = () => {
        setAddOpenDialog(false);
    };

    const onSubmit = detailCodeTo => {
        dispatch(addDetailCodeList(detailCodeTo));
        //console.log(detailCodeGrid)
        detailCodeGrid.updateRowData({ add: [detailCodeTo] });
        close();
    };

    const saveClick = () => {
        var detailCodeList = [];
        detailCodeGrid.forEachNode(node => {
            detailCodeList.push(node.data);
        });
        // 복잡해서 못해먹겠다~~~
        dispatch(saveDetailCodeList({ detailCodeList }));
        // 이부분 대충 만듬 !!
    };

    const DetailCodeApi = params => {
        setDetailCodeGrid(params.api);
    };

    return (
        <>
            <MyGrid
                column={column}
                title={'상세 코드 관리'}
                list={detailList}
                rowSelection="multiple"
                api={DetailCodeApi}
                onCellClicked={onCellClicked}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    상세코드 추가
                </Button>
                <Button variant="contained" color="secondary" onClick={saveClick}>
                    상세코드 저장
                </Button>
            </MyGrid>
            <MyDialog open={addOpenDialog} close={close}>
                <div>
                    <AddDetailCode divisionCodeNo={divisionCodeNo} onSubmit={onSubmit} />
                </div>
            </MyDialog>
        </>
    );
}

export default DetailCodeGrid;
