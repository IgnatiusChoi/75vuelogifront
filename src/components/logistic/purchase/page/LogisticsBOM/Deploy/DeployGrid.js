import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import Axios from 'axios';
import React, { useState } from 'react';

const DeployGrid = ({props}/* { setDeployCondition, setItemCode, setDivisionCode, searchBom, bomData } */) => {
    const [positionGridApi, setPositionGridApi] = useState();

    const setPadding = (arr) => {
        let lev = arr.data.bomLevel;
        let iCode = arr.value;
        let space = "　　";
        for(let i=0; i<lev; i++){
            iCode = space+iCode;
            console.log(iCode);
            return iCode;
        }
    };

    const onGridReady = (params) => {
        setPositionGridApi(params.api);        
    };

    const columnDefs = [
        { headerName: "BOM번호", field: "bomNo", width: 100 },
        { headerName: "BOM레벨", field: "bomLevel", width: 80 },
        { headerName: "상위품목코드", field: "parentItemCode", width: 100 },
        { headerName: "품목코드", field: "itemCode", width: 200, valueFormatter: setPadding},
        { headerName: "품목명", field: "itemName", width: 130 },
        { headerName: "단위", field: "unitOfStock", width: 50 },
        { headerName: "정미수량", field: "netAmount", width: 80 },
        { headerName: "손실율", field: "lossRate", width: 65 },
        { headerName: "필요수량", field: "necessaryAmount", width: 80 },
        { headerName: "리드타임", field: "leadTime", width: 80 },
        { headerName: "isLeaf", field: "isLeaf", width: 70 },
        { headerName: "비고", field: "description", width: 50 }
    ];   

    return (
        <>
            <div className = "gridAlign" style = {{paddingTop:"8px"}}>
                <div className = {"ag-theme-balham"} 
                    style = {{
                        height: "500px",
                        width: "1087px"
                    }}>
                    <AgGridReact                        
                        columnDefs = {columnDefs}
                        rowData = {props.bom.data&&props.bom.data}                        
                        onGirdReady = {onGridReady}
                    />
                </div>            
            </div>
        </>
    );
};

export default DeployGrid;