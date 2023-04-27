import React,{useEffect,useState,useRef,useCallback} from 'react';
import BaseWorkTime from './BaseWorkTime';
import {
    selectBaseWorkTimeList,
    insertBaseWorkTimeList,
    deleteBaseWorkTime,
    batchBaseWorkTime
  } from "erp/hr/Action/Action";
import { connect } from "react-redux";
import { normalizeUnits } from 'moment';

const BaseWorkTimeContainer = ({
    selectBaseWorkTimeList,
    insertBaseWorkTimeList,
    deleteBaseWorkTime,
    batchBaseWorkTime,
    baseWorkTimeList,
    history
})=> {

  const [gridApi, setGridApi] = useState(null);

  function cellClicked(e){
    console.log(e);
    if(e.colDef.field==='applyYear'&&e.data.status!=='insert')
    e.colDef.editable=false;
    else
    e.colDef.editable=true;
  }

  function onGridReady(params) {
    console.log(params);
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
}

  useEffect(() => {
    console.log("BaseWorkTimeContainer");
            selectBaseWorkTimeList();
  },[]);

  const batchItems = useCallback(()=> {
    console.log('batchItems');
    let list = [];
    gridApi.forEachNode((node, index)=>{
     list.push(node.data);
    });
    const arr = list.map(el => el.applyYear);
    const result = arr.reduce((accu,curr)=> {
      accu.set(curr, (accu.get(curr)||0) +1) ;
      return accu;
    },new Map());
    let array = [];
    for (let [key, value] of result.entries()) {
      console.log(key + ' : ' + value);
      if(value>1) array.push(key);
    }
    if(array.length) {
      alert(array.join('년도, ')+'년도 중복'); 
      return;
    }
    list = list.filter(data => data.status !== 'normal');
   if(list.length) batchBaseWorkTime(list);
   selectBaseWorkTimeList();

  list = [];
   gridApi.forEachNode((node, index)=>{
    list.push(node.data);
   });
  },[gridApi]);

  const deleteItems = useCallback(()=> {
    var rows = gridApi.getSelectedRows();
    console.log(rows);
    gridApi.updateRowData({remove:rows});
    let list =rows.filter(el => el.status!=='insert');
    console.log(list);
    if(list.length){
      deleteBaseWorkTime(list);
      selectBaseWorkTimeList();
    }
  },[gridApi]);

  const addItem = useCallback(()=> {
    console.log('addItems');
    //insert store에서 관리하기
    //insertBaseWorkTimeList();

    //insert ag grid로 관리하기
    const newRow = {
      applyYear: null,
      attendTime: null,
      chk: null,
      dinnerEndTime: null,
      dinnerStartTime: null,
      errorCode: null,
      errorMsg: null,
      lunchEndTime:null,
      lunchStartTime: null,
      nightEndTime: null,
      overEndTime: null,
      quitTime: null,
      status: "insert"
    }
    gridApi.updateRowData({add: [newRow]});

  },[gridApi]);

  const cellEditingStopped = useCallback(event=>{
    console.log('cellEditingStopped');
    let rowData = event.node.data;
if(rowData.status !== 'insert')rowData.status = 'update';
    console.log(rowData);
  },[]);
   

    return (<React.Fragment>
        <BaseWorkTime 
        baseWorkTimeList={baseWorkTimeList} 
        onGridReady={onGridReady} 
        addItem={addItem} 
        batchItems={batchItems}
        deleteItems={deleteItems}
        cellEditingStopped={cellEditingStopped}
        cellClicked={cellClicked}
        />
    </React.Fragment>);
}

const mapStateToProps = state => {
  console.log('state');
  console.log(state);
    return {
      baseWorkTimeList: state.HrReducer.baseWorkTimeList,
    };
  };
  export default connect(mapStateToProps, {
    selectBaseWorkTimeList,
    insertBaseWorkTimeList,
    deleteBaseWorkTime,
    batchBaseWorkTime
  })(BaseWorkTimeContainer);