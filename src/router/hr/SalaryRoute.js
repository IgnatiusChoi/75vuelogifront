const ERP = '/hr'
const SalaryRoute = [

    {
        path: `${ERP}/monthSalary`,
        name: 'monthSalary',
        component: () => import('@/views/hr/salary/monthSalary'),
        meta: {
            pageTitle: '급여조회',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '급여조회',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/salaryAwards`,
        name: 'salaryAwards',
        component: () => import('@/views/hr/salary/salaryAwards'),
        meta: {
            pageTitle: '상여 및 성과급 조회',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '상여 및 성과급 조회',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/salaryAwardManage`,
        name: 'salaryAwardManage',
        component: () => import('@/views/hr/salary/salaryAwardManage'),
        meta: {
            pageTitle: '성과급등록',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '성과급등록',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/severancePay`,
        name: 'severancePay',
        component: () => import('@/views/hr/salary/severancePay'),
        meta: {
            pageTitle: '퇴직금 조회',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '퇴직금 조회',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/baseSalaryManage`,
        name: 'baseSalaryManage',
        component: () => import('@/views/hr/salary/baseSalaryManage'),
        meta: {
            pageTitle: '급여기준관리',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '급여기준관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/baseExtSalManage`,
        name: 'baseExtSalManage',
        component: () => import('@/views/hr/salary/baseExtSalManage'),
        meta: {
            pageTitle: '초과수당관리',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '초과수당관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/socialInsure`,
        name: 'socialInsure',
        component: () => import('@/views/hr/salary/socialInsure'),
        meta: {
            pageTitle: '사회보험관리',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '사회보험관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/settlementManage`,
        name: 'settlementManage',
        component: () => import('@/views/hr/salary/settlementManage'),
        meta: {
            pageTitle: '연말정산관리',
            breadcrumb: [
                {
                    text: '급여관리',
                },
                {
                    text: '연말정산관리',
                    active: true,
                },
            ],
        },
    },


]

export default SalaryRoute;
