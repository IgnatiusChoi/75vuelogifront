import React, { useState,useEffect } from "react";
import { Button, AppBar, Toolbar, Typography, TextField } from "@material-ui/core";
import useStyles from "erp/account/account/page/Slip/Theme";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import * as types from "../saga/transportSaga";
import CommercialDialog from "./CommercialDialog";

//========================================== 2021-12-23 최수진 배차관리 =========================================
const Transport = props => {
    const theme = useStyles(); //CSS
    const dispatch = useDispatch();

    const data = useSelector(state => state.logistic.transport.transportList);


    const [startDate, setStartDate] = useState(); //시작 날짜
    const [endDate, setEndDate] = useState();
    const [transportGrid, setTransportGrid] = useState([]); //그리드 동적 값
    var [openCommercialDialog, setOpenCommercialDialog] = useState(false); //거래처 다이알로그
    const [commercialRow, setCommercialRow] = useState(""); //거래처 다이알로그 상태값
    const [transportRow, setTransportRow] = React.useState(); //분개그리드
    //const [nodeId, setNodeId] = useState(""); //분개그리드 row의indexid
  
  
    const column = {
        columnDefs: [
          { headerName: "출차상태", field: "transportStatus" },
          { width: "150", headerName: "수주일련번호", field: "contractNo" },
          { headerName: "납기일", field: "dueDateOfContract" },
          { headerName: "차량", field: "commercialVehicle" },
          { headerName: "기사님", field: "driver" }, 
          { headerName: "거래처 기본 주소", field: "customerBasicAddress" },
          { headerName: "거래처 상세 주소", field: "customerDetailAddress" },
          { headerName: "요청사항", field: "memo", editable: true },  // editable : 편집가능
          { headerName: "요청일시", field: "reportingDate" },
        ],
      };

    const selectBtn = () => {
        dispatch({
          type: types.SEARCH_TRANSPORT_LIST_REQUEST,
          payload: {
            startDate: startDate,
            endDate: endDate,
          },
        });
    };

    const saveBtn = () => {

    };

     //=================================================== ag Grid 초기화 시 실행 =========================================
    const onGridReady = params => {
      console.log("ddddd");
      setTransportRow(params.api); //동적으로변하는 분개그리드 값 할당
      params.api.sizeColumnsToFit(); // 칼럼 사이즈 자동조절
    };

      //================================================== 거래처 렌더링  ===================================================
    useEffect(
      onCellClicked => {
        if (commercialRow[0] !== undefined) {
          // customerDialog 에 클릭한 row 값
          let itemsToUpdate = [];
          // rowNode:분개그리드의 rows , index:분개그리드의 index
          transportRow.forEachNodeAfterFilterAndSort(function(rowNode, index) {
            // 분개그리드 indexId  !== 클릭한 셀 indexId ( 결국 클릭한 셀에 index에 값을 insert 할려고 비교연산함 )
            let CustomerData = rowNode.data; // rowNode : Dialog에서 넘어온 data를 estimateData에 넣고,
            CustomerData.commercialVehicle = commercialRow[0].commercialVehicle; //계정코드
            CustomerData.driver = commercialRow[0].driver; //계정명
            CustomerData.transportStatus = commercialRow[0].transportStatus; //계정명
            itemsToUpdate.push(CustomerData); // 배열에 집어넣고,
          });
          transportRow.updateRowData({ update: itemsToUpdate }); // 그리드 컴포넌트에 update 시켜준다. 즉, 값이 들어간다.
        }
      },
      [commercialRow],
    ); // commercialRow 값이 변할 때마다  useEffect를 실행

    //======================================== Grid cell 변경 유효성검사  =========================================
    const rowCellChanged = params => {
        console.log("transportStatus", params.data.transportStatus);
        if ( params.data.transportStatus === "SHIPPING" ) {
            alert("  운송중일때는 수정이 불가능합니다  ");
            transportGrid.stopEditing(); //편집 중지
            return;
        }
    };

    //=================================================== 차량 다이알로그 CLOSED  =========================================
    const handleCommercialDialogClose = value => {
      setOpenCommercialDialog(false);
      if (value.data === undefined) {
        return;
      } else {
        console.log("선택차량 : " + JSON.stringify(value.data));
        setCommercialRow(value.data); //거래처 Row값을 set
      }
    };

  // ==============================================그리드 셀 하나 Auto============================
  const onCellClicked = e => {
    if (
      e.colDef.field === "customerCode" ||
      e.colDef.field === "customerName"
    ) {
      setOpenCommercialDialog(true);
    } 
  };
  



  return (
    <>
      <Typography variant="h3" gutterBottom>
        배차관리
      </Typography>
      <CommercialDialog 
        open={openCommercialDialog} 
        close={handleCommercialDialogClose} />
      <div Align="center">
        <fieldset>
          <Typography variant="h5">[ 납기일 날짜 조회 ]</Typography>
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
              onClick={selectBtn}
              startIcon={<SearchIcon />}
            >
              조회
            </Button>
          </div>
        </fieldset>
      </div>

      <div>
        <div className={theme.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4">배차</Typography>
              <Typography variant="h6" className={theme.title}></Typography>
              <Button
                className={theme.menuButton}
                variant="contained"
                color="secondary"
                onClick={saveBtn}
              >
                일괄저장
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </div>

      <div
          enableColResize="true" //칼럼 리사이즈 허용 여부
          enableSorting="true" //렬 옵션 허용 여부
          enableFilter="true" //필터 옵션 허용 여부
          style={{
            //height: "200px",
            width: "100%",
            //paddingTop: "25px",
            float: "center",
          }}
        >
            <AgGridReact
                columnDefs={column.columnDefs} //정의된 컬럼
                rowData={data} //Reduce에서 받아온 데이터
                rowSelection="single" //하나만 선택하거나 복수개를 선택할 수 있음
                GridReady={onGridReady}
                onGridSizeChanged={event => {
                    event.api.sizeColumnsToFit();
                }}
                getRowStyle={function(param) {
                    return { "text-align": "center" };
                  }} //body 가운데 정렬
                onCellEditingStarted={rowCellChanged} //편집 허용인 칼럼을 더블 클릭할 때 발생하는 이벤트.
                //onCellClicked={onCellClicked} //셀 한번클릭
                domLayout={"autoHeight"}
                onCellClicked={onCellClicked} //셀 클릭
            />
        </div>
    </>
  );
};
export default Transport;