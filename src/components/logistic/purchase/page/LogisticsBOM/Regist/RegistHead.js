import { Button, FormControlLabel, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import useInput from "util/useInput";
import SearchItemCodeDialog from '../SearchItemCodeDialog';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const RegistHead = ({ trItemCode, trDivisionCode, searchBom, addNewRow, deleteRow, batchAll }) => {
    const [openItemCodeDialog, setOpenItemCodeDialog] = useState(false);
    const [divisionCode, setDivisionCode] = useState(null);
    const [data, setData] = useState(null);
    
    const getItemCode = useInput("");

    const useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
                margin: theme.spacing(2)
            }
        },
        fieldset: {
            width: 390,
            paddingTop: 20
        },
        button2: {
            paddingLeft: 20
        },
        bomButton: {
            paddingLeft: 20,
            width: 120            
        },
        tField: {
            paddingLeft: 10,
            paddingTop: 35
        }
    }));

    const classes = useStyles();

    const onDivisionChange = (e) => {
        setDivisionCode(e.currentTarget.value);
        trDivisionCode(e.currentTarget.value);
    };

    const handleClickOpen = () => {
        if(divisionCode === null) {
            alert("품목분류를 먼저 선택해주세요. \n(완제품, 반제품 중에 선택)");
            return;
        }else {
            getDetailCode();
            setOpenItemCodeDialog(true);
        }        
    };

    const handleClose = (value) => {
        setOpenItemCodeDialog(false);
        if(value.data === undefined) {
            return;
        }
        getItemCode.setValue(value.data[0].detailCode);
        trItemCode(value.data[0].detailCode);
    };

    const [detailCode, getDetailCodeFetch] = useAsync((param) =>api.getDetailCode(param), [], true);
    const getDetailCode = useCallback(() => {
        getDetailCodeFetch(divisionCode);
    },[divisionCode, getDetailCodeFetch]);
    useEffect(() => {
        if(detailCode.data)
        setData(detailCode.data.detailCodeList)
    },[detailCode.data])

    return (
        <>
            <tr className = {classes.root}>
                <td style = {{ paddingLeft: 50 }}>
                    <RadioGroup
                        row
                        aria-label = "itemCode"
                        onChange = {onDivisionChange}
                    >
                        <fieldset>
                            <legend>품목분류</legend>
                            <FormControlLabel
                                value = "IT-CI"
                                control = {<Radio />}
                                label = "완제품"
                            />
                            <FormControlLabel
                                value = "IT-SI"
                                control = {<Radio />}
                                label = "반제품"
                            />
                        </fieldset>
                    </RadioGroup>
                </td>
                <td>
                    <TextField className = {classes.tField}
                        id = "itemCode"
                        InputProps = {{
                            endAdornment: (
                                <Button style={{width:100}}      
                                    variant = "contained"
                                    color = "primary"
                                    size = "medium"
                                    value = "searchCode"
                                    onClick = {() => handleClickOpen()}
                                >
                                    검색
                                </Button>
                            )
                        }}                        
                        margin = "normal"
                        placeholder = "          품목코드검색"
                        disabled = {true}
                        value = {getItemCode.value}
                    />
                    
                </td>
                <td className = {classes.bomButton}>
                    <span>
                        <Button style={{top:56, width: 120}}                             
                            variant = "contained"
                            color = "primary"
                            size = "medium"
                            onClick = {() => searchBom()}
                        >
                            BOM 조회
                        </Button>
                    </span>                    
                </td>
                <td className = {classes.button2}>
                    <fieldset className = {classes.fieldset}>
                        <legend>
                            <strong>BOM 수정/삭제/저장</strong>
                        </legend>
                        <span>
                            <Button
                                variant = "contained"
                                color = "primary"
                                size = "medium"
                                value = "addNew"
                                onClick = {addNewRow}
                            >
                                새로운 항목 추가
                            </Button>
                        </span>
                        <span className = {classes.button2}>
                            <Button
                                variant = "contained"
                                color = "primary"
                                size = "medium"
                                onClick = {deleteRow}
                                value = "deleteRow"
                            >
                                삭제
                            </Button>
                        </span>
                        <span className = {classes.button2}>
                            <Button
                                variant = "contained"
                                color = "primary"
                                size = "medium"
                                onClick = {() => batchAll()}
                                value = "batcAll"
                            >
                                일괄저장
                            </Button>
                        </span>
                    </fieldset>
                </td>
                <SearchItemCodeDialog data = {data} open = {openItemCodeDialog} close = {handleClose} />
            </tr>
        </>        
    );
};

export default RegistHead;