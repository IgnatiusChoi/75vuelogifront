import React from 'react';
import { MenuItem, Select } from "@material-ui/core";
const MySelect = ({ selectValue, selectLabel, selectonChange, menuItemMap, selectName }) => {

    const menuItemList = menuItemMap.map(
        (o) => {
            return <MenuItem value={o.value}>{o.key}</MenuItem>
        }
    )



    return (
        <>
            <Select
                name={selectName}
                value={selectValue}
                onChange={selectonChange}
                label={selectLabel}
            >
                {menuItemList}
            </Select>
        </>
    )
}

export default MySelect;