<template>

  <!-- Table Container Card -->
  <b-card
    no-body
    style="font-family: '배달의민족 도현'; max-height: 500px"
  >

    <div class="m-2">

      <b-row>
        <!-- Table Top -->
        <b-col
          cols="12"
          md="10"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >

          <slot name="header" />

        </b-col>
        <b-col
          cols="12"
          md="10"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-button
            variant="primary"
            size="md"
            class="mr-1"
            @click="addRow"
          >
            추가
          </b-button>
          <b-button
            variant="primary"
            size="md"
            class="mr-1"
            @click="editEstimate('set')"
          >
            수정
          </b-button>
          <b-button
            variant="primary"
            size="md"
            class="mr-1"
            @click="addNewContract"
          >
            등록
          </b-button>

        </b-col>
      </b-row>

    </div>
    <div
      style="overflow-y: scroll; max-height: 210px;"
      class="scrollStyle"
    >
      <b-table
        :items="grid"
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        class="position-relative scrollStyle"
        selectable
        :select-mode="selectMode"
      />
    </div>
    <div class="mx-2 mb-2">
      <b-row />
    </div>

    <!--    modal-->
    <transition
      name="fade"
      mode="out-in"
    >
      <CommonModal
        v-if="modal"
        @close="closeModal"
      >
        <template v-slot:header>
          <b-col>수정해주십시오</b-col>
        </template>
        <template v-slot:body>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">
              <label style="font-size: 15px; float:right">거래처명 : &nbsp</label>
            </div>
            <b-form-input
              v-model="customerName"
              v-b-modal.companyCode
              placeholder="거래처명"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">
              <label style="font-size: 15px; float:right">견적일자 : &nbsp</label>
            </div>
            <!--            날짜선택-->
            <b-input-group
              style="width: 200px;"
            >
              <b-form-input
                v-model="estimateDate"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
                show-decade-nav
              />
              <b-input-group-append style="height: 37px;">
                <b-form-datepicker
                  v-model="estimateDate"
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
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">유효일자 : &nbsp</label>
            </div>
            <b-input-group
              style="width: 200px;"
            >
              <b-form-input
                v-model="effectiveDate"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
                show-decade-nav
              />
              <b-input-group-append style="height: 37px;">
                <b-form-datepicker
                  v-model="effectiveDate"
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
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">견적담당자 : &nbsp</label>
            </div>
            <b-form-input
              v-model="personCodeInCharge"
              placeholder="견적담당자"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">견적요청자 : &nbsp</label>
            </div>
            <b-form-input
              v-model="estimateRequester"
              placeholder="견적요청자"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">비고 : &nbsp</label>
            </div>
            <b-form-input
              v-model="description"
              placeholder="비고"
              style="width: 200px;"
            />
          </b-col>
        </template>

        <template v-slot:footer>
          <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="closeModal"
          >
            취소
          </b-button>
          <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="rowInput"
          >
            입력
          </b-button>
        </template>
      </CommonModal>
    </transition>
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
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormSelect, BFormValidFeedback, BFormInvalidFeedback,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend, BFormRadioGroup,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import { mapState } from 'vuex'
import CommonModal from '@/components/common/modal/CommonModal'
import useInvoicesList from '../../gridComponent/GridOption'

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
    BFormSelect,
    BFormInvalidFeedback,
    BFormValidFeedback,
    BFormRadioGroup,

    CommonModal,

    vSelect,
  },
  computed: {
    ...mapState({
      tableColumns: state => state.logi.sales.tableColumns,
      grid: state => state.logi.sales.grid,
      detailGrid: state => state.logi.sales.detailGrid,
      customerCodeList: state => state.hr.company.companyCodeList,

    }),
  },
  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {
        const searchOption = { searchCondition: newValue, workplaceCode: 'BRC-01' }
        console.log(`watchDispatch${searchOption.searchCondition}`)
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }
    },
  },
  mounted() {

  },
  data: () => ({
    selected: '',
    selectMode: 'single',
    modal: false,

    customerName: '',
    estimateDate: '',
    effectiveDate: '',
    personCodeInCharge: '',
    estimateRequester: '',
    description: '',

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

  methods: {
    rowInput() {
      this.grid.push(
        {
          customerName: this.customerName,
          estimateDate: this.estimateDate,
          effectiveDate: this.effectiveDate,
          personCodeInCharge: this.personCodeInCharge,
          estimateRequester: this.estimateRequester,
          description: this.description,
        },
      )
      console.log(this.grid)
      this.modal = false
    },
    addRow() {
      this.modal = true
    },
    editEstimate() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    addNewContract() {
      const today = new Date()

      const year = today.getFullYear()
      const month = (`0${today.getMonth() + 1}`).slice(-2)
      const day = (`0${today.getDate()}`).slice(-2)

      const dateString = `${year}-${month}-${day}`

      const param = [{
        batchList: {
          estimateNo: this.selected.estimateNo,
          contractType: this.selected.contractTypeName,
          contractRequester: this.selected.contractRequester,
          customerCode: this.selected.customerCode,
          description: this.selected.description,
        },
        editdueDateOfEstimate: {
        },
        contractDate: dateString,
        personCodeInCharge: 'EMP-01',
        estimateDetail: this.detailGrid,
      }]
      console.log(param)
      this.$store.dispatch('logi/sales/addNewContract', param)
    },
    companyCodeClick(payload) {
      console.log('companyClick')
      this.customerName = payload.customerName
    },
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      '견적일련번호',
      '수주요청자',
      '수주담당자명',
    ]

    const {

      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      fetchInvoices,
      statusFilter,

      refetchData,

      resolveClientAvatarVariant,
    } = useInvoicesList()

    return {
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      fetchInvoices,
      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }

  .invoice-filter-select {
    min-width: 190px;

    ::v-deep .vs__selected-options {
      flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
      width: 100px;
    }
  }
</style>

<style lang="scss">
  @import '../../../../../@core/scss/vue/libs/vue-select';
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

  .fade-enter{
    opacity:0.5
  }
  .fade-enter-active,
  .fade-leave-active{
    transition:opacity 0.3s ease-out;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .paymentModal,{
    z-index: 600;
  }
</style>
