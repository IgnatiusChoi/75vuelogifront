//******************************************************08-26 손유찬 **************************************************** */ -->

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import {
  FormLabel,
  Input,
  Button,
  Select,
  Grid,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_DIVISION_CODE_REQUEST,
  EMP_REGISTER_REQUEST,
} from "../../saga/EmpRegisterSaga";
import DaumPostcode from "react-daum-postcode";
import Calendar from "./Calendar";

function autoHypenPhone(str) {
  str = str.replace(/[^0-9]/g, "");
  var tmp = "";
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 3);
    tmp += "-";
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 4);
    tmp += "-";
    tmp += str.substr(7);
    return tmp;
  }
  return str;
}

const EmpRegist = () => {
  const useInput = initValue => {
    const [value, setter] = useState(initValue);
    const handler = e => {
      setter(e.target.value);
    };
    return [value, handler];
  };

  const [id, setId] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordChk, setPasswordChk] = useState("");
  const [name, setName] = useInput("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useInput("");
  const [workplace, setWorkplace] = useState("");
  const [division, setDivision] = useState("");
  const [rank, setRank] = useInput("");
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useInput("");

  let today = moment(new Date()).format('yyyy-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);

  const [gender, setGender] = useInput("");
  const [authorityCode, setAuthorityCode] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const dispatch = useDispatch();
  const workPlace = useSelector(state => state.hr.base.workplace);
  const departmentList = useSelector(state => state.hr.affair.departmentList);
  let data = [];
  console.log(workPlace+ "@@@@workPlace");
  console.log(departmentList+ "@@@@departmentList");
  useEffect(() => {
    dispatch({
      type: SEARCH_DIVISION_CODE_REQUEST,
      workplaceCode: workplace,
    });
  }, [workplace]);

  const handleDateChange = useCallback(
    e => {
      setSelectedDate(e.target.value);
      console.log(selectedDate);
    },
    [selectedDate],
  );

  const onChangePhone = useCallback(e => {
    setPhone(autoHypenPhone(e.target.value));
  }, []);

  const onChangePasswordChk = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordChk(e.target.value);
    },
    [password],
  );

  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordChk) {
      return setPasswordError(true);
    }
    console.log("ID : " + id);
    console.log("PW : " + password);
    console.log("NAME : " + name);
    console.log("PHONE : " + phone);
    console.log("EMAIL : " + email);
    console.log("WORKPLACE : " + workplace);
    console.log("DIVISION : " + division);
    console.log("RANK : " + rank);
    console.log("POSTCODE : " + postcode);
    console.log("ADDRESS : " + address);
    console.log("EXADDRESS : " + extraAddress);
    console.log("HIREDATE : " + selectedDate);
    console.log("GENDER : " + gender);
    console.log("AC : " + authorityCode);
    data = {
      companyCode: "COM-01",
      userPassword: password,
      updateDate: "",
      workplaceCode: workplace,
      deptCode: division,
      positionCode: rank,
      userId: id,
      phoneNumber: phone,
      email: email,
      zipCode: postcode,
      basicAddress: address,
      detailAddress: extraAddress,
      levelOfEducation: "",
      image: "",
      empName: name,
      empEngName: "",
      socialSecurityNumber: "",
      hireDate: selectedDate,
      retirementDate: "",
      userOrNot: "Y",
      birthDate: "",
      gender: gender,
      authorityCode: authorityCode,
      accessCode:'AC0002'
    };

    console.log("온서브밋 이벤트 작동" + Object.keys(data));
    alert("등록되었습니다.")
    dispatch({ type: EMP_REGISTER_REQUEST, data: data });
  };

  //******************************************************08-26 손유찬 **************************************************** */

  const onChangeWorkplace = e => {
    setWorkplace(e.target.value);
  };

  const onChangeDivision = e => {
    setDivision(e.target.value);
  };

  useEffect(() => {
    division === "DPT-01"
      ? setAuthorityCode("SYSTEM")
      : division === "DPT-02"
      ? setAuthorityCode("HR")
      : division === "DPT-05"
      ? setAuthorityCode("HR")
      : setAuthorityCode("LOGI");
  }, [division]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePostData = data => {
    var addr = "";
    var extraAddr = "";
    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      addr = data.roadAddress;
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddr !== "") {
        extraAddr = " (" + extraAddr + ")";
      }
    } else {
      //사용자가 지번 주소를 선택했을 경우
      addr = data.jibunAddress;
    }
    setAddress(addr + " " + extraAddr);
    setPostcode(data.zonecode);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5">사원 등록</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
      >
        <Grid>
          <form onSubmit={onSubmit}>
            <table
              style={{
                textAlign: "center",
                margin: "auto",
                borderSpacing: "20px",
              }}
            >
              <tr>
                <td>
                  <FormLabel htmlFor="workplace">사업장명</FormLabel>
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;
                  <Select
                    name="workplace"
                    onChange={onChangeWorkplace}
                    value={workplace}
                    autoWidth
                  >
                    {workPlace && workPlace.map((v, i) => {
                      return (
                        <MenuItem value={v.workplaceCode} key={i}>
                          {v.workplaceName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </td>
              </tr>

              <tr>
                <td>
                  <FormLabel htmlFor="division">부서명</FormLabel>
                </td>
                <td>
                  <Select
                    name="division"
                    onChange={onChangeDivision}
                    value={division}
                    autoWidth
                  >
                    {departmentList && departmentList.map((v, i) => {
                      return (
                        <MenuItem value={v.deptCode} key={i}>
                          {v.deptName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </td>
              </tr>

              <tr>
                <td>
                  <FormLabel htmlFor="rank">직급</FormLabel>
                </td>
                <td>
                  <Select name="rank" onChange={setRank} value={rank} autoWidth>
                    <MenuItem value="POS-01">사장</MenuItem>
                    <MenuItem value="POS-02">이사</MenuItem>
                    <MenuItem value="POS-03">부장</MenuItem>
                    <MenuItem value="POS-04">차장</MenuItem>
                    <MenuItem value="POS-05">과장</MenuItem>
                    <MenuItem value="POS-06">대리</MenuItem>
                    <MenuItem value="POS-07">사원</MenuItem>
                    <MenuItem value="POS-08">인턴</MenuItem>
                    <MenuItem value="POS-09">계약직</MenuItem>
                  </Select>
                </td>
              </tr>

              <tr>
                <td>
                  <FormLabel htmlFor="name">사원명</FormLabel>
                </td>
                <td>
                  <Input name="name" required value={name} onChange={setName} />
                </td>
              </tr>

              <tr>
                <td>
                  <FormLabel htmlFor="id">아이디</FormLabel>
                </td>
                <td>
                  <Input name="id" required value={id} onChange={setId} />
                </td>
              </tr>

              <tr>
                <td>
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                </td>
                <td>
                  <Input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={setPassword}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel htmlFor="passwordChk">비밀번호확인</FormLabel>
                </td>
                <td>
                  <Input
                    name="passwordChk"
                    type="password"
                    required
                    value={passwordChk}
                    onChange={onChangePasswordChk}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {passwordError && (
                    <div style={{ color: "red" }}>
                      비밀번호가 일치하지 않습니다.
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {" "}
                  <Input
                    type="text"
                    placeholder="우편번호"
                    value={postcode}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    우편번호찾기
                  </Button>{" "}
                  <br />
                  <Input
                    type="text"
                    placeholder="주소"
                    value={address}
                    inputProps={{ style: { textAlign: "center", width: 400 } }}
                  />
                  <br />
                  <Input
                    type="text"
                    placeholder="상세주소"
                    value={extraAddress}
                    onChange={setExtraAddress}
                    required
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel htmlFor="phone">전화번호</FormLabel>
                </td>
                <td>
                  <Input
                    name="phone"
                    value={phone}
                    onChange={onChangePhone}
                    type="tel"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel htmlFor="email">이메일</FormLabel>
                </td>
                <td>
                  <Input
                    name="email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel htmlFor="hiredate">입사일자</FormLabel>
                </td>
                <td>
                  <Calendar callback={handleDateChange} value={selectedDate} />
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel htmlFor="gender">성별</FormLabel>
                </td>
                <td>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={setGender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="여성"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="남성"
                    />
                  </RadioGroup>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Button color="primary" type="submit" variant="contained">
                    등록하기
                  </Button>
                </td>
              </tr>
            </table>
          </form>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>우편번호 검색</DialogTitle>
        <DaumPostcode onComplete={handlePostData} />
      </Dialog>
    </React.Fragment>
  );
};

export default EmpRegist;
