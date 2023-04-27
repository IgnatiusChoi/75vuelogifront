import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React from 'react';

const RegistGrid = ({ bomData, onGridReady, onCellClicked }) => {
    const bomColumnDefs = {
        columnDefs:[
            {                                
                headerCheckboxSelection: true,
                checkboxSelection: true,
                rowSelection:"multiple",
                rowMultiSelectionWhithClick: true,
                width: "43"            
            },                    
            { headerName: "NO", width: 55, valueGetter: "node.rowIndex + 1" },            
            //{ headerName: "", width: 60, cellRenderer: checkRenderer },
            //{ headerName: "출력순서지정", field: "no", width: 100 },
            { headerName: "품목구분", field: "itemClassificationName" },
            { headerName: "품목코드", field: "itemCode", width: 100, editable: true},
            { headerName: "품목명", field: "itemName", width: 130, editable: true },
            { headerName: "정미수량", field: "netAmount", width: 80, editable: true },
            { headerName: "설명", field: "description", width: 60, editable: true },
            {
                headerName: "status",
                field: "status",
                width: 100,
                valueFormatter: "value.toUpperCase()",
            },
            {
                headerName: "itemClassification",
                field: "itemClassification",
                width: 50,
                hide: true,
            },
            {
                headerName: "parentItemCode",
                field: "parentItemCode",
                width: 50,
                hide: true,
            },
            {
                headerName: "beforeStatus",
                field: "beforeStatus",
                width: 50,
                hide: true,
            },
            {
                headerName: "deleteStatus",
                field: "deleteStatus",
                width: 50,
                hide: true,
            },
        ]
    };

    ////편집 허용인 컬럼을 더블 클릭할 때 발생하는 이벤트.
    const rowCellChanged = e => {
        if (e.data.status === "INSERT") {
            return;
        } else {
            e.data.status = "UPDATE";
        }
    };

    return (
        <div>
            <div className = "gridAlign" style = {{ paddingTop: "8px" }}>
                <div className={"ag-theme-balham"}
                    style = {{
                        height: "500px",
                        width: "770px"
                    }}                
                >
                    <AgGridReact 
                        columnDefs = {bomColumnDefs.columnDefs}
                        rowData = {bomData}
                        rowSelection = "multiple"
                        onGridReady = {onGridReady}
                        getRowStyle={function(param) {
                            return { "text-align": "center" };
                        }}
                        onCellClicked = {onCellClicked}                    
                        getRowNodeId = {data => {
                            return data.no;
                        }}
                        onCellEditingStarted = {rowCellChanged}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegistGrid;