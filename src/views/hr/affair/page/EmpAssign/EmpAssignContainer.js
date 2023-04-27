import React from 'react';
import EmploymentAssign from './EmpAssign';
import { connect } from 'react-redux';
import { searchEmpAssignList } from '../../saga/AssignSaga';

function EmpAssignContainer({ searchEmpAssignList, assignData }) {
    const searchAssign = (fromDate, toDate) => {
        searchEmpAssignList({ fromDate, toDate });
    };

    return (
        <div>
            <EmploymentAssign searchAssign={searchAssign} assignData={assignData} />
        </div>
    );
}

export default connect(state => ({ assignData: state.hr.affair.assignData }), {
    searchEmpAssignList
})(EmpAssignContainer);
