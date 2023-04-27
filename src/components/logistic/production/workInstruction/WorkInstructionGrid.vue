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
      >
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



<!--      <b-row>
        &lt;!&ndash; Table Top &ndash;&gt;
        <b-col
          cols="12"
          md="10"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          style="min-width: 1200px;"
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
            @click="addNewContract"
          >
            작업지시 필요항목 조회
          </b-button>
          <b-button
            variant="primary"
            size="md"
            class="mr-1"
            @click="addNewContract"
          >
            작업지시 모의 전개
          </b-button>
        </b-col>
      </b-row>-->

    </div>
<!--    <div
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
        style="width: 1200px; min-width: 100%;"
        @row-selected="onRowSelected"
      />
    </div>-->
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
  }),
  methods: {
    ...mapActions('logi/workInstruction', ['SEARCH_WORK_ORDER_LIST','SHOW_WORK_ORDER_DIALOG']),
    searchWorkOrder() {
     this.SEARCH_WORK_ORDER_LIST()
     // this.$store.dispatch('logi/workInstruction/SEARCH_WORK_ORDER_LIST')
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
</style>
