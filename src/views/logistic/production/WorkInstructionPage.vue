<template>
  <component :is="'b-card'">
    <b-tabs pills>
      <b-tab
          active
      >
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">작업지시</span>
        </template>
        <!--  내용물 컴포넌트       -->
        <WorkInstructionGrid />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">작업지시현황</span>
        </template>
        <!--  내용물 컴포넌트       -->
        <WorkOrderStatus />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">생산실적관리</span>
        </template>
        <!--  내용물 컴포넌트       -->
        <WorkPerformanceManagement />
      </b-tab>

    </b-tabs>
  </component>
<!--  <div>
    <CommonGrid
      title="작업지시"
      grid-type="grid"
      :buttonlist="buttonList"
      :search-customer="true"
      @get-date="getDate"
      @get-customer="getCustomer"
      @find-data="getGridData"
      @row-selected="showGridData"
    />
    <CommonGrid
      grid-type="detailGrid"
      title="작업지시상세"
    />

  </div>-->

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
import WorkOrderStatus from '@/components/logistic/production/workInstruction/WorkOrderStatus'
import WorkPerformanceManagement from '@/components/logistic/production/workInstruction/WorkPerformanceManagement'
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
    WorkOrderStatus,
    WorkPerformanceManagement
  },
  computed: {
    ...mapState({
      grid: state => state.logi.workInstruction.grid,
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

    buttonList: [
      {
        value: '추가',
        event: 'add',
      },
      {
        value: '수정',
        event: 'edit',
      },
      {
        value: '조회',
        event: 'search',
        method: 'logi/production/showWorkOrderInfoList',
      },
    ],
  }),
  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {
        const searchOption = { searchCondition: newValue, workplaceCode: this.companyCode }
        console.log(`watchDispatch${searchOption.searchCondition}`)
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }
    },
  },
  created() {
    const tableColumns = [{
      tableColumns: [
        {
          key: 'mrpGatheringNo', label: '소요량취합번호', sortable: true, dataType: 'date',
        },
        {
          key: 'itemClassification',
          label: '품목분류',
          sortable: true,
          dataType: 'select',
          options: [
            { value: 'EA', text: 'EA' },
            { value: 'SET', text: 'SET' },
            { value: 'BOX', text: 'BOX' },
          ],
        },
        { key: 'itemCode', label: '품목코드', sortable: true },
        { key: 'itemName', label: '품목명', sortable: true },
        {
          key: 'unitOfMrp',
          label: '단위',
          sortable: true,
          dataType: 'select',
          options: [
            { value: 'EA', text: 'EA' },
            { value: 'SET', text: 'SET' },
            { value: 'BOX', text: 'BOX' },
          ],
        },
        { key: 'requiredAmount', label: '필요수량', sortable: true },
        { key: 'orderDate', label: '작업지시기한', sortable: true },
        { key: 'requiredDate', label: '작업완료기한', sortable: true },
      ],
      detailTableColumns: [
        {
          key: 'workOrderNo', label: '작업지시일련번호', sortable: true, dataType: 'date',
        },
        {
          key: 'mrpGatheringNo',
          label: '소요량취합번호',
          sortable: true,
          dataType: 'select',
          options: [
            { value: 'EA', text: 'EA' },
            { value: 'SET', text: 'SET' },
            { value: 'BOX', text: 'BOX' },
          ],
        },
        { key: 'itemClassification', label: '품목코드', sortable: true },
        { key: 'itemCode', label: '품목명', sortable: true },
        { key: 'itemName', label: '단위', sortable: true },
        { key: 'unitOfMrp', label: '생산공정코드', sortable: true },
        { key: 'productionProcessCode', label: '생산공정명', sortable: true },
        { key: 'productionProcessName', label: '작업장코드', sortable: true },
        { key: 'workSiteCode', label: '작업장명', sortable: true },
        { key: 'workStieName', label: '원재료검사', sortable: true },
        { key: 'inspectionStatus', label: '제품제작', sortable: true },
        { key: 'productionStatus', label: '제품검사', sortable: true },
      ],
    },
    ]
    this.$store.dispatch('logi/workInstruction/setTable', tableColumns)

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const lastday = new Date(year, month, 0).getDate()
    this.startDate = `${year}-${month}-01`
    this.endDate = `${year}-${month}-${lastday}`

    // this.searchContract('searchByDate')
  },
  methods: {
    showMe() {
      console.log(this.customerCode)
    },
    getDate(startDate, endDate) {
      console.log('호출당함')
      this.$store.dispatch('logi/workInstruction/SHOW_WORK_INFO_LIST')
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
  },
}
</script>
<!--

<style lang="scss" scoped>

</style>

<style lang="scss">
@import '../../../assets/scss/scrollStyle';
</style>
-->
