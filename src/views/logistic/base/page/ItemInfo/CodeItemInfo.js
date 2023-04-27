import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, NativeSelect } from '@material-ui/core';
import MyGrid from 'util/LogiUtil/MyGrid';
import Axios from 'axios';
import useAsync from 'util/useAsync';
import * as api from 'erp/logistic/base/api';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function CodeItemInfo(props) {
    const classes = useStyles();

    const columns = {
        columnDefs: [
            { headerName: '구분코드번호', field: 'divisionCodeNo' },
            { headerName: '상세코드', field: 'detailCode' },
            { headerName: '상세코드명', field: 'detailCodeName' }
        ]
    };

    const [divisionCode, setDivisionCode] = useState('');
    const [list, setList] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [display, setDisplay] = useState('none');

    const searchChange = event => {
        console.log(event.target.value);
        setDivisionCode(event.target.value);
        event.target.value === 'standardUnitPrice' ? setDisplay('block') : setDisplay('none');
    };


    const [detailState, searchItemFetch] = useAsync(() =>api.searchItem(divisionCode,setList,props,minPrice,maxPrice), [divisionCode,setList,props,minPrice,maxPrice], true);
console.log(detailState);

const onClick = () => {

    searchItemFetch();
}

/*
    const onClick = () => {
        if (divisionCode !== 'standardUnitPrice' || '') {
            api.searchList(divisionCode).then(function(respones) {
                setList(respones.data.detailCodeList);
            });
        }
        if (divisionCode === 'standardUnitPrice') {
            api.standardUnitPrice(minPrice, maxPrice).then(function(respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
        }
        if (divisionCode === '') {
            api.searchAllList().then(function(respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
        }
    };
*/

    const onCellClicked = e => {
        props.detailCode(e.data.detailCode);
        props.divisionCodeNo(e.data.divisionCodeNo);
        props.close();
    };

    const onChange = e => {
        if (e.target.id === 'minPrice') {
            setMinPrice(e.target.value);
        }
        if (e.target.id === 'maxPrice') {
            setMaxPrice(e.target.value);
        }
    };

    return (
        <MyGrid column={columns} title={'품목 구분'} list={list} onCellClicked={onCellClicked}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                            value={divisionCode}
                            onChange={searchChange}
                            inputProps={{
                                name: 'searchSelect',
                                id: 'age-native-label-placeholder'
                            }}
                        >
                            <option value="">전체</option>
                            <option value="IT">품목 분류별</option>
                            <option value="IT-GROUP">품목군 코드별</option>
                            <option value="standardUnitPrice">표준단가별</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        id="minPrice"
                        size="small"
                        label="최소단가"
                        name="minPrice"
                        fullWidth
                        value={minPrice}
                        onChange={onChange}
                        style={{ display: display }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        id="maxPrice"
                        label="최대단가"
                        name="maxPrice"
                        fullWidth
                        value={maxPrice}
                        onChange={onChange}
                        style={{ display: display }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: '1vh' }}
                        onClick={onClick}
                    >
                        조회
                    </Button>
                </Grid>
            </Grid>
        </MyGrid>
    );
}
