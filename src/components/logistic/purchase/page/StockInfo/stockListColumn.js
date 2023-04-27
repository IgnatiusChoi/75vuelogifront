const stockListColumn = {
    columnDefs : [
        { headerName: "창고코드", field: "warehouseCode"  },
        { headerName: "품목코드", field: "itemCode"  },
        { headerName: "품목명", field: "itemName"  },
        { headerName: "단위", field: "unitOfStock"  },
        { headerName: "안전재고량", field: "safetyAllowanceAmount"  },
        { headerName: "재고량", field: "stockAmount"  },
        { headerName: "입고예정재고량", field: "orderAmount"  },
        { headerName: "투입예정재고량", field: "inputAmount"  },
        { headerName: "납품예정재고량", field: "deliveryAmount"  },

    ]
}
export default stockListColumn;
