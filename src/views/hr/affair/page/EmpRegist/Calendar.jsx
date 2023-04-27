import TextField from "@material-ui/core/TextField";
import React from "react";
//@material-ui 설치 안되어 있으면 터이널에   yarn add @material-ui/core  하여 다운로드
//달력 위치는 App.css 안의 .Calendar안에서 위치 조정 가능 함

const Calendar = ({ callback }) => {
  let now = new Date(); //오늘 날짜 만들기
  let year = now.getFullYear();
  let month = leadingZeros(now.getMonth() + 1, 2);
  let date = leadingZeros(now.getDate(), 2);
  let today = year + "-" + month + "-" + date;

  function leadingZeros(n, digits) {
    //숫자앞에 0붙여주는 함수
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  }

  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        name="startDate"
        type={"date"}
        defaultValue={today} //defaultValue : 초기값.
        onChange={callback}
        size="small"
      />
    </React.Fragment>
  );
};
export default Calendar;
