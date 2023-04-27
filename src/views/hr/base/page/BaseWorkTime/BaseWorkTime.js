import React,{useState,useRef, useEffect,useCallback} from 'react';
import {
    Paper,
    TextField,
    Button,
    Grid,
    AppBar,
    Typography,
    Toolbar,
  } from "@material-ui/core";
import GridStyle from "./GridStyle";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";



const BaseWorkTime = (
  {
    baseWorkTimeList,
    onGridReady,
    addItem,
    batchItems,
    deleteItems,
    cellEditingStopped,
    cellClicked
      })=> {

    
    const column = {
        columnDefs: [
          {
            headerName: "연도",
            field: "applyYear",
            sortable: true,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            editable: true,
          }, //체크박스창
          { headerName: "점심마감시간", field: "lunchEndTime", editable: true},
          { headerName: "저녁시간", field: "dinnerEndTime",editable: true },
          { headerName: "출근시간", field: "attendTime",editable: true },
          { headerName: "연장근무마감시간", field: "overEndTime",editable: true },
          { headerName: "퇴근시간", field: "quitTime",editable: true },
          { headerName: "점심시작시간", field: "lunchStartTime",editable: true },
          { headerName: "야근마감시간", field: "nightEndTime",editable: true },
          { headerName: "저녁시작시간", field: "dinnerStartTime",editable: true },
        ],
      };



    const classes = GridStyle();
    return (
        <React.Fragment>
      <div className="ui primary segment">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography component="h2" variant="h4">
                기본 근무 시간 관리
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <Grid item xs={15} alignContent={"center"}>
            <Paper className={classes.rightPaper}>
              <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                  <Typography variant="h5">기본 근무 시간 관리</Typography>
                </Toolbar>
              </AppBar>
              <br />
              <div align="center">
              <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={deleteItems}
                >
                  삭제하기
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={addItem}
                >
                  추가하기
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={batchItems}
                >
                  일괄저장
                </Button>
              </div>
              <br />
              <div
                className={"ag-theme-material"}
                //skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"
                rowStyle={{ "text-align": "center" }}
                style={{
                  height: "450px",
                  width: "100%",
                }}
                cellStyle={{ textAlign: "center" }}
              >
                <AgGridReact
                rowSelection={'multiple'}
                suppressRowClickSelection={true}
                columnDefs={column.columnDefs}
                rowData={baseWorkTimeList}
                  getRowStyle={function(param) {
                    return { "text-align": "center" };
                  }}
                  onGridSizeChanged={event => {
                    event.api.sizeColumnsToFit();
                  }}
                  onGridReady={onGridReady}
                  onCellEditingStopped={cellEditingStopped}
                  onCellClicked={cellClicked}
                />
              </div>
            </Paper>
          </Grid>
      </React.Fragment>
        );
}

export default BaseWorkTime;