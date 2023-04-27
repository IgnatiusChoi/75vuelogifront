import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import MyDialog from 'util/LogiUtil/MyDialog';

function CompanyInfo(props) {
    const [dataList, setDataList] = useState([]);
    const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
    const [list, setList] = useState({});
    const [gridRow, setGridRow] = useState();
    const column = {
        columnDefs: [
            { headerName: '회사코드', field: 'companyCode', hide: true },
            { headerName: '회사명', field: 'companyName' },
            { headerName: '회사구분', field: 'companyDivision' },
            { headerName: '사업자등록번호', field: 'businessLicenseNumber' },
            { headerName: '법인등록번호', field: 'corporationLicenseNumber' },
            { headerName: '대표자명', field: 'companyCeoName' } // editable : 편집가능
        ]
    };
    const onCellClicked = id => {
        if (id.colDef.field === 'companyName') {
            setOpenCompanyDialog(true);
            const sel = dataList.map(ele => {
                if (ele.companyName === id.data.companyName) {
                    return ele;
                }
            });
            setList(sel[0]);
            console.log(sel);
        }
    };
    const close = () => {
        setOpenCompanyDialog(false);
    };
    const api = params => {
        setGridRow(params.api);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8282/hr/company/searchCompany')
            .then(response => {
                setDataList(response.data.gridRowJson);
                console.log(response.data.gridRowJson);
            })
            .catch(e => {
                console.log(e);
            });
        return () => {
            setDataList({});
        };
    }, []);
    return (
        <>
            <MyGrid //UI에 그리드 아님
                column={column}
                title={'회사 정보'}
                list={dataList}
                onCellClicked={onCellClicked}
                rowSelection="single"
                api={api}
            ></MyGrid>
            <MyDialog open={openCompanyDialog} close={close} title={'회 사 정 보'}>
                <div>
                    <TextField label="업태" value={list.companyBusinessConditions} />{' '}
                    <TextField label="종목" value={list.companyBusinessItems} />
                    <br />
                    <TextField label="우편번호" value={list.companyZipCode} />
                    <TextField
                        label="주소"
                        fullWidth
                        value={list.companyBasicAddress + '      ' + list.companyDetailAddress}
                    />
                    <br />
                    <TextField label="전화번호" value={list.companyTelNumber} />{' '}
                    <TextField label="홈페이지" value={list.homepage} />
                    <TextField label="설립년월" value={list.companyEstablishmentDate} />
                </div>
            </MyDialog>
        </>
    );
}

export default CompanyInfo;
