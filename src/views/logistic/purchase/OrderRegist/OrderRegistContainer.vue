<template>
  <div>
    <div style="float: right; display: inline-flex">
      <label for="example-input1">시작일</label>
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

      <label for="example-input1">종료일</label>
      <b-input-group
          class="mb-1"
          style="width: 200px"
      >
        <b-form-input
            id="example-input1"
            v-model="endDate"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            show-decade-nav
        />
        <b-input-group-append>
          <b-form-datepicker
              v-model="endDate"
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
          style="float: left; display: inline-flex"
          @click="clickOrderList"
      >
        재고처리/발주필요 목록조회
      </b-button>
    </div>
    <div>

      <b-button
          variant="primary"
          style="float: left; display: inline-flex"
      >
        모의재고처리 및 취합발주
      </b-button>
      <b-button
          variant="primary"
          style="float: left; display: inline-flex"
      >
        임의발주
      </b-button>

      <b-table
          :items="orderList"
          :fields="tableColumns"
          selectable
          show-empty
          empty-text="No matching records found"
          style="min-width: 100%; width: 1230px"
      />
    </div>
  </div>
</template>

<script>
import {BButton, BTable, BFormDatepicker, BInputGroup, BInputGroupAppend, BFormInput} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'OrderInfo',
  components: {
    BTable,
    BButton,
    BFormInput,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
  },
  computed: {
    ...mapState({ //추가#####
      orderList: state => state.logi.order.orderList,
    }),
  },
  data() {
    return {
      startDate: '0000-00-0',
      endDate:'0000-00-0',
      tableColumns: [
        {key: 'mrpGatheringNo', label: '소요량취합번호', sortable: 'true',},
        {key: 'itemClassification', label: '품목분류',},
        {key: 'itemCode', label: '품목코드',},
        {key: 'itemName', label: '품목명',},
        {key: 'unitOfMrp', label: '단위',},
        {key: 'inputAmount', label: '투입예정재고량',},
        {key: 'requiredAmount', label: '재고소요/제품제작수량',},
        {key: 'stockAfterWork', label: '재고량(재고소요이후)',},
        {key: 'orderDate', label: '작업지시기한',},
        {key: 'requiredDate', label: '작업완료기한',},
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
    clickOrderList(){
      const payload = { //추가#####
        startDate: this.$data.startDate,
        endDate: this.$data.endDate,
      }
      this.$store.dispatch('logi/order/SEARCH_ORDER_LIST', payload)
    }
  },
  created() {
  },
  mounted() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const lastday = new Date(year, month, 0).getDate()
    this.startDate = `${year}-${month}-01`
    this.endDate = `${year}-${month}-${lastday}`

  },
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>