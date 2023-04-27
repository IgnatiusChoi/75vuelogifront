//**************************************** 2020-11-19 최지은 시작 ****************************************
import React, { memo } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import DeptDialog from "./DeptDialog";

const deptinfosearch = memo(
  ({
    open,
    openD,
    codeList,
    SearchName,
    setWorkplaceCode,
    formVisible,
    handleClick,
    handleClose,
    setOpenD,
    setSearchName,
    handleChange,
    searchCondition,
    handleOpen,
    searchClick,
    onGridReady,
    addClick,
    DeptColDefs,
    DialogCellClick,
    onSaveClick,
  }) => {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3" align="center">
              부서 정보
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        
        <div
          style={{
            marginBottom: "10px",
            width: "auto",
            display: "inline-block",
          }}
        >
          <fieldset>
            <legend style={{color:"gray"}}>부서 검색 조건</legend>
            <Select
              name="searchCondition"
              open={open}
              value={searchCondition}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleChange}
            >
              <MenuItem value="ALL">전체부서</MenuItem>
              <MenuItem value="WORKPLACE">사업장 조회</MenuItem>
            </Select>

            <form hidden={formVisible}>
              <TextField
                value={SearchName}
                rowSelection={"single"}
                placeholder="사업장 조회"
                onClick={handleClick}
              ></TextField>
            </form>
           
            <Button variant="contained" color="primary" onClick={searchClick}>
              부서조회
            </Button>
          </fieldset>
        </div>

        
        &nbsp;&nbsp;
        <div
          style={{
            marginBottom: "10px",
            width: "320px",
            display: "inline-block",
          }}
        >
          <fieldset>
            <legend style={{color:"gray"}}>부서 정보 관리</legend>
            <Button variant="contained" color="primary" onClick={addClick}>
              새로운 부서 정보 추가
            </Button>
            <Button variant="contained" color="primary" onClick={onSaveClick}>
              일괄저장
            </Button>
          </fieldset>
        </div>


        <DeptDialog
          open={openD}
          setOpenD={setOpenD}
          codeList={codeList}
          setSearchName={setSearchName}
          setWorkplaceCode={setWorkplaceCode}
          onGridReady={onGridReady}
          DeptColDefs={DeptColDefs}
          DialogCellClick={DialogCellClick}
        />
      </>
    );
  },
);

export default deptinfosearch;
//**************************************** 2020-11-19 최지은 종료 ****************************************
