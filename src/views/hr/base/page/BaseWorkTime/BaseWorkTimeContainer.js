import React,{useState,useCallback} from 'react';
import BaseWorkTime from './BaseWorkTime';
import { connect } from "react-redux";
import usePromise from "util/usePromise";
import 
{
  getBaseWorkTimeList,
  deleteBaseWorkTime,
  batchBaseWorkTime
  } from '../../api';

const BaseWorkTimeContainer = ()=> {

  const [loading, response, error] = usePromise(() => {
    return getBaseWorkTimeList();
  }, []);  

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


/*--------------------*/
/*-----batchItems-----*/
/*--------------------*/
  const batchItems = useCallback(()=> {
    console.log('batchItems');
    const process = async (param) => {
      console.log(param);
      try{
      await batchBaseWorkTime(param);
      alert("저장 완료");
    }catch(e){
      alert(e.message);
    }
    }
    let list = [];
    gridApi.forEachNode(node => {
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
   if(list.length) 
   {
     
    process(list);

gridApi.forEachNode((node,index)=>{
  if(node.data.status!=='normal'){
    node.data.status='normal'
    gridApi.updateRowData({update:[node.data]});
  }
})
   }

   console.log('완료');

  },[gridApi]);


/*---------------------*/
/*-----deleteItems-----*/
/*---------------------*/
  const deleteItems = useCallback(()=> {
    console.log(gridApi);
    const process = async (param) => {
      console.log(param);
      await deleteBaseWorkTime(param);
    }
    var rows = gridApi.getSelectedRows();
    console.log(rows);
    gridApi.updateRowData({remove:rows});
    let list =rows.filter(el => el.status!=='insert');
    console.log(list);
    if(list.length){
       process(list);
    }
  },[gridApi]);


  /*-----------------*/
  /*-----addItem-----*/
  /*-----------------*/
  const addItem = useCallback(()=> {
    console.log('addItems');
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

    // 대기중일 때
    if (loading) {
      return <div>대기중...</div>;
    }
    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
      return null;
    }
  
    // 에러가 발생했을 때
    if (error) {
      return <div>에러 발생!</div>;
    }

    if(response){
      console.log(response);

    return (<React.Fragment>
        <BaseWorkTime 
        baseWorkTimeList={response.data.gridRowJson} 
        onGridReady={onGridReady} 
        addItem={addItem} 
        batchItems={batchItems}
        deleteItems={deleteItems}
        cellEditingStopped={cellEditingStopped}
        cellClicked={cellClicked}
        />
    </React.Fragment>);
    }
}

const mapStateToProps = state => {
  console.log('state');
  console.log(state);
    return {
    };
  };
  export default connect(mapStateToProps, {
  })(BaseWorkTimeContainer);