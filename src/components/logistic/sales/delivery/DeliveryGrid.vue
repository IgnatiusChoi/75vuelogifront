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
            @click="addNewContract"
          >
            납품
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
        style="width: 1200px; min-width: 100%;"
        @row-selected="onRowSelected"
      />
    </div>
    <div class="mx-2 mb-2">
      <b-row />
    </div>
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
import useInvoicesList from '../contract/contractInfoGrid/GridOption'

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
  },
  mounted() {
  },
  data: () => ({
    selected: '',
    selectMode: 'single',
    modal: false,
    contractTypeNameOption: [
      { value: 'CT-01', text: 'CT-01 | 수주일반' },
      { value: 'CT-02', text: 'CT-02 | 긴급수주' },
    ],
  }),
  methods: {
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
</style>
