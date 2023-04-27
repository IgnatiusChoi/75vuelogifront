import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { savaClientInfo, searchClientInfo } from 'erp/logistic/base/action/BasicInfoAction';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
//****************************2020-11-25 박미노****************************************** */

function NomalClientInfo(props) {
    const [gridRow, setGridRow] = useState();
    const dispatch = useDispatch();
    const column = {
        columnDefs: [
            {
                headerName: '일반거래처 코드',
                field: 'customerCode',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            { headerName: '사업장코드', field: 'workplaceCode', editable: true },
            { headerName: '거래처명', field: 'customerName', width: 300, editable: true },
            { headerName: '사업장코드', field: 'customerType', editable: true },
            { headerName: '거래처유형', field: 'customerCeo', editable: true },
            { headerName: 'status', field: 'status' },
            {
                headerName: '사업자등록번호',
                field: 'businessLicenseNumber',
                width: 300,
                editable: true,
                hide: true
            },
            { headerName: '개인거래처 주민등록번호', field: 'socialSecurityNumber', hide: true },
            { headerName: '업태', field: 'customerBusinessConditions', editable: true },
            { headerName: '종목', field: 'customerBusinessItems', editable: true },
            { headerName: '우편번호', field: 'customerZipCode', editable: true, hide: true },
            {
                headerName: '기본주소',
                field: 'customerBasicAddress',
                width: 500,
                editable: true,
                hide: true
            },
            { headerName: '세부주소', field: 'customerDetailAddress', editable: true, hide: true },
            {
                headerName: '전화번호',
                field: 'customerTelNumber',
                width: 300,
                editable: true,
                hide: true
            },
            { headerName: '팩스번호', field: 'customerFaxNumber', editable: true, hide: true },
            { headerName: '비고', field: 'customerNote', hide: true },
            { headerName: '사업자등록번호', field: 'companyCeoName', hide: true }
        ]
    };

        /*일괄저장 기능 : 체크버튼 누르고 일괄저장(삭제됨!!!)
                     일반거래처 정보추가 버튼 누르고 리스트 넣고(체크된거 전혀 없는 상태로) 일괄저장 눌러야 저장됩니다. 
                     체크는 무조껀 삭제입니다.*/   
    useEffect(() => {
        dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    }, []);

    const ClientInfoList  = useSelector(state => state.logistic.basicinfo.ClientInfoList);

    const api = params => {
        setGridRow(params.api);
    };

    //새로운 정보 추가
    const addClick = () => {
        gridRow.selectAll(); // 그리드 전체 값
        const newRow = NewRowData(); //새로운 row를 변수에담음
        gridRow.updateRowData({ add: [newRow], addIndex: '' }); // ag그리드 api로 그리드에 add 함
        gridRow.deselectAll();
    };

    const NewRowData = () => {
        var newRow = {
            workplaceCode: 'BRC-01',
            customerCode: '저장시 지정됨',
            status: 'INSERT'
        };
        return newRow;
    };

    //일괄저장
    const saveClick = () => {
        const deleteData = gridRow.getSelectedRows();

        for (var a = 0; a < deleteData.length; a++) {
            deleteData[a].status = 'DELETE';
        }

        gridRow.selectAll(); // 그리드 전체 값
        const rows = gridRow.getSelectedRows(); // 그리드의 모든 값을 반환
        const rowsCount = gridRow.getDisplayedRowCount(); // 표시된 총 행 수를 반환

        //console.log("날아가는데이터"+JSON.stringify(rows));

        if (!window.confirm(' 저장하시겠습니까 ? ')) {
            alert(' 취소되었습니다.');
            gridRow.deselectAll();
            return;
        } else {
            for (var i = 0; i < rowsCount; i++) {
                if (rows[i].customerName === undefined) {
                    alert('거래처명을 정확하게 입력해주세요.');
                    gridRow.deselectAll();
                    return;
                }
                delete rows[i].errorCode;
                delete rows[i].errorMsg;
                delete rows[i].chk;
            }
            dispatch(savaClientInfo(rows));
            gridRow.deselectAll();
        }
        dispatch(searchClientInfo({ searchCondition: 'ALL', workplaceCode: '' }));
    };

    //로우 값 변경시
    const rowCellChanged = params => {
        console.log(params.data.status);
        if (params.data.status === 'normal') {
            params.data.status = 'UPDATE';
        }
    };

    return (
        <>
            <div></div>
            <MyGrid
                //onCellClicked={onCellClicked}
                column={column}
                title={'일반 거래처'}
                list={ClientInfoList}
                onCellEditingStarted={rowCellChanged} //편집시작시 이벤트
                rowSelection="multiple"
                api={api}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={addClick}
                >
                    일반거래처 정보 추가
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    onClick={saveClick}
                >
                    일괄저장
                </Button>
            </MyGrid>
        </>
    );
}

export default NomalClientInfo;
