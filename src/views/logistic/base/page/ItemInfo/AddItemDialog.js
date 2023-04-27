import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdditemDialog(props) {

  const classes = useStyles();

  const itemCode = '';
  const itemName = '';
  const itemGroupCode = '';
  const itemClassification = '';
  const lossRate = '';
  const leadTime = '';
  const standardUnitPrice = '';
  const description = '';

  const [itemList, setItemList] = useState({});

  useEffect(()=>{
    setItemList({
      unitOfStock : 'EA',
      status : 'INSERT'
    })
    return setItemList({
      unitOfStock : 'EA',
      status : 'INSERT'
    })
  },[]);

  const onChange = (e) => {
    setItemList({...itemList,[e.target.name]: e.target.value});
    console.log(itemList);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(itemList);
  }



  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          품목 추가
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={itemCode}
                onChange={onChange}
                name="itemCode"
                variant="outlined"
                required
                id="itemCode"
                label="품목 코드"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={itemName}
                onChange={onChange}
                variant="outlined"
                required
                id="itemName"
                label="품목명"
                name="itemName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={itemGroupCode}
                onChange={onChange}
                name="itemGroupCode"
                variant="outlined"
                required
                id="itemGroupCode"
                label="품목군 코드"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="mainOffice">품목 분류</InputLabel>
            <Select
                labelId='itemClassification'
                id="itemClassification"
                name="itemClassification"
                align='center'
                fullWidth
                required
                defaultValue={itemClassification}
                onChange={onChange}
                >
                  <option value={'IT-CI'}>완제품</option>
                  <option value={'IT-SI'}>반제품</option>
                  <option value={'IT-MA'}>원재료</option>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                id="unitOfStock"
                label="단위"
                name="unitOfStock"
                defaultValue='EA'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                variant="outlined"
                id="lossRate"
                label="손실율"
                name="lossRate"
                defaultValue={lossRate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                name="leadTime"
                variant="outlined"
                required
                id="leadTime"
                label="소요일"
                defaultValue={leadTime}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange}
                name="standardUnitPrice"
                variant="outlined"
                required
                id="standardUnitPrice"
                label="표준 단가"
                helperText="숫자로만 입력해주세요."
                defaultValue={standardUnitPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange}
                variant="outlined"
                fullWidth
                id="description"
                label="설명"
                name="description"
                defaultValue={description}
              />
            </Grid>
            </Grid>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            품목 등록
          </Button>
        </form>
      </div>
    </Container>
  );
}