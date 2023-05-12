<template>
  <div>
    <DeptGrid
        title="부서 정보"
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
import DeptGrid from "@/components/logistic/base/page/DeptInfo/DeptGrid.vue"

export default {
  components: {
      DeptGrid,
      BFormSelect, BFormInput, BCol, BFormInvalidFeedback,
      CommonModal,
      BButton,
    BTable,
  },

  data() {
    return {
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
