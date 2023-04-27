import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Grid from './Grid';
import Icon from "@material-ui/core/Icon";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const HolidayManageComponent = ({holidayListRequest,holidayList,errorCode,errorMsg,updateHolidayRequest}) => {

    let list = [];
    const [gridEvent, setGridEvent] = useState();
    const createNewRowData = () => {
        let newData = {
            applyDay : '',
            holidayName: '',
            note : '',
            holidayCode : Math.floor(Math.random()*(10*10))+"-"+Math.floor(Math.random()*(10*10))+"-"+Math.floor(Math.random()*(100*100)),
            status : 'insert'
        };
    return newData;
     }

     
    const addOnClick = () =>{
        const newItem = createNewRowData();
        const a = gridEvent.updateRowData({ add: [newItem] });   // 만들어진 새로운 row를 그리드에 add 해라.
        console.log(a.add[0].columnController.allDisplayedCenterVirtualColumns[0].colDef.editable = true )
    }
  
    const onGridReady = event => {
        event.api.sizeColumnsToFit();
        setGridEvent(event.api);
      }
      
    async function CellEditingStopped(row) {  
        if(row.data.status !== 'insert'){
            row.data.status = 'update';
        }else{
            if(
            row.data.applyDay === '' && 
            row.data.holidayName === '' && 
            row.data.note === ''){
                return;
            }
        }
        await updateHolidayRequest([row.data])
        row.data.status = 'update';
    };
    
    const onRemoveSelected = () => {
        var selectedData = gridEvent.getSelectedRows();
        selectedData[0].status = 'delete';
        gridEvent.updateRowData({ remove: selectedData });
        updateHolidayRequest(selectedData);
      };

    useEffect(() => {
        holidayListRequest()
    }, []);
    
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography component="h2" variant="h4">
                        휴일관리
                    </Typography>
                </Toolbar>
            </AppBar>  
            <br />
            <div align='center'>
                <fieldset>
                    <legend> [ 휴일 목록 ] </legend>
                    
                    <Button variant="contained" color="primary" onClick={addOnClick} startIcon={<Icon className="fa fa-plus-circle" />} >
                        추가
                    </Button> 
                    
                    <Button variant="contained" color="primary" onClick={onRemoveSelected} startIcon={<DeleteOutlinedIcon />}>
                        삭제
                    </Button>                     
                    <div className="box" >        
                        <Grid data={holidayList}
                         onGridReady={onGridReady}
                         onCellEditingStopped = {CellEditingStopped}
                         />
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default HolidayManageComponent;