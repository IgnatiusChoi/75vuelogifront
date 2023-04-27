import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import MyDialog from 'util/LogiUtil/MyDialog';
import CodeItemInfo from './CodeItemInfo';

function SelectItemInfo(props) {
    const [openDialog, setOpenDialog] = useState(false);
    const close = () => {
        setOpenDialog(false);
    };

    const searchClick = () => {
        setOpenDialog(true);
    };

    const list = getList => {
        props.getList(getList);
    };

    const detailCode = getDetailCode => {
        props.getDetailCode(getDetailCode);
    };

    const divisionCodeNo = getDivisionCode => {
        props.getDivisionCode(getDivisionCode);
    };

    return (
        <div>
            <TextField
                style={{ marginRight: '1vh' }}
                placeholder="품목구분 선택"
                onClick={searchClick}
                InputProps={{ readOnly: true }}
            >
                {' '}
            </TextField>
            <MyDialog open={openDialog} close={close}>
                <div>
                    <CodeItemInfo
                        list={list}
                        close={close}
                        detailCode={detailCode}
                        divisionCodeNo={divisionCodeNo}
                    />
                </div>
            </MyDialog>
        </div>
    );
}

export default SelectItemInfo;
