import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Axios from "axios";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useThemeSwitcher } from "mui-theme-switcher";

//=============================== 2020-09-10 거래처관리 조편백 ======================================
const CommercialDialog = ({ open, close, value }, props) => {

  const [grid, setGrid] = useState('');

    //============================== 닫기버튼 ====================================
    const Close = () => {
        close({
            data: undefined,
        });
    };
    const [data, setData] = useState([]); //useEffect 로 조회한 결과값 받는 상태 값

    
    //컴포넌트가 마운트 됐을 때 호출됨
    useEffect(() => {
      console.log('유즈이펙트하자');
      Axios.get('http://localhost:8282/logi/transport/getCommercialVehicleList')     //COMMERCIAL_VEHICLE_INFO 테이블 가져오는 api
        .then(response => {
          console.log("(((((((((((((((((((((", response);
          setData(response.data.gridRowJson);
        })
        .catch(e => {
          console.log('실패');
          console.log(e);
        });
    },[]);
  
    
    //=============================== ag_grid 시작 ======================================
    const column = {
      columnDefs: [
          { headerName: '차량', field: 'commercialVehicle', width: 100 },
          { headerName: '기사', field: 'driver', width: 100 },
          { headerName: '출차상태', field: 'transportStatus', width: 100 },
      ]
  };
    //=================================================== ag Grid 초기화 시 실행 =========================================
    const onGridReady = params => {
      setGrid(params.api);
      params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };

    const onCellClicked = parmas => {
      console.log('셀클릭');
      close({
          data: grid.getSelectedRows(), // data는 클릭한 row의 정보이고,
          division: 'accountDialog'
      });
  };
  
  
    const { dark } = useThemeSwitcher();
    return (
        <Dialog aria-labelledby="alert-dialog-slide-title" open={open} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle align="center">차 량 지 정</DialogTitle>
            
            <div
                className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
                rowstyle={{ "text-align": "center" }}
                style={{
                height: "400px",
                width: "100%",
                paddingTop: "8px",
                }}
            >
                <AgGridReact
                    columnDefs={column.columnDefs} //정의된 컬럼
                    rowData={data} //Reduce에서 받아온 데이터
                    rowSelection="single" //하나만 선택하거나 복수개를 선택할 수 있음
                    onGridReady={onGridReady} //onload 이벤트와 유사한 것
                    getRowStyle={function(param) {
                        return { "text-align": "center" };
                    }} //body 가운데 정렬
                    onCellClicked={onCellClicked} // cell을 클릭하면, handleClose가 실행된다.
                />
            </div>
            <Button onClick={Close} color="secondary">
                Close
            </Button>
        </Dialog>
    );
};

export default CommercialDialog;