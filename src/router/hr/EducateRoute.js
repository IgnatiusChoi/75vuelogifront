const ERP = '/hr'
const EducateRoute = [

    {
        path: `${ERP}/termsofEmp`,
        name: 'termsofEmp',
        component: () => import('@/views/hr/educate/termsofEmp'),
        meta: {
            pageTitle: '인력계획',
            breadcrumb: [
                {
                    text: '직원교육 관리',
                },
                {
                    text: '인력계획',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/progress_education_mgmt`,
        name: 'progress_education_mgmt',
        component: () => import('@/views/hr/educate/progress_education_mgmt'),
        meta: {
            pageTitle: '교육훈련진행관리',
            breadcrumb: [
                {
                    text: '직원교육 관리',
                },
                {
                    text: '교육훈련진행관리',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/recruitment_approval`,
        name: 'recruitment_approval',
        component: () => import('@/views/hr/educate/recruitment_approval'),
        meta: {
            pageTitle: '채용승인',
            breadcrumb: [
                {
                    text: '직원교육 관리',
                },
                {
                    text: '채용승인',
                    active: true,
                },
            ],
        },
    },



]

export default EducateRoute;