import React, { useEffect, useState } from "react";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./DepartmentManage.scss";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from "@material-ui/core";
import DepartmentDialog from "./DepartmentDialog";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Icon from "@material-ui/core/Icon";
import { Button } from "@material-ui/core";

const DepartmentManage = ({
  departmentManagerRequest,
  departmentManageMemberRequest,
  updateDepartmentRequest,
  errorCode,
  errorMsg,
  list,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deptCode, setDeptCode] = useState("");

  const toDate = moment(new Date()).format("yyyy-MM-DD");

  const onGridReady = params => {
    setGridApi(params.api);
    console.log(gridApi);
    console.log("gridApi");
    params.api.sizeColumnsToFit();
  };

  const createNewRowData = () => {
    let newData = {
      deptCode: "부서코드 입력",
      deptName: "부서명 입력",
      workplaceName: "(주)세계전자본사",
      workplaceCode: "BRC-01",
      deptStartDate: toDate,
      status: "insert",
    };
    return newData;
  };

  const addOnClick = evet => {
    console.log("클릭");
    const newItem = createNewRowData();
    gridApi.updateRowData({ add: [newItem] }); // 만들어진 새로운 row를 그리드에 add 해라.
  };

  const onCellClicked = params => {
    const selectedRows = gridApi.getSelectedRows();
    console.log("selectedRows", selectedRows);
    console.log("params");
    console.log(params);
    setDeptCode(params.data.deptCode);
  };

  const deleteOnClick = () => {
    window.confirm("삭제하면 돌이킬수 없습니다");
    console.log("삭제");
    const selectedData = gridApi.getSelectedRows();
    console.log(selectedData);
    selectedData[0].status = "delete";
    gridApi.updateRowData({ remove: selectedData });
    updateDepartmentRequest(selectedData);
  };

  async function CellEditingStopped(row) {
    console.log("CellEditingStopped  row+");
    console.log(row);
    if (row.data.status !== "insert") {
      row.data.status = "update";
    } else {
    }
    await updateDepartmentRequest([row.data]);
    row.data.status = "update";
  }

  useEffect(() => {
    departmentManagerRequest([]);
  }, []);

  const state = {
    columnDefs: [
      { headerName: "회사명", field: "workplaceName" },
      { headerName: "회사코드", field: "workplaceCode", editable: true },
      { headerName: "부서명", field: "deptName", editable: true },
      { headerName: "부서코드", field: "deptCode", editable: true },
      { headerName: "부서신설일", field: "deptStartDate" },
      { headerName: "상태", field: "status", hide: true },
    ],
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(3, 5),
    },
  }));
  const classes = useStyles();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onCellDoubleClicked = () => {
    setOpenDialog(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openMapping = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <div>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5">부서관리목록</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <br />
        <div align="left">
          <fieldset className="fieldset">
            <legend> [ 관 리 ] </legend>
            <Button
              variant="contained"
              color="primary"
              onClick={addOnClick}
              startIcon={<Icon className="fa fa-plus-circle" />}
            >
              추가
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={deleteOnClick}
              startIcon={<DeleteOutlinedIcon />}
            >
              삭제
            </Button>
          </fieldset>
        </div>

        <DepartmentDialog
          deptCode={deptCode}
          open={openDialog}
          close={handleClose}
          departmentManageMemberRequest={departmentManageMemberRequest}
        />

        <div align="center">
          <div
            className={"ag-theme-material"}
            skipHeaderOnAutoSize="true"
            enableColResize="true"
            enableSorting="true"
            enableFilter="true"
            enableRangeSelection="true"
            rowStyle={{ "text-align": "center" }}
            style={{
              height: "400px",
              width: "100%",
              paddingTop: "10px",
            }}
            cellStyle={{ textAlign: "center" }}
          >
            <AgGridReact
              columnDefs={state.columnDefs}
              onGridReady={onGridReady}
              rowData={list}
              onCellEditingStopped={CellEditingStopped}
              onCellClicked={onCellClicked}
              rowSelection="single"
              onCellDoubleClicked={onCellDoubleClicked}
              paginationAutoPageSize={true}
              pagination={true}
            ></AgGridReact>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default DepartmentManage;
