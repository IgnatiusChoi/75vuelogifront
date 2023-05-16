<template>

  <!-- Table Container Card -->
  <b-card
    no-body
    style="font-family: '배달의민족 도현'; max-height: 500px"
    class="scrollStyle"
  >

    <div class="m-2">

      <b-row>
        <!-- Table Top -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          style="min-width: 1200px;"
        >
          <h2 v-html="title" />
          <template v-if="datepicker">
            <b-input-group
              class="mb-md-1"
              style="width: 170px; margin: 0 10px 0 10px;"
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
                  right
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
              @click="sendDate"
            >
              검색
            </b-button>

          </template>
          <template v-if="searchCustomer">
            <SearchCustomerCode
              @get-customer="getCustomer"
            />
          </template>
        </b-col>
      </b-row>
      <b-row>
        <!-- Table Top -->
        <b-col
          cols="12"
          md="10"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <template v-for="button in buttonlist">
            <b-button
              variant="primary"
              size="md"
              class="mr-1"
              @click="button.clickEvent"
            >
              {{ button.value }}
            </b-button>
          </template>
        </b-col>
      </b-row>
    </div>

    <b-row />
    <div
      style="overflow-y: auto; overflow-x: auto; max-height: 210px;"
      class="scrollStyle"
    >
      <b-table
        ref="table"
        :items="gridData"
        :fields="tableColumnsData"
        style="overflow: auto; width: 100%"
        show-empty
        empty-text="No matching records found"
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
      <TableEditModal
        v-if="tableEditModal"
        :table-row-data="tableColumnsData"
        @close="closeEditModal"
        @input-modal="inputModal"
      />
    </transition>
  </b-card>
</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
  BTableLite, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'
import SearchCustomerCode from '@/components/logistic/sales/SearchCustomerComponent'
import TableEditModal from '@/components/common/modal/TableEditModal'

export default {
  components: {
    TableEditModal,
    BCardCode,
    BTableLite,
    vSelect,
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

    SearchCustomerCode,
  },
  props: ['title', 'buttonlist', 'datepicker', 'searchCustomer', 'gridType', 'columnWidth', 'onlyOne'], //searchcustomer, gridtype은 딱히 필요없어보임
  computed: {
    // ...mapActions('logi/sales', ['searchContract']), 메소드에 선언해야함
    ...mapState({
      detailGrid: state => state.detailGrid,
      detailTableColumns: state => state.detailTableColumns,
      grid: state => state.grid,
      tableColumns: state => state.tableColumns,
    }),
  },
  data() {
    return {
      gridData: [],
      tableColumnsData: [],
      startDate: '',
      endDate: '',
      searchCompanyCodeOption: '',
      searchMethod: '',
      registMethod: '',
      selectMode: 'single',
      selectOption: [
        'single', 'multiple',
      ],
      componentState: '',
      tableEditModal: false,
    }
  },
  watch: {
    grid() {
      if (this.gridType === 'grid') {
        this.gridData = this.grid
      }
    },
    detailGrid() {
      if (this.gridType === 'detailGrid') {
        this.gridData = this.detailGrid
      }
    },
  },
  created() {
    if (this.buttonlist !== undefined) {
      this.buttonlist.map(e => {
        if (e.event === 'add') {
          e.clickEvent = this.addButton
        } else if (e.event === 'edit') {
          e.clickEvent = this.editButton
        } else if (e.event === 'search') {
          e.clickEvent = this.searchButton
        } else if (e.event === 'regist') {
          e.clickEvent = this.registButton
        }
      })
    }
    if (this.gridType === 'detailGrid') {
      this.gridData = this.detailGrid
      this.tableColumnsData = this.detailTableColumns
      this.componentState = 'detailGrid'
    } else {
      this.gridData = this.grid
      this.tableColumnsData = this.tableColumns
      this.componentState = 'grid'
    }
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const lastday = new Date(year, month, 0).getDate()
    this.startDate = `${year}-${month}-01`
    this.endDate = `${year}-${month}-${lastday}`
  },
  mounted() {
    /*    if (this.columnWidth === undefined) {
      this.$refs.table.style.width = this.columnWidth
    } */
  },
  methods: {
    sendDate() {
      this.$emit('get-date', this.startDate, this.endDate)
    },
    getCustomer(customerCode, customerName) {
      this.$emit('get-customer', customerCode, customerName)
    },
    addButton() {
      this.tableEditModal = true
    },
    editButton() {
      console.log('미완성')
    },
    searchButton() {
      this.$emit('find-data')
      // this.$store.dispatch(this.method)
    },
    registButton() {
      console.log('가입버튼')
      this.$emit('regist-data')
    },
      onRowSelected(val) {
      this.$emit('row-selected', val)
    },
    closeEditModal() {
      this.tableEditModal = false
    },
    inputModal(rowData) {
      const row = {}
      row.rowData = rowData
      row.gridType = this.gridType
      if (this.onlyOne === 'true') {
        this.$store.commit('ADD_ROW_ONLY_ONE', row)
      } else {
        this.$store.commit('ADD_ROW', row)
      }

      this.$emit('input-modal', rowData)
      this.tableEditModal = false
    },
  },
}
</script>

    <style
      lang="scss"
      scoped
    >
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
      @import '../../../../assets/scss/modal';
      @import '../../../../assets/scss/scrollStyle';
    </style>
