import React from "react";
import EmploymentManageLog from "./EmploymentManageLog";
import { connect } from "react-redux";
import { searchEmploymentManageList,updateEmploymentManageList} from "erp/hr/affair/saga/EmploymentManageSaga";
import { withRouter } from "react-router-dom";


const EmploymentManageContainer = (props) => {
  const { flag, EmploymentManageList, searchEmploymentManageList, 
    errorCode, errorMsg, updateEmploymentManageList } = props;

  const update = (checkData,deptName,fromDate,toDate) => { 
    updateEmploymentManageList({ data: checkData, deptName: deptName, startDate: fromDate, endDate: toDate });;
  };

  return (
    <div>
      <EmploymentManageLog
        searchEmploymentManageList={searchEmploymentManageList}
        EmploymentManageList={EmploymentManageList}        //
        errorCode={errorCode}
        errorMsg={errorMsg}
        update={update}
        flag={flag}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    errorCode: state.hr.affair.errorCode,
    errorMsg: state.hr.affair.errorMsg,
    EmploymentManageList: state.hr.affair.EmploymentManageList,
    flag: state.hr.affair.flag
  };
};

export default connect(mapStateToProps, { searchEmploymentManageList,updateEmploymentManageList})(
  withRouter(EmploymentManageContainer)
);

