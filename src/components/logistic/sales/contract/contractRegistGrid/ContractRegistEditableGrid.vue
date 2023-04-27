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
          style="min-width: 1200px"
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
            @click="editEstimate('set')"
          >
            수주 수정
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
        @row-selected="onRowSelected"
      />
    </div>
    <div class="mx-2 mb-2">
      <b-row />
    </div>
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
              <label style="font-size: 15px; float:right">견적일련번호 : &nbsp</label>
            </div>
            <b-form-input
              v-model="estimateNo"
              disabled
              placeholder="견적일련번호"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
          >
            <div style="width: 110px; ">
              <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 수주유형 : &nbsp</label>
            </div>
            <b-col>
              <b-form-select
                v-model="contractTypeName"
                :options="contractTypeNameOption"
                style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                :state="contractTypeNameStatus"
              />
              <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
              >
                값이 비었습니다. 값을 선택해 주십시오.
              </b-form-invalid-feedback>
            </b-col>
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">거래처명 : &nbsp</label>
            </div>
            <b-form-input
              v-model="customerCode"
              disabled
              placeholder="거래처명"
              style="width: 200px;"
            />

          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
          >
            <div style="width: 110px; ">
              <label style="font-size: 15px;float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 수주요청자 : &nbsp</label>
            </div>

            <b-col>

              <b-form-input
                v-model="contractRequester"
                :state="contractRequesterStatus"
                placeholder="수주요청자"
                style="width: 200px; margin: 0 0 5px -14px"
              />
              <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
              >
                값이 비었습니다. 값을 입력해 주십시오.
              </b-form-invalid-feedback>
            </b-col>

          </b-col>

          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">견적일자 : &nbsp</label>
            </div>
            <b-form-input
              v-model="estimateDate"
              disabled
              placeholder="견적일자"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">유효일자 : &nbsp</label>
            </div>
            <b-form-input
              v-model="effectiveDate"
              disabled
              placeholder="유효일자"
              style="width: 200px;"
            />
          </b-col>
          <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
          >
            <div style="width: 110px; ">

              <label style="font-size: 15px; float:right">견적담당자명 : &nbsp</label>
            </div>
            <b-form-input
              v-model="estimateRequester"
              disabled
              placeholder="견적담당자명"
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
            @click="editEstimate('get')"
          >
            입력
          </b-button>
        </template>
      </CommonModal>
    </transition>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormSelect, BFormValidFeedback, BFormInvalidFeedback,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import { mapState } from 'vuex'
import CommonModal from '@/components/common/modal/CommonModal'
import useInvoicesList from '../contractInfoGrid/GridOption'

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

    CommonModal,

    vSelect,
  },
  computed: {
    ...mapState({
      tableColumns: state => state.logi.sales.tableColumns,
      grid: state => state.logi.sales.grid,
      detailGrid: state => state.logi.sales.detailGrid,
    }),
  },
  watch: {
    contractRequester() {
      if (this.contractRequester !== undefined && this.contractRequester !== '') {
        this.contractRequesterStatus = true
      } else { this.contractRequesterStatus = null }
    },
    contractTypeName() {
      console.log(this.contractTypeName)
      this.contractTypeNameStatus = this.contractTypeName !== undefined ? true : null
    },
  },
  mounted() {

  },
  data: () => ({
    dateTo: '',
    dataFrom: '',
    formatted: '',
    selected: '',
    selectMode: 'single',
    modal: false,

    estimateNo: '',
    contractTypeName: '',
    customerCode: '',
    contractRequester: '',
    estimateDate: '',
    effectiveDate: '',
    estimateRequester: '',
    description: '',

    contractRequesterStatus: '',
    contractTypeNameStatus: '',

    contractTypeNameOption: [
      { value: 'CT-01', text: 'CT-01 | 수주일반' },
      { value: 'CT-02', text: 'CT-02 | 긴급수주' },
    ],
  }),
  methods: {
    onRowSelected(items) {
      this.selected = items[0]
      this.$store.dispatch('logi/sales/searchEstimateDetailInfo', items[0].estimateNo)
    },
    editEstimate(condition) {
      console.log(this.contractRequester)
      if (condition === 'set') {
        this.estimateNo = this.selected.estimateNo
        this.contractTypeName = this.selected.contractTypeName
        this.customerCode = this.selected.customerCode
        this.contractRequester = this.selected.contractRequester
        this.estimateDate = this.selected.estimateDate
        this.effectiveDate = this.selected.effectiveDate
        this.estimateRequester = this.selected.estimateRequester
        this.description = this.selected.description
        this.modal = true
      } else if (condition === 'get') {
        if (this.contractTypeName === undefined || this.contractTypeName.length === 0) {
          this.contractTypeNameStatus = false
          return
        } if (this.contractRequester === undefined || this.contractRequester.length === 0) {
          this.contractRequesterStatus = false
          return
        }

        this.selected.estimateNo = this.estimateNo
        this.selected.contractTypeName = this.contractTypeName
        this.selected.customerCode = this.customerCode
        this.selected.contractRequester = this.contractRequester
        this.selected.estimateDate = this.estimateDate
        this.selected.effectiveDate = this.effectiveDate
        this.selected.estimateRequester = this.estimateRequester
        this.selected.description = this.description
        this.modal = false
      }
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
      this.$store.dispatch('logi/sales/addNewContract', param).then(
        this.$swal.fire(
          '수주 등록 완료!',
          '수주 등록이 완료되었습니다.',
          'success',
        ).then(this.$emit('page-refresh')),
      )
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
  @import 'src/@core/scss/vue/libs/vue-select';
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
  body{
    font-family: "배달의민족 도현";
  }
</style>
