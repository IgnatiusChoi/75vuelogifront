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

export default function AddCodeInfo(props) {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [codeTo, setCodeTo] = useState({});

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(codeTo);
  }

  const handleOpen = (e) => {
    if (e.target.id === 'codeType')
      setOpen(true);
    else
      setOpen2(true);
  }
  const handleClose = () => {
    setOpen(false)
    setOpen2(false)
  }

  const onChange = (e) => {
    setCodeTo({
      ...codeTo, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setCodeTo(
      {
        status: 'INSERT',
        description: ' ',
      }
    )
    return () => setCodeTo({});
  }, []);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          구분코드 등록
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
                id="divisonCodeNo"
                label="구분 코드 번호"
                autoFocus
                onChange={onChange}
                value={codeTo.divisonCodeNo}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="codeTypeLabel">코드 타입</InputLabel>
              <Select
                labelId='codeTypeLabel'
                id="codeType"
                name="codeType"
                open={open}
                fullWidth
                onClose={handleClose}
                onOpen={handleOpen}
                align='center'
                onChange={onChange}
                value={codeTo.codeType}
              >
                <MenuItem value={'공통'}>공통</MenuItem>
                <MenuItem value={'구매'}>구매</MenuItem>
                <MenuItem value={'영업'}>영업</MenuItem>
                <MenuItem value={'회계'}>회계</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="divisionCodeName"
                label="코드명"
                name="divisionCodeName"
                onChange={onChange}
                value={codeTo.divisionCodeName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="codeChangeAvailableLabel">변경</InputLabel>
              <Select
                labelId='codeChangeAvailableLabel'
                id="codeChangeAvailable"
                name="codeChangeAvailable"
                open={open2}
                fullWidth
                onClose={handleClose}
                onOpen={handleOpen}
                align='center'
                onChange={onChange}
                value={codeTo.codeChangeAvailable}
              >
                <MenuItem value={'변경불가능'}>변경불가능</MenuItem>
                <MenuItem value={'변경가능'}>변경가능</MenuItem>
              </Select>
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
                value={codeTo.description}
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