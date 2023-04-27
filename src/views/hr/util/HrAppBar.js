import React from 'react';
import { Typography, AppBar, Toolbar } from "@material-ui/core";

const HrAppBar = ({title}) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
            <Typography component="h2" variant="h4">
                {title}
            </Typography>
            </Toolbar>
        </AppBar>  
    )
}

export default HrAppBar