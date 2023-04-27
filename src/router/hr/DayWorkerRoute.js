const ERP = '/hr'
const DayWorkerRoute = [

    {
        path: `${ERP}/holidayManage`,
        name: 'holidayManage',
        component: () => import('@/views/hr/dayworker/holidayManage'),
        meta: {
            pageTitle: '휴일정보관리',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '휴일정보관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/deptManage`,
        name: 'deptManage',
        component: () => import('@/views/hr/dayworker/deptManage'),
        meta: {
            pageTitle: '부서정보관리',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '부서정보관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/positionManage`,
        name: 'positionManage',
        component: () => import('@/views/hr/dayworker/positionManage'),
        meta: {
            pageTitle: '직급정보관리',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '직급정보관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/baseWorkTimeManage`,
        name: 'baseWorkTimeManage',
        component: () => import('@/views/hr/dayworker/baseWorkTimeManage'),
        meta: {
            pageTitle: '기준근무시간관리',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '기준근무시간관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/authManage`,
        name: 'authManage',
        component: () => import('@/views/hr/dayworker/authManage'),
        meta: {
            pageTitle: '권한관리',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '권한관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/codeManage`,
        name: 'codeManage',
        component: () => import('@/views/hr/dayworker/codeManage'),
        meta: {
            pageTitle: '코드조회',
            breadcrumb: [
                {
                    text: '인사기초정보 관리',
                },
                {
                    text: '코드조회',
                    active: true,
                },
            ],
        },
    },




]

export default DayWorkerRoute;
