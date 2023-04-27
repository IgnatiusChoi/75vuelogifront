const orderListColumn = {
    columnDefs : [
        { width: "100", headerCheckboxSelection: true, checkboxSelection: true },
        { headerName: "발주일련번호", field: "orderNo"  },
        { headerName: "발주일자", field: "orderDate"  },
        { headerName: "발주상태", field: "orderInfoStatus"  },
        { headerName: "발주구분", field: "orderSort"  },
        { headerName: "품목코드", field: "itemCode"  },
        { headerName: "품목명", field: "itemName"  },
        { headerName: "주문량", field: "orderAmount"  },
        { headerName: "결재승인여부", field: "orderSlipStatus"  },
        { headerName: "원재료검사", field: "inspectionStatus"  },
    ]
}
export default orderListColumn;



