<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">

    </div>

    <SearchSalesplan/>
    <b-table
        style="max-height: 300px; overflow: auto; width: 100%;"
        responsive
        :items="salesplan"
        :fields="fields"
        @row-clicked ="selectRow"
        class="mb-0 scrollStyle"
    />
  </div>


</template>

<script>
import { BTable } from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import SearchSalesplan from "@/components/logistic/sales/Salesplaninfo/SearchSalesplan.vue";
export default {
  components: {
    BTable,
    SearchSalesplan,
  },
  computed: {
    ...mapState('logi/sales', ['salesplan']),

  },

  created() {
    this.FETCH_ALL_SalesPlane()

  },

  methods: {
    // 액션을 가져옴
    ...mapActions('logi/sales', ['FETCH_ALL_SalesPlane']),
    // 검색
    selectRow(fields){
      console.log("??",fields)

    }
  },

  data() {
    return {
      fields: [
        {
          key: 'salesPlanNo',
          label: '판매계획일련번호',
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
          key: 'unitOfSales',
          label: '단위',
        },
        {
          key: 'salesPlanDate',
          label: '판매계획일',
        },
        {
          key: 'dueDateOfSales',
          label: '계획마감일',
        },
        {
          key: 'salesAmount',
          label: '계획수량',
        },
        {
          key: 'unitPriceOfSales',
          label: '계획단가',
        },
        {
          key: 'sumPriceOfSales',
          label: '합계액',
        },
        {
          key: 'mpsApplyStatus',
          label: 'MPS적용상태'
        },
        {
          key: 'description',
          label: '설명',
        },
      ],
    }
  },
}

</script>
