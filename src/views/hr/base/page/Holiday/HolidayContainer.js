import React from 'react'
import HolidayManageComponent from './HolidayManageComponent';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { holidayListRequest,updateHolidayRequest } from "../../saga/HolidaySaga";
const HolidayContainer = ({errorCode,errorMsg,holidayList,holidayListRequest,updateHolidayRequest}) => {
    return (
        <>
        <HolidayManageComponent
        holidayListRequest={holidayListRequest}
        updateHolidayRequest={updateHolidayRequest}
        holidayList={holidayList}  
        errorCode={errorCode}
        errorMsg={errorMsg}
        />
        </>
    )
};


const mapStateToProps=(state) =>{
    return{
        errorCode: state.hr.base.holiday.errorCode,
        errorMsg: state.hr.base.holiday.errorMsg,
        holidayList: state.hr.base.holiday.holidayList
    };
}


export default connect(mapStateToProps,{holidayListRequest,updateHolidayRequest})(withRouter(HolidayContainer));