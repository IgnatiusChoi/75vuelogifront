<template>
  <component :is="'b-card'">
  <!-- Table Container Card -->
  <b-card
    no-body
    style="font-family: '배달의민족 도현'; max-height: 500px"
  >

    <div class="m-2">

      <h2 style="margin-bottom: 30px">작업지시 필요 리스트 ( MRP 취합 기반 )</h2>


      <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchWorkOrder"
      >
        작업지시 필요항목 조회
      </b-button>
      <b-button
          v-b-modal.workOrderModal
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"치
          variant="outline-primary"
          @click="searchWorkOrderSimultaion"
      >
        작업지시 모의 전개
      </b-button>

      <b-modal
          v-if="this.mrpNo"
          id="workOrderModal"
          title="workOrder"
          size="xl"
          cancel-variant="outline-secondary"
          ok-only
          ok-title="실제 작업 지시"
          ok-variant="outline-primary"
          @ok="workOrderok"
          @change="closeModal"
      >
        <div>
          <b-form-select
              class="small-select-01"
              v-model="productionProcess"
              :options="productionProcessOptions"
          >
          </b-form-select>
          <b-form-select
              class="small-select-02"
              v-model="workPlaceCode"
              :options="workPlaceCodeOptions"
          >
          </b-form-select>
        </div>

        <b-card
            class="scrollStyle"
            style="margin:auto; overflow-y: scroll;  height: 50vh; padding-left: 10px"
        >

          <b-table
              class="editable-table"
              hover
              selectable
              :sticky-header="true"
              show-empty
              empty-text="No matching records found"
              :select-mode="'single'"
              :fields="workOrderSimultaion"
              :items="workOrderDialog"
          />
        </b-card>
      </b-modal>


      <div style="margin-top: 30px">
        <b-table
            class="editable-table"
            hover
            selectable
            :sticky-header="true"
            show-empty
            empty-text="No matching records found"
            :select-mode="'single'"
            :fields="workOrderList"
            :items="workOrderListItem"
            @row-clicked="mrpNoClick"
        />
      </div>
    </div>

    <div class="mx-2 mb-2">
      <b-row />
    </div>
  </b-card>
  </component>
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
import {mapActions, mapState} from 'vuex'
import CommonModal from '@/components/common/modal/CommonModal'
import useInvoicesList from '@/components/logistic/sales/contract/contractInfoGrid/GridOption'
import {workOrderList,  workOrderSimultaion} from "@/components/logistic/production/fields";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";

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
      workOrderListItem: state => state.logi.workInstruction.workOrderListItem,
      workOrderDialog: state => state.logi.workInstruction.workOrderDialog
    }),
/*    ...mapState('logi/workInstruction', ['workOrderListItem', 'workOrderListItem']),*/
  },
  watch: {
  },
  directives: {
    Ripple,
  },
  data: () => ({
    selected: '',
    selectMode: 'single',
    contractTypeNameOption: [
      { value: 'CT-01', text: 'CT-01 | 수주일반' },
      { value: 'CT-02', text: 'CT-02 | 긴급수주' },
    ],
    workOrderList
    ,workOrderSimultaion
    ,mrpNo:''
    ,mrpGatheringNo:''
    ,workOrderModal: false
    ,workInstructionDate: null,
    productionProcess: '',
    workPlaceCode:'',

    productionProcessOptions: [
      {text: '반제품작업장', value: 'PP001' },
      {text : '완제품작업장', value : 'PP001' }
    ],
    workPlaceCodeOptions: [
      {text: '(주)세계전자 본사', value: 'BRC-01' },
      {text: '(주)세계전자 울산지점', value: 'BRC-02' }
    ]
  }),
  methods: {
    ...mapActions('logi/workInstruction', ['SEARCH_WORK_ORDER_LIST','SHOW_WORK_ORDER_DIALOG', 'WORK_ORDER']),
    searchWorkOrder() {
     this.SEARCH_WORK_ORDER_LIST()
    },
    mrpNoClick(payload) {
      console.log('mrpNo이벤트')
      console.log(payload)
      this.mrpNo = payload.mrpNo
      this.mrpGatheringNo = payload.mrpGatheringNo
    },
    searchWorkOrderSimultaion(){
      console.log('엠알피노',this.mrpNo)
      const sendData={
        mrpNo: this.mrpNo, mrpGatheringNo: this.mrpGatheringNo
      }
      if(!this.mrpNo){
        alert("행을 선택해주십시오")
        return;
      }
    this.SHOW_WORK_ORDER_DIALOG(sendData)
      console.log(this.workOrderDialog)
    },
    onRowSelected(items) {
      console.log(items[0].contractDetailTOList)
      this.$store.commit('logi/sales/setDetailGrid', items[0].contractDetailTOList)
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
      }]
      console.log(param)
      this.$store.dispatch('logi/sales/addNewContract', param)
    },
    workOrderok(){
      console.log('mrpGatheringNo = ', this.mrpGatheringNo)
      console.log('workPlaceCode = ', this.workPlaceCode)
      console.log('productionProcess = ', this.productionProcess)

      const sendData = {
        mrpGatheringNo: this.mrpGatheringNo,
        workPlaceCode: this.workPlaceCode,
        productionProcess: this.productionProcess
      }
      if(!this.mrpGatheringNo){
        alert("행을 선택해주십시오")
        return;
      }
      this.WORK_ORDER(sendData)
    },

    async MrpInsert(e) {
      if (this.mrpRegisterDate === null) {
        e.preventDefault()
        throw new Error('소요량전개 일자 선택하셈.')
      } else {
        const payload = { mrpRegisterDate: this.mrpRegisterDate, batchList: this.mrpList }
        await this.REGISTER_MRP(payload)
        this.mrpRegisterDate = null
        this.alert('등록성공')

        const datePayload = { startDate: this.startDate, endDate: this.endDate }
        //this.SEARCH_MPS_LIST(datePayload)
      }
    },






    // closeModal() {
    //   // 모달이 사라질 때만 작동... change라면서요...
    //   this.isVisible = false
    // },
    onContext(ctx){
      // The date formatted in the locale, or the `label-no - date - selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    }
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
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  .scrollStyle::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: rgba(50,60,150,1);
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
  }

  .scrollStyle::-webkit-scrollbar
  {
    width: 50px;
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
  .small-select-01 {
    font-size: 12px;
    padding: 3px 6px;
    height: 26px;
    width: 120px;
  }
  .small-select-02 {
    font-size: 12px;
    padding: 3px 6px;
    height: 26px;
    width: 120px;
  }
</style>
