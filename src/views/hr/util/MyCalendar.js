import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import moment from "moment";

function MyCalendar({onChangeDate,label}) {
    let today = moment(new Date()).format("yyyy-MM-DD");
    const [calendarDate,setCalendartDate] = useState(today);
    const onChange = (e) => {
        setCalendartDate(e.target.value)
      if(onChangeDate !==  undefined ){
          onChangeDate(e)
      }
    }
    return (
        <>
            <TextField
                id="calendar"
                label={label}
                type={"date"}
                value={calendarDate}
                onChange={onChange}
                style={{marginRight:'1vw'}}
            />
        </>
    );
}

export default MyCalendar;