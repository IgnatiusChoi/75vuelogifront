import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import { DEPT_MEMBER_REQUEST } from "../../saga/DepartmentSaga";

const DepartmentDialog = ({ open, close,deptCode,departmentManageMemberRequest }) => {
  const dispatch = useDispatch();
  const data = useSelector(
    ({ hr }) => hr.base.basecode.memberList,
    [],
  );
console.log("departmentdialog")

  const onGridReady = params => {
    //console.log("params", params);
       params.api.sizeColumnsToFit();
    };
   
    useEffect(() => {
      dispatch({
        type: DEPT_MEMBER_REQUEST,
        params: { deptCode: deptCode },
      });
    }, [deptCode]);
  
  
  const accountColumnDefs = [
    { headerName: "부 서 코 드", field: "deptCode", width: 230 },
    { headerName: "부 서 명", field: "deptName", width: 210, value: 'asd' },
    { headerName: "사 원 명", field: "empName", width: 210 },
    { headerName: "입 사 일 자", field: "hireDate", width: 280 },
  ];

  //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
  // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
  // onClose안에 객체(data, division) 을 가지고 JournalGrid 컴포넌트로 감.

  const Close = () => {
    close({
      division: "DepartmentDialog",
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      fullScreen={fullScreen}
      onClose={Close}
    >
      <DialogTitle id="responsive-dialog-title"><h4>부 서 목 록</h4></DialogTitle>
      <DialogContent dividers>
        <List>
          <div
            className={"ag-theme-material"}
            style={{
              height: "300px",
              width: "100%",
              paddingTop: "8px",
            }}
          >
            <AgGridReact
              columnDefs={accountColumnDefs}
              rowData={data}
              onGridReady={onGridReady}
              onGridSizeChanged={event => {
                event.api.sizeColumnsToFit();
              }}
              getRowStyle={function(param) {
                if (param.node.rowPinned) {
                  return { "font-weight": "bold", background: "#CEFBC9" };
                }
                return { "text-align": "center" }; // bady 값 가운데정렬
              }}
            />
          </div>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={Close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentDialog;
