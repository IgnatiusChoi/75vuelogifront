import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useState } from 'react';

const DetailDialog = ({ open, close, data }) => {

    const [positionGridApi, setPositionGridApi] = useState();

    //========================== 그리드 객체 준비 ==========================
    const onGridReady = (params) => {
        setPositionGridApi(params.api);
    };

     //========================== 그리드내용 ==========================
    const columnDefs = [
        { headerName: "상세코드번호", field: "detailCode", width: 140 },
        { headerName: "상세코드이름", field: "detailCodeName", width: 140 },
        { headerName: "사용여부", field: "codeUseCheck", width: 80 }
    ];

     const handleClose = (node) => {
        if(node.data.detailCode === undefined || node.data.detailCodeName === undefined) {
            return;
        }else {
            if(!window.confirm("선택하시겠습니까?")) {
                return;
            }else {
                close({
                    data: positionGridApi.getSelectedRows()                
                });
            }
        }
     }

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
            <DialogTitle id="simple-dialog-title">
                품목코드
            </DialogTitle>
            <DialogContent dividers>
                <div className = {"ad-theme-balham"}
                    style = {{
                        height: "300px",
                        width: "100%",
                        paddingTop: "8px"
                    }}
                >
                    <AgGridReact
                        columnDefs = {columnDefs} 
                        rowData = {data}
                        rowSelection = "single"
                        onGridReady = {onGridReady}
                        onCellClicked = {handleClose}
                        getRowStyle={function(param) {
                            return { "text-align": "center" };
                        }}
                    />
                </div>
            </DialogContent>  
            <DialogActions>
                <Button onClick = {Close} color = "primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        
    );
};

export default DetailDialog;