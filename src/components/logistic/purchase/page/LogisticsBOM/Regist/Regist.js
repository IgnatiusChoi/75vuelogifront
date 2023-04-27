import { Button, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import RegistHead from './RegistHead';
import useInput from 'util/useInput';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import DetailDialog from '../DetailDialog';
import RegistGrid from './RegistGrid';
import { useDispatch } from 'react-redux';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const Regist = (props) => {
    const [bomData, setBomData] = useState(null);
    const [itemCode, setItemCode] = useState(null);
    const [positionGridApi, setPositionGridApi] = useState();
    const [nodeId, setNodeId] = useState("");
    const [data, setData] = useState(null);
    const [divisionCode, setDivisionCode] = useState(null);
    const dispatch = useDispatch();

    const useStyles = makeStyles(theme => ({
        root: {
            "& > *": {
                margin: theme.spacing(1)
            },
            paddingLeft: 9,
        },
        fieldset: {
            width: 270            
        },
        button2: {
            paddingLeft: 10
        },
        tField: {
            paddingLeft: 9,
            paddingTop: 60
        }/* ,
        button1: {
            paddingLeft: 18
        } */
    }));

    const classes = useStyles();

    const [bom, getBomDeployRegistFetch] = 
    useAsync((param) =>api.getBomDeployRegist(param), [], true);

    const getBomDeploy = useCallback(() => {
        getBomDeployRegistFetch(itemCode);
    },[getBomDeployRegistFetch, itemCode]);
    

    const checkRenderer = (element) => {
        if(element.data.no === 1) {
            return null;
        }else {
            return '<input type="checkbox" />';
        }
    };

    //========================== 그리드 객체 준비 ==========================
    const onGridReady = (params) => {
        setPositionGridApi(params.api);
        /* params.api.sizeColumnsToFit(); */
    };

    const searchBom = () => {
        if(divisionCode === null && itemCode === null) {
            alert("품목분류를 선택하고 품목코드를 검색해주세요.")
            return;
        }else if(itemCode === null) {
            alert("품목코드를 검색하여 선택해주세요.");
            return;
        }else {
            getBomDeploy();
        }        
    }   

    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const getItemCode = useInput("");
    let dCode = "";

    const [detailCode, getDetailCodeFetch] = 
    useAsync((param) =>api.getDetailCode(param), [], true);
    const getDetailCode = useCallback(() => {
        getDetailCodeFetch(dCode);
    },[dCode, getDetailCodeFetch]);
    useEffect(() => {
        if(detailCode.data){
        setData(detailCode.data.detailCodeList);
        setDetailDialogOpen(true);
    }
    },[detailCode.data]);

    const onCellClicked = (e) => {
        console.log(e.data);
        positionGridApi.forEachNode(node => {
            if(e.data.no === node.data.no) {
                node.setSelected(true);
                //node.setDataValue();
                return;
            }
        });
        setNodeId(e.data.no);
        if(e.colDef.headerName === "NO" || e.colDef.field === "no" ||  e.colDef.field === "netAmount" 
        || e.colDef.field === "description" || e.colDef.field === "status") {
            return;
        }else if(e.colDef.field === "itemClassificationName") {
            dCode = "IT";
        }else if(e.colDef.field === "itemCode" || e.colDef.field === "itemName") {
            if(e.data.itemClassificationName === "") {
                alert("품목구분을 먼저 선택해주세요.");
                return;
            }else {
                dCode = getItemCode.value;
            }
        }
        getDetailCode();
    };

    let resultList = [];
    
    const [result, batchBomFetch] = 
    useAsync((param) =>api.batchBom(param), [], true);
    const batchBom =  useCallback(() => {
        batchBomFetch(resultList);
    },[batchBomFetch, resultList]);
    useEffect(() => {
        if(result.data)
        setBomData(result.data.bomData);
    },[result.data]);
    
    const addNewRow = () => {
        const rowCount = positionGridApi.getDisplayedRowCount();
        if(rowCount === 0) {
            alert("BOM 조회를 먼저 해주세요.");
            return;
        }else {
            const newItem = newRowData(); //새로운 row를 변수에담음
            positionGridApi.updateRowData({ add: [newItem], addIndex: "" }); // ag그리드 api로 그리드에 add 함
        }         
    };    

    const newRowData = () => {
        let newNo = "";
        let rows = positionGridApi.forEachNode(n => {
            newNo = n.data.no + 1;
        }); 
        const rowCount = positionGridApi.getDisplayedRowCount();
        console.log("rowCount : "+rowCount);
        //const lastNo = positionGridApi.getDisplayedRowAtIndex(rowCount-1).bomData.no;        
        const ItemClassificationName = positionGridApi.getDisplayedRowAtIndex(0).data.itemClassificationName;

        //let newNo = parseInt(lastNo.substing(0,1)) + 1;

        function numberPad(str, width) { // newCode 맨 앞의 숫자가 0이면 공백으로 처리하기 때문에 0을 살려주는 함수
            str = str + "";
            return str.length >= str ? str : new Array(width - str.length+1).join('0') + str;
        } 

        let newData = {
            no: newNo,
            itemClassificationName: "",
            itemCode: "",
            itemName: "",
            netAmount: "",
            customerBusinessItems: "",
            decription: "",
            status: "insert",
            parentItemCode: itemCode
        };
        return newData;
    };
    

    const deleteRow = (e) => {
        console.log(333);
        const selectedData = positionGridApi.getSelectedRows();
        console.log(selectedData);
        console.log(selectedData.length);
        
        if(selectedData.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }else if(selectedData.length > 1) {
            if(!window.confirm(
                "해당 정보들을 삭제 하시겠습니까?"
            )) {
                return;
            } else {

                selectedData.status = "DELETE";                
            }
        }else if(selectedData.length === 1) {
            if(!window.confirm(
                "해당 " + selectedData[0].itemCode + "정보를 지우시겠습니까?"
            )) {
                return;
            }else {
                for(let i=0; i<selectedData.length; i++) {
                    selectedData[i].status = "DELETE";
                }                
                //positionGridApi.updateRowData({ update: selectedData.status});
            }
        }
    };

    const batchAll = () => {
        let insertCount = 0;
        let updateCount = 0;
        let deleteCount = 0;

        positionGridApi.forEacthNode((node, index) => {
            let rowObject = node.data;
            let status = rowObject.status;
            if(status === "INSERT") {
                if(rowObject.itemClassificationName === "") {
                    alert("품목분류를 입력하지 않은 행이 있습니다. </br> 저장 목록에서 제외합니다.");
                }else if(rowObject.itemCode === "") {
                    alert("품목코드를 입력하지 않은 행이 있습니다. </br> 저장 목록에서 제외합니다.");
                }else if(rowObject.netAmount === "") {
                    alert("정미수량을 입력하지 않은 행이 있습니다 </br> 저장 목록에서 제외합니다");
                }else {
                    resultList.push(rowObject);
                    insertCount++;
                }
            }else if(status === "UPDATE") {
                resultList.push(rowObject);
                updateCount++;
            }else if(status === "DELETE") {
                if(rowObject.deleteStatus !== "LOCAL 삭제") {
                    resultList.push(rowObject);
                    deleteCount++;
                }else {
                    let removedRows = [];
                    let selectRow = node.data;
                    removedRows.push(selectRow);
                    positionGridApi.updateRowData({ remove: [selectRow] });
                }
            }
        });
        let confirmMsg =
            (insertCount !== 0 ? insertCount + "개의 항목 추가\n" : "") +
            (updateCount !== 0 ? updateCount + "개의 항목 추가\n" : "") +
            (deleteCount !== 0 ? deleteCount + "개의 항목 추가\n" : "") +
            "\r위와 같이 작업합니다. 계속하시겠습니까?";
        
        let confirmStatus = "";

        if(resultList.length !== 0) {
            confirmStatus = window.confirm(confirmMsg);
        }
        if(resultList.length !== 0 && confirmStatus) {
            batchBom();
        }else if(resultList.length !== 0 && !confirmStatus) {
            alert("취소되었습니다.");
        }else if(resultList.length === 0) {
            alert("추가/수정/삭제할 항목이 없습니다.");
        }
        resultList = [];
    }; 
    
    const handleClose = value => {
        setDetailDialogOpen(false);
        if(value.data === undefined) {
            return;
        }
        if(value.data[0].detailCode.indexOf("IT") >= 0) {
            positionGridApi.getRowNode(nodeId).setDataValue("itemClassificationName", value.data[0].detailCodeName);
        }else {
            let flag = false;
            positionGridApi.forEachNode(node => {
                if(node.data.itemCode === value.data[0].detailCode) {
                    if(node.data.lev === "1") {
                        alert("BOM 구성에 자기 자신인 품목을 등록할 수 없습니다.\n 하위품목만 등록할 수 있습니다.");
                    }else {
                        alert("BOM 구성에 이미 있는 품목입니다.");
                    }
                    flag = true;
                }
            });
            if(flag) {
                return;
            }
            positionGridApi.getRowNode(nodeId).setDataValue("itemCode", value.data[0].detailCode);
            positionGridApi.getRowNode(nodeId).setDataValue("itemName", value.data[0].detailCodeName);
        }
        if(positionGridApi.getRowNode(nodeId).data.status !== "insert") {
            positionGridApi.getRowNode(nodeId).setDataValue("status", "UPDATE");
        }
        getItemCode.setValue(value.data[0].detailCode);
    }

    return (
        <>
            <RegistHead 
                trItemCode = {setItemCode}
                trDivisionCode = {setDivisionCode}
                batchAll={batchAll}
                searchBom = {searchBom}
                setNodeId = {setNodeId}
                setData = {setData}
                bomData = {bom.data&&bom.data}
                addNewRow = {addNewRow}
                deleteRow = {deleteRow}
            />

            <RegistGrid 
                bomData = {bom.data&&bom.data}
                onGridReady = {onGridReady}
                onCellClicked = {onCellClicked}
            />

            <DetailDialog data = {data} open = {detailDialogOpen} close = {handleClose} />

        </>
    );
};

export default Regist;