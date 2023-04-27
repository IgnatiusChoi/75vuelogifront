import React, { useState } from 'react';
import UseStyles from './UseStyles';
import {
    Paper,
    TextField,
    Button,
    Grid,
    AppBar,
    InputLabel,
    Box,
    Typography,
    Toolbar,
    MenuItem,
    Select,
    FormControl,
    OutlinedInput
} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useAxios from 'util/useAxios';
import useInput from 'util/useInput';
import AssignInput from './AssignInput';
import { useDispatch } from 'react-redux';
import { REST_ATTD_REQUEST } from 'erp/hr/attendance/reducer/RestReducer';
import moment from 'moment';
import Axios from 'axios';
import EmpDialog from './EmpDialog';

function EmpAssign({ searchAssign, assignData }) {
    const columnDefs = AssignInput;
    const classes = UseStyles();
    const [EmpList, setEmpList] = useState([]);
    const [openD, setOpenD] = useState(false);
    const fromDate = useInput('2021-01-01');
    const toDate = useInput('2021-12-31');
    let selectedInput = document.getElementsByName('attdRestTypeCode')[0];
    //오늘 날짜
    let today = moment().format('YYYY-MM-DD');

    const codeDivision = element => {
        if (typeof element == 'undefined') return '';
        else {
            // console.log(element.value);
            return element.value;
        }
    };

    const [assignDate, setassignDate] = useState(today);
    const attdRestTypeCode = useInput();
    const cause = useInput();
    const cost = useInput();
    const startTime = useInput();
    const endTime = useInput();

    const dispatch = useDispatch();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    // 수정
    const [CurrentDept, setCurrentDept] = useState('');
    const [MoveDept, setMoveDept] = useState('');
    const [EmpName, setEmpName] = useState('');
    const [deptCode, setdeptCode] = useState('');
    const [EmpCode, setEmpCode] = useState('');
    const [DeptName, setDeptName] = useState('');

    const searchEmp = () => {
        setOpenD(true);
        Axios.get('http://localhost:8282/hr/affair/empList') 
            .then(response => {
                console.log(response.data.empList);
                setEmpList(response.data.empList);
            })
            .catch(e => {
                alert(e);
            });
    };

    //다이얼로그 셀 클릭
    const DialogCellClick = e => {
        console.log(e.data);
        setEmpName(e.data.empName);
        setdeptCode(e.data.deptCode);
        setEmpCode(e.data.empCode);
        setDeptName(e.data.detailCodeName);
        setOpenD(false);
    };

    const currentDeptClick = e => {
        setCurrentDept(e.target.value);
    };

    const moveDeptClick = e => {
        setMoveDept(e.target.value);
    };

    const appointment = e => {
        if (!EmpName) {
            alert('이름을 입력하세요');
            return;
        }
        if (!CurrentDept) {
            alert('현재 부서를 선택하세요');
            return;
        }
        if (!MoveDept) {
            alert('이동할 부서를 선택하세요');
            return;
        }
        Axios.get('http://localhost:8282/hr/affair/waitingAssign', {
            params: { CurrentDept, MoveDept, EmpCode, assignDate }
        });
        window.location.replace('/app/hr/affair/employmentAssign');
    };

    const search = () => {
        searchAssign(fromDate.value, toDate.value);
    };

    console.log(assignData);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}></Grid>
                <Grid item xs={4}>
                    <Paper className={classes.leftPaper}>
                        <AppBar position="relative" className={classes.subCategory}>
                            <Toolbar>
                                <Typography variant="h5">인사발령</Typography>
                            </Toolbar>
                        </AppBar>
                        <br />
                        <form>
                            <TextField
                                id="assignDate"
                                label="발령 일자"
                                type="date"
                                variant="outlined"
                                defaultValue={assignDate}
                                onChange={e => {
                                    setassignDate(e.target.value);
                                }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <br />
                            <br />
                            <TextField
                                value={EmpName}
                                rowSelection={'single'}
                                label="직원명"
                                onClick={searchEmp}
                                className={classes.textField}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            ></TextField>
                            <br />
                            <br />
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel htmlFor="outlined-cost-simple">현재 부서</InputLabel>
                                <Select
                                    input={
                                        <OutlinedInput
                                            labelWidth={labelWidth}
                                            name="cost"
                                            id="outlined-cost-simple"
                                            onChange={currentDeptClick}
                                            value={CurrentDept}
                                        />
                                    }
                                >
                                    <MenuItem value={deptCode}>{DeptName}</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl variant="outlined" className={classes.textField}>
                                <InputLabel htmlFor="outlined-cost-simple">발령 부서</InputLabel>
                                <Select
                                    input={
                                        <OutlinedInput
                                            labelWidth={labelWidth}
                                            name="cost"
                                            id="outlined-cost-simple"
                                            onChange={moveDeptClick}
                                            value={MoveDept}
                                        />
                                    }
                                >
                                    <MenuItem value="DPT-01">총무부</MenuItem>
                                    <MenuItem value="DPT-02">영업부</MenuItem>
                                    <MenuItem value="DPT-03">생산부</MenuItem>
                                    <MenuItem value="DPT-04">구매부</MenuItem>
                                    <MenuItem value="DPT-05">인사부</MenuItem>
                                    <MenuItem value="DPT-06">홍보부</MenuItem>
                                    <MenuItem value="DPT-07">개발부</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                        <br />
                        <br />
                        <Box textAlign="right">
                            <Button variant="contained" color="primary" onClick={appointment}>
                                발령
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.rightPaper}>
                        <AppBar position="relative" className={classes.subCategory}>
                            <Toolbar>
                                <Typography variant="h5">인사발령 현황조회</Typography>
                            </Toolbar>
                        </AppBar>
                        <br />
                        <div>
                            <TextField
                                id={'fromDate'}
                                label={'검색날짜'}
                                type={'date'}
                                defaultValue={fromDate.value}
                                onChange={fromDate.onChange}
                                className={classes.textField}
                                variant="outlined"
                            />
                            ~
                            <TextField
                                id={'toDate'}
                                label={'검색날짜'}
                                type={'date'}
                                defaultValue={toDate.value}
                                onChange={toDate.onChange}
                                className={classes.textField}
                                variant="outlined"
                            />
                            <Button
                                variant={'outlined'}
                                color={'primary'}
                                onClick={search}
                                className={classes.button}
                            >
                                조회
                            </Button>
                        </div>
                        <div
                            className={'ag-theme-material'}
                            style={{
                                height: '400px',
                                width: '100%'
                            }}
                        >
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={assignData ? assignData : []}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <EmpDialog
                open={openD}
                setOpenD={setOpenD}
                EmpList={EmpList}
                // setSearchName={setSearchName}
                // setWorkplaceCode={setWorkplaceCode}
                // onGridReady={onGridReady}
                // DeptColDefs={DeptColDefs}
                DialogCellClick={DialogCellClick}
            />
        </div>
    );
}

export default EmpAssign;
