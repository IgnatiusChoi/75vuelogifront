import React from 'react';
import DepartmentManage from './DepartmentManage';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { departmentManagerRequest,departmentManageMemberRequest,updateDepartmentRequest } from "../../saga/DepartmentSaga";

const DepartmentManageContainer = ({
    departmentManagerRequest,
    departmentManageMemberRequest,
    updateDepartmentRequest,
    errorCode,
    errorMsg,
    list}) => {
                                       
    return (
        <div>
            <DepartmentManage
            departmentManagerRequest={departmentManagerRequest}
            departmentManageMemberRequest={departmentManageMemberRequest}
            updateDepartmentRequest={updateDepartmentRequest}
            errorCode={errorCode}
            errorMsg={errorMsg}
            list={list}
            />
        </div>
    );
};

const mapStateToProps=(state) =>{
    console.log(state);
    return{
        errorCode: state.hr.base.department.errorCode,
        errorMsg: state.hr.base.department.errorMsg,
        list: state.hr.base.department.list
        
    };
}

export default connect(mapStateToProps,{
    departmentManagerRequest,
    departmentManageMemberRequest,
    updateDepartmentRequest})(withRouter(DepartmentManageContainer));