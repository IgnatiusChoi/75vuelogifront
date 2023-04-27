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

const usestyles = makeStyles(theme => ({
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
    }
}));

const today = () => {
    let current = new Date();
    let year = current.getFullYear().toString(); // 년도
    let month = (current.getMonth() + 1).toString(); // 월
    let date = current.getDate().toString(); // 날짜
    console.log(year + month + date);
    return year + '-' + month + '-' + date;
};

export default function AddWorkplace(props) {
    const [workplaceTo, setWorkplaceTo] = useState({});
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [closedDate, setClosedDate] = useState(true);
    const [displayClosed, setDisplayClosed] = useState('none');
    const [closedLable, setClosedLable] = useState('');

    const classes = usestyles();

    const onChange = e => {
        if (e.target.name === 'isClosed') {
            if (e.target.value === 'Yes') {
                setDisplayClosed('block');
                setClosedDate(false);
            } else if (e.target.value === 'No') {
                setDisplayClosed('none');
                setWorkplaceTo({ ...workplaceTo, workplaceCloseDate: '' });
                setClosedDate(true);
            }
        } else if (e.target.name === 'workplaceCloseDate') {
            setWorkplaceTo({ ...workplaceTo, [e.target.id]: e.target.value });
            setClosedLable('폐업일');
        } else if (e.target.name === 'isMainOffice') {
            setWorkplaceTo({ ...workplaceTo, [e.target.name]: e.target.value });
        } else {
            setWorkplaceTo({ ...workplaceTo, [e.target.id]: e.target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        //console.log(workplaceTo)
        props.onSubmit(workplaceTo);
    };

    const handleClose = e => {
        setOpen(false);
        setOpen2(false);
    };

    const handleOpen = e => {
        if (e.target.id === 'isClosed') {
            setOpen(true);
        } else {
            setOpen2(true);
        }
    };

    useEffect(() => {
        setWorkplaceTo({
            workplaceEstablishDate: today(),
            workplaceOpenDate: today(),
            status: 'INSERT',
            companyCode: 'COM-01'
        });
        return () => setWorkplaceTo({});
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Add />
                </Avatar>
                <Typography component="h1" variant="h5">
                    사업장 등록
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="corporationLicenseNumber"
                                name="corporationLicenseNumber"
                                variant="outlined"
                                required
                                fullWidth
                                id="corporationLicenseNumber"
                                label="사업장 등록 번호"
                                autoFocus
                                value={workplaceTo.corporationLicenseNumber}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="businessLicenseNumber"
                                label="법인 등록 번호"
                                name="businessLicenseNumber"
                                value={workplaceTo.businessLicenseNumber}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceName"
                                label="사업장"
                                name="workplaceName"
                                value={workplaceTo.workplaceName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceCeoName"
                                label="대표자"
                                name="workplaceCeoName"
                                value={workplaceTo.workplaceCeoName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceBusinessConditions"
                                label="업태"
                                name="workplaceBusinessConditions"
                                value={workplaceTo.workplaceBusinessConditions}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceBusinessItems"
                                label="종목"
                                name="workplaceBusinessItems"
                                value={workplaceTo.workplaceBusinessItems}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceZipCode"
                                label="우편 번호"
                                name="workplaceZipCode"
                                value={workplaceTo.workplaceZipCode}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="workplaceBasicAddress"
                                label="주소"
                                id="workplaceBasicAddress"
                                value={workplaceTo.workplaceBasicAddress}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceDetailAddress"
                                label="상세 주소"
                                name="workplaceDetailAddress"
                                value={workplaceTo.workplaceDetailAddress}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceTelNumber"
                                label="전화번호"
                                name="workplaceTelNumber"
                                value={workplaceTo.workplaceTelNumber}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceFaxNumber"
                                label="팩스번호"
                                name="workplaceFaxNumber"
                                value={workplaceTo.workplaceFaxNumber}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceEstablishDate"
                                label="설립일"
                                name="workplaceEstablishDate"
                                type="date"
                                value={workplaceTo.workplaceEstablishDate}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceOpenDate"
                                label="개업일"
                                name="workplaceOpenDate"
                                type="date"
                                value={workplaceTo.workplaceOpenDate}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="closedLabel">폐업여부</InputLabel>
                            <Select
                                labelId="closedLabel"
                                id="isClosed"
                                name="isClosed"
                                open={open}
                                fullWidth
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={onChange}
                                align="center"
                            >
                                <MenuItem value={'Yes'}>Y</MenuItem>
                                <MenuItem value={'No'}>N</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="mainOffice">본사여부</InputLabel>
                            <Select
                                labelId="mainOffice"
                                id="isMainOffice"
                                name="isMainOffice"
                                open={open2}
                                fullWidth
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={onChange}
                                value={workplaceTo.isMainOffice}
                                align="center"
                            >
                                <MenuItem value={'Y'}>Y</MenuItem>
                                <MenuItem value={'N'}>N</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6} style={{ display: displayClosed }}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="workplaceCloseDate"
                                label={closedLable}
                                name="workplaceCloseDate"
                                type="date"
                                value={workplaceTo.workplaceCloseDate}
                                onChange={onChange}
                                disabled={closedDate}
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
                        사업장 등록
                    </Button>
                </form>
            </div>
        </Container>
    );
}
