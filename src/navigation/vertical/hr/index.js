export default [
    {
        title: 'insaHome',
        route: 'hrHome',
        icon: 'HomeIcon',
    },
    {
        title: '인사관리',
        icon: 'UsersIcon',
        children: [
            {
                title: '직원정보 관리',
                icon: 'UserPlusIcon',
                children: [
                    {
                        title: '직원목록조회',
                        route: 'emp-page',
                    },
                    {
                        title: '직원상세조회',
                        route: 'emp-detail'
                    },
                    {
                        title: '직원관리',
                        route: 'emp-editor'
                    },
                    {
                        title: '직원등록',
                        route: 'emp-register'
                    }
                ]
            },
            {
                title: '인사고과 관리',
                icon: 'UserCheckIcon',
                children: [
                    {
                        title: '인사고과등록',
                        route: 'empEval',
                    },
                    {
                        title: '인사고과결과조회',
                        route: 'empEvalDetail'
                    },
                    {
                        title: '인사발령등록',
                        route: 'empAppoint'
                    },
                    {
                        title: '인사발령관리',
                        route: 'empAppointManage'

                    }
                ]
            },
            {
                title: '직원교육 관리',
                icon: 'EditIcon',
                children: [
                    {
                        title: '인력계획',
                        route: 'termsofEmp',
                    },
                    {
                        title: '교육훈련진행관리',
                        route: 'progress_education_mgmt'
                    },
                    {
                        title: '채용승인',
                        route: 'recruitment_approval'
                    },
                ]
            },
            {
                title: '인적자원정보 관리',
                icon: 'EditIcon',
                children: [
                    {
                        title: '이력서 조회',
                        route: 'resumemgmt',
                    },
                    {
                        title: '인성검사 / 면접결과',
                        route: 'personality_interview'
                    },
                    {
                        title: '선발결정',
                        route: 'success_applicant'
                    },
                ]
            },
            {
                title: '인사기초정보 관리',
                icon: 'EditIcon',
                children: [
                    {
                        title: '휴일정보관리',
                        route: 'holidayManage',
                    },
                    {
                        title: '부서정보관리',
                        route: 'deptManage'
                    },
                    {
                        title: '직급정보관리',
                        route: 'positionManage'
                    },
                    {
                        title: '기준근무시간관리',
                        route: 'baseWorkTimeManage'
                    },
                    {
                        title: '권한관리',
                        route: 'authManage'
                    },
                    {
                        title: '코드조회',
                        route: 'codeManage'
                    },
                ]
            },
            {
                title: '근태 관리',
                icon: 'EditIcon',
                children: [
                    {
                        title: '일근태등록',
                        route: 'dailyAttnd',
                    },
                    {
                        title: '근태 외 신청',
                        route: 'attndApproval'
                    },
                    {
                        title: '연차신청',
                        route: 'break'
                    },
                    {
                        title: '출장 / 교육신청',
                        route: 'travel'
                    },
                    {
                        title: '초과근무신청',
                        route: 'overwork'
                    },
                    {
                        title: '일근태관리',
                        route: 'dailyAttndMgmt'
                    },
                    {
                        title: '월근태관리',
                        route: 'monthAttndMgmt'
                    },
                    {
                        title: '근태 외 승인관리',
                        route: 'attndApprovalMgmt'
                    },
                    {
                        title: '연차관리',
                        route: 'breakMgmt'
                    },
                ]
            },
        ],
    },
    {
        title: '급여관리',
        icon: 'DollarSignIcon',
        children: [
            {
                title: '급여조회',
                icon: 'DollarSignIcon',
                route: 'monthSalary'
            },
            {
                title: '상여 및 성과급 조회',
                icon: 'DollarSignIcon',
                route: 'salaryAwards'
            },
            {
                title: '성과급등록',
                icon: 'DollarSignIcon',
                route: 'salaryAwardManage'
            },
            {
                title: '퇴직금 조회',
                icon: 'DollarSignIcon',
                route: 'severancePay'
            },
            {
                title: '급여기준관리',
                icon: 'DollarSignIcon',
                route: 'baseSalaryManage'
            },
            {
                title: '초과수당관리',
                icon: 'DollarSignIcon',
                route: 'baseExtSalManage'
            },
            {
                title: '사회보험관리',
                icon: 'DollarSignIcon',
                route: 'socialInsure'
            },
            {
                title: '연말정산관리',
                icon: 'DollarSignIcon',
                route: 'settlementManage'
            },

        ]
    }
]
