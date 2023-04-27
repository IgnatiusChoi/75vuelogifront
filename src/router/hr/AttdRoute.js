const ERP = '/hr'
const AttdRoute = [

    {
        path: `${ERP}/dailyAttnd`,
        name: 'dailyAttnd',
        component: () => import('@/views/hr/attendance/dailyAttnd'),
        meta: {
            pageTitle: '일근태등록',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '일근태등록',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/attndApproval`,
        name: 'attndApproval',
        component: () => import('@/views/hr/attendance/attndApproval'),
        meta: {
            pageTitle: '근태 외 신청',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '근태 외 신청',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/break`,
        name: 'break',
        component: () => import('@/views/hr/attendance/break'),
        meta: {
            pageTitle: '연차신청',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '연차 신청',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/travel`,
        name: 'travel',
        component: () => import('@/views/hr/attendance/travel'),
        meta: {
            pageTitle: '출장 / 교육신청',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '출장 / 교육신청',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/overwork`,
        name: 'overwork',
        component: () => import('@/views/hr/attendance/overwork'),
        meta: {
            pageTitle: '초과근무신청',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '초과근무신청',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/dailyAttndMgmt`,
        name: 'dailyAttndMgmt',
        component: () => import('@/views/hr/attendance/dailyAttndMgmt'),
        meta: {
            pageTitle: '일근태관리',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '일근태관리',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/monthAttndMgmt`,
        name: 'monthAttndMgmt',
        component: () => import('@/views/hr/attendance/monthAttndMgmt'),
        meta: {
            pageTitle: '월근태관리',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '월근태관리',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/attndApprovalMgmt`,
        name: 'attndApprovalMgmt',
        component: () => import('@/views/hr/attendance/attndApprovalMgmt'),
        meta: {
            pageTitle: '근태 외 승인관리',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '근태 외 승인관리',
                    active: true,
                }
            ],
        },
    },
    {
        path: `${ERP}/breakMgmt`,
        name: 'breakMgmt',
        component: () => import('@/views/hr/attendance/breakMgmt'),
        meta: {
            pageTitle: '연차관리',
            breadcrumb: [
                {
                    text: '근태 관리',
                },
                {
                    text: '연차관리',
                    active: true,
                }
            ],
        },
    },

]

export default AttdRoute;
