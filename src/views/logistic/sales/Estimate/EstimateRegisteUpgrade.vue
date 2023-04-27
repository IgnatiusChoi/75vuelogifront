<template>
  <!--  <div>
    <WorkInstructionGrid>
      <template v-slot:header>
        <h2
          class="mb-md-1"
          style="width: 100px"
        >
          작업지시
        </h2>
      </template>
    </WorkInstructionGrid>
    <WorkInstructionDetailGrid>SET_TABLE
      <template v-slot:header>
        <h2>
          작업지시현황
        </h2>
      </template>
    </WorkInstructionDetailGrid>
  </div>-->
  <!--  <CommonGrid
          grid-type="grid"
          :buttonlist="buttonList"
          title="작업지시"
          :datepicker="true"
          :search-customer="true"
          @get-date="getDate"
          @get-customer="getCustomer"
          @get-grid-data="getGridData"
  />-->
  <div>
    <CommonGrid
      grid-type="grid"
      :buttonlist="buttonList"
      title="견적등록"
      column-width="1700px"
      only-one="true"
      @row-selected="showGridData"
      @find-data="getGridData"
      @input-modal="gridInputModal"
      @regist-data="registData"
    />
    <CommonGrid
      grid-type="detailGrid"
      title="견적상세"
      :buttonlist="detailGridbuttonList"
      @input-modal="detailGridInputModal"
    />
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
  BFormGroup,
} from 'bootstrap-vue'
import BEditableTable from 'bootstrap-vue-editable-table'
import WorkInstructionGrid from '@/components/logistic/production/workInstruction/WorkInstructionGrid'
import WorkInstructionDetailGrid from '@/components/logistic/production/workInstruction/WorkInstructionDetailGrid'
import CommonGrid from '@/components/logistic/sales/gridComponent/CommonGrid'
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
    BFormGroup,

    WorkInstructionGrid,
    WorkInstructionDetailGrid,
    CommonGrid,
  },
  computed: {
    ...mapState({
      grid: state => state.grid,
      detailGrid: state => state.detailGrid,
      customerCodeList: state => state.hr.company.companyCodeList,
      itemList: state => state.logi.base.itemList,
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
    searchCompanyCodeOption: '',
    options: [],
    buttonList: [
      {
        value: '추가',
        event: 'add',
      },
      {
        value: '등록',
        event: 'regist',
      },
    ],
    itemOptions: [],
    detailGridbuttonList: [
      {
        value: '추가',
        event: 'add',
      },
    ],
    itemNameValue: '',
  }),

  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {
        const searchOption = { searchCondition: newValue, workplaceCode: this.companyCode }
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }
    },
  },
  created() {
    this.$store.commit('RESET_GRID')
    const searchOption = { searchCondition: 'ALL', workplaceCode: 'BRC-01' }
    this.$store.dispatch('hr/company/searchCustomerList', searchOption)
    this.$store.dispatch('logi/base/SEARCH_ITEM', 'IT-_I')
    let dataList = []
    this.customerCodeList.map(e => {
      const { customerName } = e
      dataList.push({ text: customerName, value: customerName })
    })
    this.options = dataList

    dataList = []

    this.itemList.map(e => {
      const { detailCodeName, detailCode } = e
      dataList.push({ text: detailCode, value: detailCodeName })
    })

    this.itemOptions = dataList

    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const today = `${year}-${month}-${day}`
    const lastday = new Date(year, month, 0).getDate()
    this.startDate = `${year}-${month}-01`
    this.endDate = `${year}-${month}-${lastday}`

    const tableColumns = [{
      tableColumns: [
        {
          key: 'customerCode',
          label: '거래처명',
          sortable: true,
          dataType: 'select',
          options: this.options,
        },
        {
          key: 'estimateDate', label: '견적일자', sortable: true, dataType: 'date', value: today, disabled: true,
        },
        {
          key: 'effectiveDate', label: '유효일자', sortable: true, dataType: 'date', value: this.endDate,
        },
        {
          key: 'personCodeInCharge', label: '견적담당자', sortable: true, value: 'GDW', disabled: true,
        },
        {
          key: 'estimateRequester', label: '견적요청자', sortable: true, value: 'GDW', disabled: true,
        },
        { key: 'description', label: '비고', sortable: true },
      ],
      detailTableColumns: [
        {
          key: 'itemCode',
          label: '품목코드',
          sortable: true,
          dataType: 'selectToInput',
          options: this.itemOptions,
          value: 'item',
          To: {
            toKey: 'itemName', label: '품목명',
          },
        },
        {
          key: 'itemName', label: '품목명', sortable: true, hide: true, //렌더링 안함
        },
        {
          key: 'unitOfEstimate', label: '단위', sortable: true, value: 'EA',
        },
        {
          key: 'dueDateOfEstimate', label: '납기일', sortable: true, dataType: 'date', value: this.endDate,
        },
        { key: 'estimateAmount', label: '견적수량', sortable: true },
        {
          key: 'unitPriceOfEstimate', label: '견적단가', sortable: true, hide: true, //렌더링 안함
        },
        {
          key: 'sumPriceOfEstimate', label: '합계액', sortable: true, hide: true, //렌더링 안함
        },
        { key: 'description', label: '비고', sortable: true },
      ],
    },
    ]
    this.$store.commit('SET_TABLE', tableColumns)

    // this.searchContract('searchByDate')
  },
  methods: {
    showMe() {
      console.log(this.customerCode)
    },
    getDate(startDate, endDate) {
      const sendDate = { startDate, endDate }
      this.$store.dispatch('logi/sales/searchEstimateInContractAvailable', sendDate)
    },
    getCustomer(customerCode, customerName) {
      console.log(customerCode)
      console.log(customerName)
    },
    getGridData() {
      console.log('getGridData')
      this.$store.dispatch('logi/workInstruction/SHOW_WORK_INFO_LIST')
    },
    showGridData(val) {
      console.log(val)
    },
    gridInputModal() {
    },
    async detailGridInputModal(rowData) {
      const unitPrice = await this.$store.dispatch('logi/base/GET_STANDARD_UNIT_PRICE', rowData[0].itemCode)

      const amount = parseInt(rowData[0].estimateAmount)
      const calculation = amount * unitPrice

      this.detailGrid[this.detailGrid.length - 1].unitPriceOfEstimate = unitPrice
      this.detailGrid[this.detailGrid.length - 1].sumPriceOfEstimate = calculation
    },
    async registData() {
      const customerInfo = this.customerCodeList.filter(e => e.customerName === this.grid[0].customerCode)
      const detailGridData = this.detailGrid.map(e => {
        e.status = 'INSERT'
        return e
      })
      const newEstimate = { newEstimateInfo: { ...this.grid[0], estimateDetailTOList: detailGridData } }

      newEstimate.newEstimateInfo.customerCode = customerInfo[0].customerCode
      const isSuccess = await this.$store.dispatch('logi/sales/ADD_NEW_ESTIMATE', newEstimate)
      if (isSuccess) {
        this.$swal.fire(
          '등록 성공!',
          '페이지를 새로고침합니다.',
          'success',
        ).then(() => {
          this.$store.commit('RESET_GRID')
        })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: '등록 실패',
          text: '견적을 다시 확인해주세요.',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
  @import 'src/assets/scss/scrollStyle';
  body{
    font-family: "배달의민족 도현";
  }
</style>
