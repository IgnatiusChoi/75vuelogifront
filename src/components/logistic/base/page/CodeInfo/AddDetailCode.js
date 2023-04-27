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

function AddDetailCode(props) {

  const [detailCodeTo,setDetailCodeTo]=useState({});

  const classes=useStyles();

  const onChange=(e)=>{
    setDetailCodeTo({
        ...detailCodeTo,[e.target.id]:e.target.value
    })
  };

  const onSubmit=(e)=>{
        e.preventDefault();
        props.onSubmit(detailCodeTo);
  };

  useEffect(()=>{
    setDetailCodeTo(
      {
        'divisionCodeNo':props.divisionCodeNo,
        status:'INSERT',
        description:' ',
      }
    )
    return () => setDetailCodeTo({}); 
  },[]);
return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          상세코드 등록
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="divisonCodeNo"
                name="divisonCodeNo"
                variant="outlined"
                required
                fullWidth
                id="divisionCodeNo"
                label="구분코드 번호"
                autoFocus
                value={detailCodeTo.divisionCodeNo}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="detailCode"
                    name="detailCode"
                    variant="outlined"
                    required
                    fullWidth
                    id="detailCode"
                    label="상세코드 번호"
                    onChange={onChange}
                    value={detailCodeTo.detailCode}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="detailCodeName"
                label="상세코드명"
                name="detailCodeName"
                onChange={onChange}
                value={detailCodeTo.detailCodeName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="codeUseCheck"
                    label="사용잠금"
                    name="codeUseCheck"
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="설명"
                name="description"
                onChange={onChange}
                value={detailCodeTo.description}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           >
            구분코드 등록
          </Button>
        </form>
      </div>
    </Container>
    );
}

export default AddDetailCode;