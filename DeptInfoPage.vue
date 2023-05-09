<template>
    <div>
        <h1>부서 정보</h1>
        <b-button
                variant="primary"
                size="md"
                class="mb-md-1"
                @click="addNewDept"
        >
            수정
        </b-button>

        &nbsp

        <b-button
                variant="primary"
                size="md"
                class="mb-md-1"
        >
            추가
        </b-button>
        <b-table
                style="max-height: 300px; overflow: auto; width: 100%;"
                responsive
                :items="DeptInfo"
                :fields="fields"
                class="mb-0 scrollStyle"
        />
    </div>
</template>

<script>
import {BButton, BCol, BFormInput, BFormInvalidFeedback, BFormSelect, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import CommonModal from "@/components/common/modal/CommonModal"

export default {
    components: {
        BFormSelect, BFormInput, BCol, BFormInvalidFeedback,
        CommonModal,
        BButton,
        BTable,
    },
    computed: {

        ...mapState('logi/base', ['deptList','DeptInfo']),

    },

    created() {
        this.FETCH_ALL_DepartmentCode()
    },

    methods: {
        // 액션을 가져옴
        ...mapActions('logi/base', ['FETCH_ALL_DepartmentCode']),
        // 검색
        closeModal(){
            this.modal = false
        },
    },

    data() {
        return {
            modal: false,
            fields: [
                {
                    key: 'workplaceCode',
                    label: '사업장코드',
                },
                {
                    key: 'deptCode',
                    label: '부서코드',
                },
                {
                    key: 'deptName',
                    label: '부서명',
                },
                {
                    key: 'deptName',
                    label: '사업장명',
                },
                {
                    key: 'companyCode',
                    label: '회사코드',
                },
                {
                    key: 'deptStartDate',
                    label: '부서신설일',
                },
                {
                    key: 'deptEndDate',
                    label: '부서해체일',
                },
            ],
        }
    },
}

</script>
