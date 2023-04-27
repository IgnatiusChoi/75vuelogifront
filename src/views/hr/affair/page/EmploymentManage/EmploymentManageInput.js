const EmploymentManageInput = [
    {
      headerName: "부서",
      field: "deptName",
      width : 140,
      sortable: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {
      headerName: "사원번호",
      field: "empCode",
      width : 120
    },
    {
      headerName: "사원이름",
      field: "empName",
      width : 130
    },
    {
      headerName: "용도",
      field: "usageName",
      width : 130
    },
    {
      headerName: "신청일",
      field: "requestDate",
      width : 130
    },
    {
      headerName: "사용일",
      field: "useDate",
      width : 100
    },
    {
      headerName: "승인여부",
      field: "approvalStatus",
      width : 130
    },
    {
      headerName: "반려사유",
      field: "rejectCause",
      editable: true,
      width : 130
    },
    {
      headerName: "비고",
      field: "etc",
      width : 80
    },
    {
        headerName : "상태",
        field : "status",
        hide : true
    }
  ];

export default EmploymentManageInput;