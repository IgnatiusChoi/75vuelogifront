import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Add from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
const currencies = [
    {
        value: 'Y',
        label: 'Y',
    },
    {
        value: 'N',
        label: 'N',
    },
];
export default function WareHouseDialogInfo(props) {
    //테스트
    const classes = useStyles();
    const [warehouseTo, setWarehouseTo] = useState({ status: "INSERT" });
    const onChange = (e) => {
        setWarehouseTo({
            ...warehouseTo, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(warehouseTo);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Add />
                </Avatar>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                //autoComplete="warehouseCode"
                                name="warehouseCode"
                                variant="outlined"
                                //placeholder="자동생성"
                                helperText="창고 코드는 자동생성"
                                disabled
                                fullWidth
                                //id="firstName"
                                label="창고 코드"
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                select
                                fullWidth
                                label="창고 사용 여부"
                                name="warehouseUseOrNot"
                                onChange={onChange}
                                value={warehouseTo.warehouseUseOrNot}
                            >
                                {currencies.map((val) => (
                                    <option key={val.value} value={val.value}>
                                        {val.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="창고 명"
                                name="warehouseName"
                                onChange={onChange}
                                value={warehouseTo.warehouseName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="description"
                                label="설명"
                                onChange={onChange}
                                value={warehouseTo.description}
                                defaultValue={null}
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
                        창고 등록
                    </Button>
                </form>
            </div>
        </Container>
    );
}