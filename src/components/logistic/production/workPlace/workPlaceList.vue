<template>
  <component :is="'b-card'">
    <b-card
        no-body
        style="font-family: '배달의민족 도현'; max-height: 500px"
    >

      <div class="m-2">
        <h2 style="margin-bottom: 30px">작업장 조회</h2>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="searchWorkPlace"
        >
          작업장 조회
        </b-button>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="openModal"
        >
          작업장 추가
        </b-button>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="deleteWorkPlace()"
        >
          작업장 삭제
        </b-button>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="updateWorkPlace"
        >
          작업장 수정
        </b-button>
        <div style="margin-top: 100px; ">
          <b-table
              class="editable-table"
              hover
              selectable
              scrollable
              :sticky-header="true"
              show-empty
              empty-text="No matching records found"
              :select-mode="'single'"
              :fields="workSiteLogList"
              :items="workSiteList"
              @row-clicked="workSiteListClick"
          />
        </div>
      </div>

      <div class="mx-2 mb-2">
        <b-row />

        <workPlaceDetailList  @selectedData="handleChildEvent">
          <template v-slot:header>
            <h2>작업장 로그 조회</h2>
          </template>
        </workPlaceDetailList>

        <div>
          <workPlaceAddList v-if="isModalVisible" @modalClose="isModalVisible=false" @addworkPlaceList="isModalVisible=true"></workPlaceAddList>
        </div>

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
import {workOrderList, workOrderSimultaion, workSite} from "@/components/logistic/production/fields";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import workPlaceDetailList from "@/components/logistic/production/workPlace/workPlaceDetailList.vue"
import workPlaceAddList from "@/components/logistic/production/workPlace/workPlaceAddList.vue"

export default {
  namespaced: true,
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

    workPlaceDetailList,
    workPlaceAddList,
  },
  computed: {
    ...mapState({
      tableColumns: state => state.logi.sales.tableColumns,
      grid: state => state.logi.sales.grid,
      detailGrid: state => state.logi.sales.detailGrid,
      workOrderListItem: state => state.logi.workInstruction.workOrderListItem,
      workOrderDialog: state => state.logi.workInstruction.workOrderDialog,
      workSiteList: state => state.logi.workInstruction.workSiteList,
      workSiteLogList: state => state.logi.workInstruction.workSiteLogList,
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
        selected01: [],
        selectMode: 'single',
        workOrderList,
        workOrderSimultaion,
        mrpNo:'',
        mrpGatheringNo:'',
        workOrderModal: false,
        workSite,
        productionProcessCode: '',
        workSiteCode:'',
        isModalVisible: false,
        data:[],
        items: this.selected,
      }
  ),

  methods: {
    ...mapActions('logi/workInstruction', ['SEARCH_WORK_SITE']),
    searchWorkPlace() {

      console.log('작업장 조회')
      this.$store.dispatch('logi/workInstruction/SEARCH_WORK_SITE')
    },
    openModal(){
      console.log('작업장 추가')
      this.isModalVisible = true
    },
    handleChildEvent(data){
      console.log("asfasf",data);
      this.data = data;
    },

    deleteWorkPlace(){
      console.log('삭제할 행', this.data.workOrderNo)
      this.items=this.selected
      console.log(this.items)
      this.$store.dispatch('logi/workInstruction/DELETE_WORK_PLACE_LIST', this.items)
    },



    updateWorkPlace(){
      console.log('작업장 수정')
    },

    workSiteListClick(payload){
      console.log('workSiteClick')
      console.log(payload)
      this.selected =payload


      //console.log(payload.workSiteCode)

      //this.productionProcessCode=payload.productionProcessCode
      //this.searchWorkSiteLog()
      this.$store.dispatch('logi/workInstruction/SEARCH_PRODUCTION_PROCESS_CODE', payload)
//아래companyCodeClick참고하기
    },


    // companyCodeClick(payload) {
    //   console.log('companyClick')
    //   console.log(payload)
    //   this.customerCode = payload.customerCode
    //   this.searchContract('searchByCustomer')
    // },



    // workPlaceListClick(payload) {
    //   console.log('workPlaceClick')
    //   console.log(payload)
    //   this.mrpNo = payload.mrpNo
    //   this.mrpGatheringNo = payload.mrpGatheringNo
    // },



    // searchWorkOrderSimultaion(){
    //   console.log('작업시지 모의 전개',this.mrpNo)
    //   const sendData={
    //     mrpNo: this.mrpNo,
    //     mrpGatheringNo: this.mrpGatheringNo
    //   }
    //   if(!this.mrpNo){
    //     alert("행을 선택해주십시오")
    //     return;
    //   }
    //   this.SHOW_WORK_ORDER_DIALOG(sendData)
    // },
    // onRowSelected(items) { //안 되어 있음
    //   console.log(items[0].contractDetailTOList)
    //   this.$store.commit('logi/sales/setDetailGrid', items[0].contractDetailTOList)
    // },
    // closeModal() {
    //   this.modal = false
    // },
    // addNewContract() {
    //   const today = new Date()
    //
    //   const year = today.getFullYear()
    //   const month = (`0${today.getMonth() + 1}`).slice(-2)
    //   const day = (`0${today.getDate()}`).slice(-2)
    //
    //   const dateString = `${year}-${month}-${day}`
    //
    //   const param = [{
    //
    //   }]
    //   console.log(param)
    //   this.$store.dispatch('logi/sales/addNewContract', param)
    // },
  },

  // setup() {
  //   const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'
  //
  //   // Register module
  //
  //   // UnRegister on leave
  //   onUnmounted(() => {
  //     if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
  //       store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
  //   })
  //
  //   const statusOptions = [
  //     '견적일련번호',
  //     '수주요청자',
  //     '수주담당자명',
  //   ]
  //
  //   const {
  //
  //     perPage,
  //     currentPage,
  //     totalInvoices,
  //     dataMeta,
  //     perPageOptions,
  //     searchQuery,
  //     sortBy,
  //     isSortDirDesc,
  //     refInvoiceListTable,
  //     fetchInvoices,
  //     statusFilter,
  //
  //     refetchData,
  //
  //     resolveClientAvatarVariant,
  //   } = useInvoicesList()
  //
  //   return {
  //     perPage,
  //     currentPage,
  //     totalInvoices,
  //     dataMeta,
  //     perPageOptions,
  //     searchQuery,
  //     sortBy,
  //     isSortDirDesc,
  //     refInvoiceListTable,
  //     fetchInvoices,
  //     statusFilter,
  //
  //     refetchData,
  //
  //     statusOptions,
  //
  //     avatarText,
  //     resolveClientAvatarVariant,
  //   }
  // },
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
