import React, { useState, useCallback, useEffect } from 'react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useInput from "util/useInput";
import { Button, FormControlLabel, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core';
import Axios from 'axios';
import SearchItemCodeDialog from '../SearchItemCodeDialog';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/purchase/api';

const DeployHead = ({ trCondition, trItemCode, trDivisionCode, searchBom }) => {

    const [openItemCodeDialog, setOpenItemCodeDialog] = useState(false);
    const [divisionCode, setDivisionCode] = useState(null);
    const [data, setData] = useState(null);

    const getItemCode = useInput("");

    const useStyles = makeStyles(theme => ({
        formControl: { 
            margin: theme.spacing(1),
            minWidth: 120,
            paddingLeft: 10
        },
        root: {
            '& > * ': {
                margin: theme.spacing(2),
            }
        },
        tField: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 35,
            paddingBottom: 15
        },
        fieldset: {
            paddingLeft:15
        }        
    }));

    const classes = useStyles();

    const onDivisionChange = (e) => {
        setDivisionCode(e.currentTarget.value);
        trDivisionCode(e.currentTarget.value);
    };

    const onConditionChange = (e) => {
        trCondition(e.currentTarget.value);
    };

    const handleClickOpen = () => {
        if(divisionCode === null) {
            alert("품목분류를 먼저 선택해주세요.");
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
        <div className = {classes.root}>
            <tr>
                <td style={{paddingLeft:42}}>
                    <RadioGroup 
                        row
                        aria-label = "itemCode"
                        onChange = {onDivisionChange}
                    >
                        <fieldset className = {classes.fieldset}>
                            <legend>
                                <strong>품목분류</strong>
                            </legend>
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
                            <FormControlLabel
                                value = "IT-MA"
                                control = {<Radio />}
                                label = "원재료"
                            />
                        </fieldset>
                    </RadioGroup>        
                </td>
                <td>
                    <RadioGroup className={classes.formControl}
                        row
                        aria-label = "condition"
                        onChange = {onConditionChange}
                    >
                        <fieldset className = {classes.fieldset}>
                            <legend>
                                <strong>BOM 검색조건</strong>
                            </legend>
                                <FormControlLabel
                                    value = "forward"
                                    control = {<Radio />}
                                    label = "정전개"
                                />
                                <FormControlLabel
                                    value = "reverse"
                                    control = {<Radio />}
                                    label = "역전개"
                                />                            
                        </fieldset>                        
                    </RadioGroup>
                </td>
                <td>
                    <TextField
                        className = {classes.tField}
                        id = "itemCode"
                        InputProps = {{
                            endAdornment: (
                                <Button style={{width:100}}
                                    variant = "contained"
                                    siae = "small"
                                    color = "primary"
                                    onClick={() => handleClickOpen()}
                                    value = "itemCode"
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
                <td>
                    <Button 
                        style={{top:55}}
                        variant = "contained"
                        color = "primary"
                        size = "medium"
                        onClick = {() => searchBom()}
                    >
                        BOM 조회
                    </Button>
                </td>
            </tr>
            <SearchItemCodeDialog data = {data} open = {openItemCodeDialog} close = {handleClose} />
        </div>    
    );
};

export default DeployHead;