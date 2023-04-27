export default [
    {
        title: '물류 정보',
        icon: 'TruckIcon',
        children: [
            {
                title: '기초 정보',
                children: [
                    {
                        title: '회사 정보',
                        route: 'CompanyInfo',
                    },
                    {
                        title: '사업장 정보',
                        route: 'WorkplaceInfo',
                    },
                    {
                        title: '부서 정보',
                        route: 'DeptInfo',
                    },
                    {
                        title: '거래처 정보',
                        route: 'ClientInfo',
                    },
                ],
            },
            {
                title: '코드 관리',
                route: 'codeInfo',
                children: [{
                    title: '코드관리',
                    route: 'CodeSearch',
                }],
            },
            {
                title: '품목 관리',
                route: 'itemInfo',
            },
            {
                title: '창고 관리',
                route: 'warehouseInfo'
            },
        ],
    },
]