<template>
  <div>
    <contract-info-grid>
      <template v-slot:header>
        <h2
            class="mb-md-1"
            style="width: 50px"
        >
          수주
        </h2>
      </template>
      <template v-slot:searchDate>
        <b-input-group
            class="mb-md-1"
            style="width: 170px; margin: 0 10px 0 0;"
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
            @click="searchContract('searchByDate')"
        >
          검색
        </b-button>
      </template>

      <template v-slot:companySearch>

        <b-form-input
            id="company-code"
            v-model="companyCode"
            disabled
            name="companyCode"
            placeholder="companyCode"
            style="width: 150px"
            class="mb-md-1 ml-1"
        />
        <b-button
            v-b-modal.companyCode
            variant="primary"
            size="md"
            class="mb-md-1 ml-1"
        >
          회사코드로 검색
        </b-button>

        <b-modal
            id="companyCode"
            title="Scrollable Content"
            cancel-variant="outline-secondary"
        >
          <b-card
              class="scrollStyle"
              style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px"
          >
            <b-form-radio-group
                v-model="searchCompanyCodeOption"
                :options="options"
                class="demo-inline-spacing mb-1"
                value-field="value"
                text-field="text"
                disabled-field="disabled"
            />
            <b-table
                hover
                selectable
                :select-mode="'single'"
                :fields="fields"
                :items="customerCodeList"
                @row-clicked="companyCodeClick"
            />
          </b-card>
        </b-modal>
      </template>

    </contract-info-grid>
    <contract-detail-info-grid>
      <template v-slot:header>
        <h2>수주상세</h2>
      </template>
    </contract-detail-info-grid>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import BEditableTable from 'bootstrap-vue-editable-table'
import contractInfoGrid from '@/components/logistic/sales/contract/contractInfoGrid/ContractGrid'
import contractDetailInfoGrid from '@/components/logistic/sales/contract/contractInfoGrid/ContractDetailGrid'
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
    BEditableTable,
    BFormRadioGroup,
    BCardText,

    contractInfoGrid,
    contractDetailInfoGrid,
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
    selected: '',
    workplaceName: '',
    workplaceCode: '',
    searchWorkplace: '',
    companyCode: 'BRC-01',
    customerCode: '',
    searchCompanyCodeOption: '',
    options: [
      { text: '전체', value: 'ALL', disabled: false },
      { text: '근무지별', value: 'WORKPLACE', disabled: false },
    ],
    fields: [
      { key: 'customerCode', label: '화사코드' },
      { key: 'customerName', label: '고객사명' },
    ],
  }),
  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {

        console.log("7777777777")
        console.log(newValue)
        const searchOption = { searchCondition: newValue, workplaceCode: this.companyCode }
        console.log(`watchDispatch${searchOption.searchCondition}`)
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }

    },
  },
  mounted() {
    // eslint-disable-next-line new-cap
    const tableColumns = [{
      tableColumns: [
        { key: 'contractNo', label: '수주일련번호', sortable: true },
        { key: 'estimateNo', label: '견적일련번호', sortable: true },
        { key: 'contractTypeName', label: '수주유형분류', sortable: true },
        { key: 'estimateDate', label: '견적일자', sortable: true },
        { key: 'contractDate', label: '수주일자', sortable: true },
        { key: 'contractRequester', label: '수주요청자', sortable: true },
        { key: 'empNameInCharge', label: '수주담당자명', sortable: true },
        { key: 'deliveryCompletionStatus', label: '납품완료여부', sortable: true },
        { key: 'description', label: '비고', sortable: false },
      ],
      detailTableColumns: [
        { key: 'contractDetailNo', label: '수주상세일련번호', sortable: true },
        { key: 'mrpGatheringNo', label: '취합발주번호', sortable: true },
        { key: 'itemName', label: '품목명', sortable: true },
        { key: 'dueDateOfContract', label: '납기일', sortable: true },
        { key: 'estimateAmount', label: '견적수량', sortable: true },
        { key: 'stockAmountUse', label: '재고사용량', sortable: true },
        { key: 'productionRequirement', label: '제작필요수량', sortable: true },
        { key: 'unitPriceOfContract', label: '견적단가', sortable: true },
        { key: 'sumPriceOfContract', label: '합계액', sortable: true },
        { key: 'operationCompletedStatus', label: '납품가능여부', sortable: true },
        { key: 'deliveryCompletionStatus', label: '납품완료여부', sortable: true },
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

    this.searchContract('searchByDate')
  },
  methods: {
    ...mapActions('logi/sales', ['searchCustomerList']),
    ...mapActions('auth', ['GET_COMPANY_CODE', 'GET_WORKPLACE_CODE', 'AUTHORITY_REQUEST']),
    searchContract(searchType) {
      const searchCondition = searchType
      const sendDate = {
        startDate: this.startDate, endDate: this.endDate, customerCode: this.customerCode, searchCondition,
      }
      this.$store.dispatch('logi/sales/searchContract', sendDate)
    },
    companyCodeClick(payload) {
      console.log('companyClick')
      this.customerCode = payload.customerCode
      this.searchContract('searchByCustomer')
    },
    searchCompanyCode() {
      this.$store.dispatch('searchCustomerList')
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
