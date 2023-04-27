//**************************************** 2020-11-19 최지은 시작 ****************************************
import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-grid.css";

const DeptDialog = ({
  codeList,
  open,
  setOpenD,
  setSearchName,
  setWorkplaceCode,
  DialogCellClick,
}) => {
  console.log("오픈" + open);

  const WorkplaceColDefs = [
    { headerName: "상세코드번호", field: "detailCode", width: 100 },
    { headerName: "상세코드이름", field: "detailCodeName", width: 100 },
    { headerName: "사용여부", field: "codeUseCheck", width: 100 },
  ];

  // codeList=[ {key:value}, {}, {}] ,
  //그리드 사이즈 자동 조절
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
  };
  //========================================================================

  const closeDialog = () => {
    setOpenD(false);
  };
  //========================================================================
  return (
    <div>
      <Dialog fullWidth={true} maxWidth={"xs"} open={open}>
        <DialogTitle id="simple-dialog-title">사업장 목록</DialogTitle>
        <DialogContent>
          <List>
            {
              <div
                className={"ag-theme-material"}
                style={{ height: "300px", width: "100%", paddingTop: "8px" }}
              >
                <AgGridReact
                  columnDefs={WorkplaceColDefs}
                  rowData={codeList} // 뿌릴 data
                  rowSelection="single" // 하나만 선택 가능.
                  onGridReady={onGridReady}
                  onRowClicked={DialogCellClick}
                  getRowStyle={function() {
                    return { "text-align": "center" };
                  }}
                />
              </div>
            }
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeptDialog;
//**************************************** 2020-11-19 최지은 종료 ****************************************
