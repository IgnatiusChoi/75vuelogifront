import React, { useEffect, useState } from 'react';
import { Button, Typography,TextField } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useDispatch, useSelector } from 'react-redux';
import CommercialDialog from "./CommercialDialog";
import useStyles from './Theme';
import Axios from 'axios';

//최수진
function Transport(props) {
    const dispatch = useDispatch();
    const theme = useStyles();
    const [list, setList] = useState([]);
    const [codeGird, setCodeGrid] = useState();
    const [nodeid, setNodeId] = useState('');
    const [openCommercialDialog, setOpenCommercialDialog] = useState(false); //거래처 다이알로그
    const [commercialRow, setCommercialRow] = useState(""); //거래처 다이알로그 상태값
    const [startDate, setStartDate] = useState(); //시작 날짜
    const [endDate, setEndDate] = useState();



    const column = {
        columnDefs: [
            { headerName: '출차상태', field: 'transportStatus' },
            { width: '150', headerName: '수주일련번호', field: 'contractNo' },
            { headerName: '납기일', field: 'dueDateOfContract' },
            { headerName: '차량', field: 'commercialVehicle' },
            { headerName: '기사님', field: 'driver' }, 
            { headerName: '거래처 기본 주소', field: 'customerBasicAddress' },
            { headerName: '거래처 상세 주소', field: 'customerDetailAddress' },
            { headerName: '요청사항', field: 'memo', editable: true },  // editable : 편집가능
            { headerName: '요청일시', field: 'reportingDate' },
        ]
    };


    // ==============================================그리드 셀 하나 Auto============================
    const onCellClicked = e => {
        if (
        e.colDef.field === "commercialVehicle" ||
        e.colDef.field === "driver"
        ) {
        console.log('차량 셀 클릭'+e.rowIndex);
        setNodeId(e.rowIndex);
        setOpenCommercialDialog(true);
        } 
    };

    const codeApi = params => {
        setCodeGrid(params.api);
    };


    //=================================================== 차량 다이알로그 CLOSED  =========================================
    const handleCommercialDialogClose = value => {
        console.log('핸들다이어로그닫음');
        setOpenCommercialDialog(false);
        if (value.data === undefined) {
            return;
        } else {
            console.log("선택차량 : " + JSON.stringify(value.data));
            setCommercialRow(value.data); //거래처 Row값을 set
        }
    };
    //---------------------------------조회-----------------------------------
    const searchDateClick = () => {
        console.log('날짜조회버튼클릭');
        console.log(startDate + 'StartDate');
        Axios.get('http://localhost:8282/logi/transport/searchTransportAbleList', {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
            .then(response => {
                setList(response.data.gridRowJson);
                console.log('그리드로우제이선'+JSON.stringify(response.data.gridRowJson));
            })
            .catch(e => {
                console.log(e);
            });
    };


    const saveClick = () => {
        console.log('저장버튼클릭');
        console.log(list);
        console.log('!@!@!@!@!@!@!@'+JSON.stringify(list));
        
        for (var i = 0; i < list.length; i++) {
            if (
                list[i].commercialVehicle === null ||
                list[i].driver === null 
            ) {
                alert('빈칸기입하시오');
                return;
            }
            else if(list[i].status = 'update'){
                console.log('asios');
                Axios.post('http://localhost:8282/logi/transport/batchTransportProcess', list[i])
                .then(response => {
                    console.log('성공1');
                    setList(response.data.gridRowJson);
                    console.log('성공2');
                    alert('완료 되었습니다');
                })
                .catch(e => {
                    console.log('실패'+e);
                });
            }
        }
    };


    useEffect(() => {
        console.log('Ddddd', commercialRow);
        console.log('Ddddd', list);
        if (commercialRow[0] !== undefined) {
            console.log('commercialRow : '+JSON.stringify(commercialRow));
            console.log('list전 : '+JSON.stringify(list));
            console.log(nodeid+' : 어떤인덱스');
           var newArray=[...list];
           newArray[nodeid].commercialVehicle = commercialRow[0].commercialVehicle;
           newArray[nodeid].driver = commercialRow[0].driver;
           newArray[nodeid].transportStatus = commercialRow[0].transportStatus;
           newArray[nodeid].status = 'update';
           console.log('뉴어레이'+JSON.stringify(newArray));
           setList(newArray);
           console.log('list후 : '+JSON.stringify(list));
           setList(list.filter(list=>list.status == 'update'));
           console.log('list후후후 : '+JSON.stringify(list));
        }
    }, [commercialRow]);

    


    return (
        <>
            <Typography variant="h3" align="center">
                출차 관리
            </Typography>      
            <CommercialDialog 
                open={openCommercialDialog} 
                close={handleCommercialDialogClose} 
            />
            <br />
            <MyGrid
                column={column}
                title={'배차 관리'}
                list={list}
                onCellClicked={onCellClicked}
                rowSelection="multiple"
             
            >
                <fieldset>
                    <div className={theme.margin}>
                        <TextField
                            id="startDate"
                            type={"date"}
                            value={startDate}
                            onChange={e => {
                                setStartDate(e.target.value);
                            }}
                        />
                        <TextField
                            id="endDate"
                            type={"date"}
                            value={endDate}
                            onChange={e => {
                                setEndDate(e.target.value);
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={searchDateClick}
                        >
                            납기일 배송 가능 업무 조회
                        </Button>
                        |
                        <Button variant="contained" color="primary" onClick={saveClick}>
                            일괄저장
                        </Button>
                    </div>
                </fieldset>
            </MyGrid>
            
        </>
    );
}

export default Transport;