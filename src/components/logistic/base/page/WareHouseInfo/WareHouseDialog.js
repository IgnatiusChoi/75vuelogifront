import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@material-ui/core";

const warehousedialog = (props) => {
    const open = props.open;
    // const title = () => {
    //     if (props.title !== undefined) {
    //         return <DialogTitle align="center">{props.title}</DialogTitle>
    //     }
    //     return;
    // }
    const close = () => {
        props.close();
    }
    return (
        <div>
            <Dialog aria-labelledby="alert-dialog-slide-title" open={open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle align="center">창고등록</DialogTitle>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="secondary">
                        Close
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default warehousedialog;