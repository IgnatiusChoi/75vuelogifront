import React, { useState, useEffect } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { Button } from '@material-ui/core';
import {
    searchWorkplaceList,
    addWorkplaceTO,
    delWorkplaceTO,
    saveWorkplace
} from 'erp/logistic/base/action/BasicInfoAction';
import MyDialog from 'util/LogiUtil/MyDialog';
import AddWorkplace from 'erp/logistic/base/page/AddWorkplace';
import { useDispatch, useSelector } from 'react-redux';

function WorkplaceInfo(props) {
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [gridRow, setGridRow] = useState();
    const close = () => {
        setAddOpenDialog(false);
    };
    const workplaceList = useSelector(state => state.logistic.basicinfo.workplaceList);
    const list = workplaceList.filter(list => list.status !== 'DELETE');
    const dispatch = useDispatch();
    const column = {
        columnDefs: [
            { width: '80', headerCheckboxSelection: false, checkboxSelection: true },
            { headerName: '사업장 코드', field: 'workplaceCode', hide: true },
            { headerName: '사업장', field: 'workplaceName' },
            { headerName: '사업장등록번호', field: 'businessLicenseNumber' },
            { headerName: '법인등록번호', field: 'corporationLicenseNumber' },
            { headerName: '대표자', field: 'workplaceCeoName' },
            { headerName: '업태', field: 'workplaceBusinessConditions' }, // editable : 편집가능
            { headerName: '종목', field: 'workplaceBusinessItems' } // editable : 편집가능
        ]
    };

    const addClick = () => {
        setAddOpenDialog(true);
    };
    const delClick = () => {
        const selRowIndex = gridRow.getSelectedNodes();
        const rowsCount = gridRow.getDisplayedRowCount();
        for (var i = 0; i < selRowIndex.length; i++) {
            var nodeIndex = selRowIndex[i].childIndex;
            if (gridRow.getRowNode(nodeIndex).data.status === 'INSERT')
                gridRow.getRowNode(nodeIndex).data.status = '';
            else gridRow.getRowNode(nodeIndex).data.status = 'DELETE';
        }

        console.log(rowsCount);
        var newList = [];
        gridRow.forEachNodeAfterFilter(ele => {
            newList = [...newList, ele.data];
            return ele.data;
        });
        dispatch(delWorkplaceTO({ newList }));
    };

    const saveClick = () => {
        // console.log(workplaceList);
        dispatch(saveWorkplace(workplaceList));
    };

    const onSubmit = workplaceTo => {
        dispatch(addWorkplaceTO({ workplaceTo }));
        close();
    };

    const api = params => {
        setGridRow(params.api);
    };

    useEffect(() => {
        dispatch(searchWorkplaceList());
    }, [dispatch]);
    // 여기는 리덕스를 활용해보자 !!
    return (
        <>
            <MyGrid
                //UI에 그리드 아님
                column={column}
                title={'사 업 장 조 회'}
                list={list}
                rowSelection="multiple"
                api={api}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    사업장 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={delClick}
                >
                    삭제
                </Button>
                <Button variant="contained" color="secondary" onClick={saveClick}>
                    저장
                </Button>
            </MyGrid>
            <MyDialog open={addOpenDialog} close={close}>
                <div>
                    <AddWorkplace onSubmit={onSubmit} />
                </div>
            </MyDialog>
        </>
    );
}

export default WorkplaceInfo;
