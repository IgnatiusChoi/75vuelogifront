<template>
  <div>
    <EstimateRegist>
      <template v-slot:header>
        <h2
          class="mb-md-1"
          style="width: 50px"
        >
          견적
        </h2>
        <b-input-group
          class="mb-md-1"
          style="width: 170px; margin: 0 10px 0 10px;"
        >
          <b-form-input
            v-model="startDate"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            show-decade-nav
          />
          <b-input-group-append style="height: 37px;">
            <b-form-datepicker
              v-model="startDate"
              show-decade-nav
              button-only
              button-variant="outline-primary"
              right
              size="sm"
              locale="en-US"
              aria-controls="example-input"
            />
          </b-input-group-append>
        </b-input-group>

        <h2 style="color:#7367f0">
          ~
        </h2>

        <b-input-group
          class="mb-md-1"
          style="width: 170px; margin: 0 10px 0 10px;"
        >
          <b-form-input
            v-model="endDate"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            show-decade-nav
          />
          <b-input-group-append style="height: 37px;">
            <b-form-datepicker
              v-model="endDate"
              show-decade-nav
              button-only
              button-variant="outline-primary"
              right
              size="sm"
              locale="en-US"
              aria-controls="example-input"
            />
          </b-input-group-append>
        </b-input-group>
        <b-button
          variant="primary"
          size="md"
          class="mb-md-1"
          @click="searchEstimate"
        >
          검색
        </b-button>

      </template>
    </EstimateRegist>
    <EstimateRegistDetail>
      <template v-slot:header>
        <h2>견적상세</h2>
      </template>
    </EstimateRegistDetail>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import EstimateRegist from '@/components/logistic/sales/estimate/estimateRegist/EstimateRegist.vue'
import EstimateRegistDetail from '@/components/logistic/sales/estimate/estimateRegist/EstimateRegistDetail.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormRadioGroup,
    BCardText,

    EstimateRegist,
    EstimateRegistDetail,
  },
  computed: {
    ...mapState({
      grid: state => state.logi.sales.grid,
      // companyInfo: state => state.auth.companyInfo,
      customerCodeList: state => state.hr.company.companyCodeList,
    }),
  },
  data: () => ({
    startDate: '0000-00-0',
    endDate: '0000-00-0',
  }),
  mounted() {
    // eslint-disable-next-line new-cap
    const tableColumns = [{
      tableColumns: [
        {
          key: 'customerName', label: '거래처명', sortable: true,
        },
        {
          key: 'estimateDate', label: '견적일자', sortable: true,
        },
        { key: 'effectiveDate', label: '유효일자', sortable: true },
        { key: 'personCodeInCharge', label: '견적담당자', sortable: true },
        { key: 'estimateRequester', label: '견적요청자', sortable: true },
        { key: 'description', label: '비고', sortable: true },
      ],
      detailTableColumns: [
        { key: 'itemCode', label: '품목코드', sortable: true },
        { key: 'itemName', label: '품목명', sortable: true },
        { key: 'unitOfEstimate', label: '단위', sortable: true },
        { key: 'dueDateOfEstimate', label: '납기일', sortable: true },
        { key: 'estimateAmount', label: '견적수량', sortable: true },
        { key: 'unitPriceOfEstimate', label: '견적단가', sortable: true },
        { key: 'sumPriceOfEstimate', label: '합계액', sortable: true },
        { key: 'description', label: '비고', sortable: true },
      ],
    },
    ]
    this.$store.dispatch('logi/sales/setTable', tableColumns)

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const lastday = new Date(year, month, 0).getDate()
    this.startDate = `${year}-${month}-01`
    this.endDate = `${year}-${month}-${lastday}`
    const sendDate = { startDate: this.startDate, endDate: this.endDate }
    /* 수주등록가능한 견적 조회 */
    // this.$store.dispatch('logi/sales/searchEstimateInContractAvailable', sendDate)
  },
  methods: {
    searchEstimate() {
      const sendDate = { startDate: this.startDate, endDate: this.endDate }
      this.$store.dispatch('logi/sales/searchEstimateInContractAvailable', sendDate)
      console.log()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.scrollStyle::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: rgba(50,60,150,1);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
}

.scrollStyle::-webkit-scrollbar
{
  width: 10px;
  background-color: rgba(50,50,150,0);
}

.scrollStyle::-webkit-scrollbar-thumb
{
  background-clip: padding-box;
  border: 4px solid transparent;
  border-radius: 10px;
  /*    background-image: -webkit-gradient(linear,
  left bottom,
  left top,
  color-stop(0.44, rgb(122,153,217)),
  color-stop(0.72, rgb(73,125,189)),
  color-stop(0.86, rgb(28,58,148)));*/
  background-color: #7367f0;
}
</style>
