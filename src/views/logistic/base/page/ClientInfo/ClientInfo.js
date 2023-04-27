import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NomalClientInfo from 'erp/logistic/base/page/ClientInfo/NomalClientInfo';
import FinanceClientInfo from 'erp/logistic/base/page/ClientInfo/FinanceClientInfo';

//****************************2020-11-25 박미노****************************************** */

function ClientInfo() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper
        }
    }));
    const classes = useStyles();

    console.log(value);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="일반 거래처" />
                    <Tab label="금융 거래처" />
                </Tabs>
            </AppBar>
            {value === 0 && <NomalClientInfo />}
            {value === 1 && <FinanceClientInfo />}
        </div>
    );
}

export default ClientInfo;
