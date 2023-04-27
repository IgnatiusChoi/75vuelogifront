export default [
    {
        title: '자재구매 관리',
        icon: 'BoxIcon',
        children: [
            {
                title: '자재명세서(BOM)',
                route: 'logisticsBOM',
            },
            {
                title: '발주 및 재고처리',
                route: 'orderRegister',
            },
            {
                title: '재고 관리',
                route: 'stockInfo'
            },
        ],
    },
]