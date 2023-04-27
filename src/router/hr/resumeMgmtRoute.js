const ERP = '/hr'
const resumeMgmtRoute = [

    {
        path: `${ERP}/resumemgmt`,
        name: 'resumemgmt',
        component: () => import('@/views/hr/resumeMgmt/resumemgmt'),
        meta: {
            pageTitle: '이력서 조회',
            breadcrumb: [
                {
                    text: '인적자원정보 관리',
                },
                {
                    text: '이력서 조회',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/personality_interview`,
        name: 'personality_interview',
        component: () => import('@/views/hr/resumeMgmt/personality_interview'),
        meta: {
            pageTitle: '인성검사 / 면접결과',
            breadcrumb: [
                {
                    text: '인적자원정보 관리',
                },
                {
                    text: '인성검사 / 면접결과',
                    active: true,
                },
            ],
        },
    },
    {
        path: `${ERP}/success_applicant`,
        name: 'success_applicant',
        component: () => import('@/views/hr/resumeMgmt/success_applicant'),
        meta: {
            pageTitle: '선발결정',
            breadcrumb: [
                {
                    text: '인적자원정보 관리',
                },
                {
                    text: '선발결정',
                    active: true,
                },
            ],
        },
    },



]

export default resumeMgmtRoute;
