import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import React, { useState } from 'react';

const SearchItemCodeDialog = ({ open, close, data }) => {
    const [positionGridApi, setPositionGridApi] = useState();
    
    //========================== 그리드 객체 준비 ==========================
    const onGridReady = (params) => {
        setPositionGridApi(params.api);        
    };

    const ColumnDefs = [
        { headerName: "상세코드번호", field: "detailCode", width: 180 },
        { headerName: "상세코드이름", field: "detailCodeName", width: 210 }
    ];

    const handleClose = () => {
        close({
            data: positionGridApi.getSelectedRows()
        });
    };

    const Close = () => {
        close({});
    };

    return (
        <Dialog
            aria-labelledby = "simple-dialog-title"
            open = {open}
            fullWidth = {true}
            maxWidth = {"xs"}
        >
            <DialogTitle id = "simple-dialog-title">
                품목코드
            </DialogTitle>
            <DialogContent dividers>
                <List>
                    <div className = {"ag-theme-balham"}
                        style = {{
                            height: "300px",
                            width: "100%",
                            paddingTop: "8px"
                        }}
                    >
                        <AgGridReact
                            columnDefs = {ColumnDefs}
                            rowData = {data}
                            rowSelection = "single"
                            onGridReady = {onGridReady}
                            onCellClicked = {handleClose}
                        />
                    </div>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick = {Close} color = "primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>        
    );
};

export default SearchItemCodeDialog;