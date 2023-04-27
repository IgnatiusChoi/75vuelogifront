import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./Grid.css"
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui-dist/jquery-ui.css';

const Grid = ({ data,onGridReady,onCellEditingStopped }) => {
    
  const getRowStyle = (param) =>{
      //가운데
      if (param.node.rowPinned) {
        return { "font-weight": "bold", background: "#dddddd" };
      }
      return { "text-align": "center" };
    
  }

    const Grid = [
        // 칼럼정의
        {
          headerName: "일자",
          field: "applyDay",
          cellEditor:"datePicker",
          editable: true
        },
        {
          headerName: "휴일명",
          field: "holidayName",
          editable: true
        },
        {
          headerName: "비고",
          field: "note",
          editable: true
        },
        {
          headerName: "holidayCode",
          field: "holidayCode",
          hide: true
        },
        { 
          headerName: "상태", 
          field: "status", 
          hide: true 
        }  
      ];
      
      function getDatePicker() {
        function Datepicker() {}
        Datepicker.prototype.init = function (params) {
          this.eInput = document.createElement('input');
          this.eInput.value = params.value;
          this.eInput.classList.add('ag-input');
          this.eInput.style.height = '100%';
          $(this.eInput).datepicker({ dateFormat: 'yy-mm-dd' });
        };
        Datepicker.prototype.getGui = function () {
          return this.eInput;
        };
        Datepicker.prototype.afterGuiAttached = function () {
          this.eInput.focus();
          this.eInput.select();
        };
        Datepicker.prototype.getValue = function () {
          return this.eInput.value;
        };
        Datepicker.prototype.destroy = function () {};
        Datepicker.prototype.isPopup = function () {
          return false;
        };
        return Datepicker;
      }

    return (
        <>
            <br/>
            <div
                className={"ag-theme-material"}
                skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"        
                rowStyle={{ "text-align": "center" }}
                style={{
                height: "600px",
                width: "100%",
                paddingTop: "25px",
                }}
                cellStyle={{ textAlign: "center" }}
            >
            <AgGridReact
            columnDefs={Grid}
            rowData={data}            
            defaultColDef= {{ resizable: true }}
            rowSelection="single"            
            getRowStyle={getRowStyle}
            onGridReady={onGridReady}
            onCellEditingStopped={onCellEditingStopped}
            components={{ datePicker: getDatePicker() }}
            />
            </div>
        </>
    )
}

export default Grid;
