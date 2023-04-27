import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './CSS/Grid.css';

const MyGrid = ({
    columnDefinition,
    rowData,
    onGridReady,
    onCellEditingStopped,
    style,
    paginationAutoPageSize,
    pagination
}) => {
    const getRowStyle = param => {
        if (param.node.rowPinned) {
            return { 'font-weight': 'bold', background: '#dddddd' };
        }
        return { 'text-align': 'center' };
    };
    let divStyle;
    if (style === undefined) {
        divStyle = {
            height: '100%',
            width: '80%',
        };
    } else {
        divStyle = style;
    }

    return (
        <div
            align="center"
            className={'ag-theme-material'}
            skipHeaderOnAutoSize="true"
            enableColResize="true"
            enableSorting="true"
            enableFilter="true"
            enableRangeSelection="true"
            rowStyle={{ 'text-align': 'center' }}
            style={divStyle}
            cellStyle={{ textAlign: 'center' }}
        >
            <AgGridReact
                columnDefs={columnDefinition}
                rowData={rowData}
                defaultColDef={{ resizable: true, sortable: true }}
                rowSelection="single"
                getRowStyle={getRowStyle}
                suppressHorizontalScroll="true"
                onGridReady={onGridReady}
                onCellEditingStopped={onCellEditingStopped}
                paginationAutoPageSize={paginationAutoPageSize}
                pagination={pagination}
            />
        </div>
    );
};

export default MyGrid;