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
      </b-row>

      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />

        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="grid"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      selectable
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative scrollStyle"
      :select-mode="selectMode"
      @row-selected="onRowSelected"
    />
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import { mapState } from 'vuex'
import useInvoicesList from './GridOption'

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

    vSelect,
  },
  computed: {
    ...mapState({
      grid: state => state.logi.sales.grid,
      detailGrid: state => state.logi.sales.detailGrid,
      tableColumns: state => state.logi.sales.tableColumns,
    }),
  },
  mounted() {
    if (this.grid.length !== 0) {
      this.fetchInvoices(this.grid.length)
      this.totalInvoices = this.grid.length
    }
  },
  data: () => ({
    dateTo: '',
    dataFrom: '',
    formatted: '',
    selected: '',
    selectMode: 'single',
  }),
  methods: {
    onRowSelected(items) {
      this.selected = items
      this.$store.dispatch('logi/sales/searchContractDetail', items[0].contractNo)
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
  @import '/src/@core/scss/vue/libs/vue-select';
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
