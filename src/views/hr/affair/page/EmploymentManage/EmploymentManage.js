import React,{useState,useCallback,memo,useEffect} from 'react';
import {
    Paper, TextField, Button, Grid, AppBar, InputLabel, Typography, Toolbar, MenuItem, Select,
    FormControl, OutlinedInput, NativeSelect
  } from "@material-ui/core"
  import axios from "axios";
  import UseStyles from "./UseStyles";
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-material.css";
  import useInput from "util/useInput";
  import EmploymentManageInput from "./EmploymentManageInput";
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Radio from '@material-ui/core/Radio';



const EmploymentManage=(props)=>{
    const classes = UseStyles();
    const fromDate = useInput("2020-01-01");
    const toDate = useInput("2020-12-31");
    const columnDefs = EmploymentManageInput;
    const radioValue = useInput();
    const [checkData, setCheckData] = useState(0);
    const deptName = useInput();
    const [list,setList]=useState([]);
   


    useEffect(() => {
      axios
          .get("http://localhost:8282/hr/base/deptList")
          .then(response => {
              console.log("list1111",response.data.list);
              setList(response.data.list)
          })
          .catch(e => {
              console.log("!!!!!!!!!!!!" + e);
          });
  }, []);

  const selList =list.map(
    (ele)=> {
        return <MenuItem value={ele.deptName}>{ele.deptName}</MenuItem>
    }
)




const employmentManage=()=>{

  console.log(fromDate.value);
  console.log(toDate.value);
  console.log(deptName.value);
  if (deptName.value === undefined) {
    alert('부서를 선택해 주세요.')
    return;
  }
  
  props.searchEmploymentManageList({ deptName: deptName.value, startDate: fromDate.value, endDate: toDate.value });
};




const handleChange=(event)=>{

  radioValue.setValue(event.target.value);
  const size = checkData.length;
  for (let a = 0; a < size; a++) {
    if (event.target.value === '승인') {
      checkData[a].approvalStatus = 'apploval';
    } else if (event.target.value === '승인취소') {
      checkData[a].approvalStatus = 'cancel';
    } else {
      checkData[a].applovalStatus = 'return';
    }
  }
};

const updateEmploymentManage=()=>{
  props.update(checkData, deptName.value,fromDate.value,toDate.value);

}

const onRowSelected = useCallback((e) => {
  console.log(e.api.getSelectedRows());
  setCheckData(e.api.getSelectedRows())
}, [])


const onChangeDeptCode=(e)=>{
  

  console.log(e.target.value);

  deptName.setValue(e.target.value);

  

}
    return(
      <Grid item xs={12}>
      <Paper className={classes.mainPaper}>
        <AppBar  position="relative">
          <Toolbar>
            <Typography variant="h5">재직증명관리</Typography>
          </Toolbar>
        </AppBar>
        <br />
        <div>
          <FormControl variant="outlined" className={classes.searchTextField}>
            <InputLabel

              htmlFor="outlined-cost-simple"
            >
              조회부서
                </InputLabel>
              <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="demo-simple-select-outlined"
                            onChange={onChangeDeptCode}
                            inputProps={{
                              name: 'labal',
                              id: 'outlined-cost-simple',
                            }}
                        >
                          {selList}  
                </Select>

          </FormControl>
          <TextField
            id={"fromDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={fromDate.value}
            onChange={fromDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
              ~
              <TextField
            id={"toDate"}
            label={"신청일자"}
            type={"date"}
            defaultValue={toDate.value}
            onChange={toDate.onChange}
            className={classes.textField}
            variant="outlined"
          />
          <Button
            variant={"outlined"}
            color={"primary"}
            className={classes.searchButton}
            onClick={employmentManage}
          >
            조회
              </Button>
        </div>
        <br />
        <div className={classes.radio}>
          <FormControl component="fieldset" >
            <RadioGroup row aria-label="position" value={radioValue.value} onChange={handleChange} >
              <FormControlLabel value="승인" control={<Radio />} label="승인" />
              <FormControlLabel value="승인취소" control={<Radio />} label="승인취소" />
              <FormControlLabel value="반려" control={<Radio />} label="반려" />
            </RadioGroup>
          </FormControl>
          <Button
            variant={"outlined"}
            color={"primary"}
            name={"confirm"}
            onClick={updateEmploymentManage}
          >
            확정
              </Button>
        </div>
        <br />
        <div
          className={"ag-theme-material"}
          style={{
            height: "400px",
            width: "100%"
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={props.EmploymentManageList}
            suppressRowClickSelection={"true"}
            onRowSelected={onRowSelected}
            onGridReady={(event) => {
              event.api.sizeColumnsToFit();             
            }}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            rowSelection="multiple" //여러개선택가능 
          />
        </div>
      </Paper>

    </Grid>

    )
};
export default EmploymentManage;