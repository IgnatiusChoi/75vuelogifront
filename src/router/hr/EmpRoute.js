const ERP = '/hr'
const EmpRoute = [

    {
        path: `${ERP}/empEval`,
        name: 'empEval',
        component: () => import('@/views/hr/emp/empEval'),
        meta: {
            pageTitle: '인사고과등록',
            breadcrumb: [
                {
                    text: '인사고과 관리',
                },
                {
                    text: '인사고과등록',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/empEvalDetail`,
        name: 'empEvalDetail',
        component: () => import('@/views/hr/emp/empEvalDetail'),
        meta: {
            pageTitle: '인사고과결과조회',
            breadcrumb: [
                {
                    text: '인사고과 관리',
                },
                {
                    text: '인사고과결과조회',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/empAppoint`,
        name: 'empAppoint',
        component: () => import('@/views/hr/emp/empAppoint'),
        meta: {
            pageTitle: '인사발령등록',
            breadcrumb: [
                {
                    text: '인사고과 관리',
                },
                {
                    text: '인사발령등록',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/empAppointManage`,
        name: 'empAppointManage',
        component: () => import('@/views/hr/emp/empAppointManage'),
        meta: {
            pageTitle: '인사발령관리',
            breadcrumb: [
                {
                    text: '인사고과 관리',
                },
                {
                    text: '인사발령관리',
                    active: true,
                },
            ],
        },
    },

]

export default EmpRoute;
