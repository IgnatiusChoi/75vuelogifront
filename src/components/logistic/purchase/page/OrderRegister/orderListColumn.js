
const orderListColumn = {
    columnDefs : [
        { width: "100", headerCheckboxSelection: true, checkboxSelection: true },
        { width: "500",headerName: "소요량취합번호", field: "mrpGatheringNo"  },
        { headerName: "품목코드", field: "itemCode"  },
        { headerName: "품목명", field: "itemName"  },
        { headerName: "단위", field: "unitOfMrp"  },
        { headerName: "필요수량", field: "requiredAmount"  },
        { headerName: "현재고량", field: "stockAmount"  },
        { headerName: "발주기한", field: "orderDate"  },
        { headerName: "입고기한", field: "requiredDate"  },
    ]
}
export default orderListColumn;