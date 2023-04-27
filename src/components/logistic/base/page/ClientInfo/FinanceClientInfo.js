import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { saveFinanInfo, searchFinanInfo } from 'erp/logistic/base/action/BasicInfoAction';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
//****************************2020-11-25 박미노****************************************** */

function FinanceClientInfo(props) {
    const [dataList, setDataList] = useState([]);
    const [gridRow, setGridRow] = useState();
    const dispatch = useDispatch();

    const column = {
        columnDefs: [
            {
                headerName: '금융거래처 코드',
                field: 'accountAssociatesCode',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            { headerName: '사업장코드', field: 'workplaceCode', width: 140, editable: true },
            {
                headerName: '금융거래처명',
                field: 'accountAssociatesName',
                width: 200,
                editable: true
            },
            {
                headerName: '금융거래처타입',
                field: 'accountAssociatesType',
                width: 130,
                editable: true
            },
            { headerName: '계좌번호', field: 'accountNumber', editable: true },
            {
                headerName: '금융기관코드',
                field: 'financialInstituteCode',
                width: 100,
                editable: true
            },
            {
                headerName: '금융기관명',
                field: 'financialInstituteName',
                width: 100,
                editable: true
            },
            { headerName: '비고', field: 'financialInstituteNote', hide: true, editable: true },
            { headerName: 'status', field: 'status' }
        ]
    };

    //***********************************2020-12-02 최지은 금융거래처 정보추가 & 일괄저장 **************************************************** */

    useEffect(() => {
        dispatch(searchFinanInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    }, []);

    const  FinanInfoList  = useSelector(state => state.logistic.basicinfo.FinanInfoList);

    const api = params => {
        setGridRow(params.api);
    };

    //금융거래처 정보 추가
    const addFinanInfo = () => {
        gridRow.selectAll();
        const newRow = newRowData();
        gridRow.updateRowData({ add: [newRow], addindex: '' });
        gridRow.deselectAll();
    };

    const newRowData = () => {
        const newRow = {
            workplaceCode: 'BRC-01',
            accountAssociatesCode: '저장시 지정됨',
            status: 'INSERT'
        };
        return newRow;
    };

    //셀편집시작
    const onRowChange = params => {
        console.log(params);
        if (params.data.status === 'normal') {
            params.data.status = 'UPDATE';
        }
    };

    //일괄저장
    const onSaveClick = () => {
        const deleteRow = gridRow.getSelectedRows();
        for (var a = 0; a < deleteRow.length; a++) {
            deleteRow[a].status = 'DELETE';
        }

        gridRow.selectAll();
        const rows = gridRow.getSelectedRows();
        const rowCount = gridRow.getDisplayedRowCount();

        if (!window.confirm('저장하시겠습니까?')) {
            alert('취소되었습니다.');
            gridRow.deselectAll();
            return;
        } else {
            for (var i = 0; i < rowCount; i++) {
                if (
                    rows[i].accountAssociatesName === undefined ||
                    rows[i].accountAssociatesType === undefined
                ) {
                    alert('금융거래처명과 거래처타입을 모두 입력해주세요.');
                    gridRow.deselectAll();
                    return;
                }
                delete rows[i].errorCode;
                delete rows[i].errorMsg;
                delete rows[i].chk;
            }
            dispatch(saveFinanInfo(rows));
            gridRow.deselectAll();
        }
        dispatch(searchFinanInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    };

    return (
        <>
            <div></div>
            <MyGrid
                column={column}
                title={'금융 거래처'}
                list={FinanInfoList}
                //onCellClicked={onCellClicked}
                rowSelection="multiple"
                api={api}
                onCellEditingStarted={onRowChange}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addFinanInfo}
                >
                    금융거래처 정보 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={onSaveClick}
                >
                    일괄저장
                </Button>
            </MyGrid>
        </>
    );
}

export default FinanceClientInfo;
