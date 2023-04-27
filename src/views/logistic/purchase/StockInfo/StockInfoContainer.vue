<template>
  <div>
    <div style="float: right; display: inline-flex">
      <label for="example-input1">입고날짜</label>
      <b-input-group
          class="mb-1"
          style="width: 200px"
      >
        <b-form-input
            id="example-input1"
            v-model="startDate"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            show-decade-nav
        />
        <b-input-group-append>
          <b-form-datepicker
              v-model="startDate"
              show-decade-nav
              button-only
              right
              locale="en-US"
              aria-controls="example-input1"
              @context="onContext"
          />
        </b-input-group-append>
      </b-input-group>

      <b-button
          variant="primary"
      >
        입고
      </b-button>
    </div>

    <b-table
        :items="stockList"
        :fields="tableColumns"
        selectable
        show-empty
        empty-text="No matching records found"
        style="min-width: 100%; width: 1230px"
    />
  </div>
</template>

<script>
import {BButton, BTable, BFormDatepicker, BInputGroup, BInputGroupAppend, BFormInput} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'StockInfo',
  components: {
    BTable,
    BButton,
    BFormInput,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
  },
  computed: {
    ...mapState({
      stockList: state => state.logi.stock.stockList,
    }),
    /*...mapState('logi/stock', ['stockList']),*/
  },
  data() {
    return {
      startDate: '0000-00-0',
      tableColumns: [
        {key: 'warehouseCode', label: '창고코드', sortable: 'true',},
        {key: 'itemCode', label: '품목코드',},
        {key: 'itemName', label: '품목명',},
        {key: 'unitOfStock', label: '단위',},
        {key: 'safetyAllowanceAmount', label: '안전재고량',},
        {key: 'stockAmount', label: '재고량',},
        {key: 'orderAmount', label: '입고예정재고량',},
        {key: 'inputAmount', label: '투입예정재고량',},
        {key: 'deliveryAmount', label: '납품예정재고량',},
      ],
    }
  },
  methods: {
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no - date - selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    },
  },
  created() {
  },
  mounted() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    this.startDate = `${year}-${month}-01`
    console.log("mounted 실행")
    this.$store.dispatch('logi/stock/SEARCH_STOCK_LIST')
  },
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>