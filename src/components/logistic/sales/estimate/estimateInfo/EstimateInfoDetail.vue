<template>
  <b-table
    style="max-height: 300px; overflow: auto; width: 100%"
    responsive
    :items="estimateDetailList"
    :fields="fields"
    class="mb-0 scrollStyle"
  />
</template>

<script>
import { BTable } from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  components: {
    BTable,
  },
  computed: {
    ...mapState('logi/sales', ['estimateDetailList']),
  },
  data() {
    return {
      fields: [
        {
          key: 'estimateDetailNo',
          label: '견적상세일련번호',
        },
        {
          key: 'itemCode',
          label: '품목코드',
        },
        {
          key: 'itemName',
          label: '품목명',
        },
        {
          key: 'unitOfEstimate',
          label: '단위',
        },
        {
          key: 'dueDateOfEstimate',
          label: '납기일',
          cellEditor: 'datePicker',
        },
        {
          key: 'estimateAmount',
          label: '견적수량',
        },
        {
          key: 'unitPriceOfEstimate',
          label: '견적단가',
        },
        {
          key: 'sumPriceOfEstimate',
          label: '합계액',
        },
        {
          key: 'description',
          label: '비고',
        },
        {
          key: 'estimateNo',
          label: '견적일련번호',
        },
      ],
    }
  },
}
</script>
