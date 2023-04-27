const showOrderColumn = {
    columnDefs : [
        { headerName: "품목코드", field: "itemCode"  },
        { headerName: "품목명", field: "itemName"  },
        { headerName: "단위", field: "unitOfMrp"  },
        { headerName: "총발주필요량", field: "requiredAmount"  },
        { headerName: "사용가능재고량", field: "stockAmount"  },
        { headerName: "실제발주필요량", field: "calculatedRequiredAmount"  },
        { headerName: "단가", field: "standardUnitPrice"  },
        { headerName: "합계금액", field: "sumPrice"  }
    ]
}
export default showOrderColumn;


