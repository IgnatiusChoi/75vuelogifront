<template>
  <div>
    <div class="custom-search">

      <!-- advance search input -->
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>전표일련번호</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>작성날짜:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>승인상태:</label>
            <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- table -->
    <vue-good-table
      ref="myTable"
      :columns="columns"
      :rows="slipFormList"

      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: '개가 선택되었습니다',
        clearSelectionText: 'clear',
        disableSelectInfo: false, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
      theme="black-rhino"
      @on-selected-rows-change="selectionChanged"
    >
      <!--선택시 나오게-->
      <div slot="selected-row-actions">
        <button @click="showJournalForm">
          해당 전표상세보기
        </button>
      </div>
      <!--테이블안에 버튼넣기 -->
      <div slot="table-actions">
        <MenuSlipForm
          :active-button="activeButton"
          @deleteItem="deleteSlip"
          @editItem="editSlip"
        />
      </div>

      <template
        slot="table-row"
        slot-scope="props"
      >
        <span
          v-if="props.column.field === 'fullName'"
          class="text-nowrap"
        >
          <b-avatar
            :src="props.row.avatar"
            class="mx-1"
          />
          <span>{{ props.row.fullName }}</span>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['10','20','30']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
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
          </div>
        </div>
      </template>
    </vue-good-table>
    <!-- 로딩중-->

  </div>
</template>

<script>
import MenuSlipForm from '@/components/account/account/Slip/MenuSlipForm.vue'
import {
  BAvatar, BPagination, BFormGroup, BFormInput, BFormSelect, BRow, BCol,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    MenuSlipForm,

    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  data() {
    return {
      activeButton: 'searchSlip',
      buttonCondition: '',
      pageLength: 10,
      columns: [
        {
          label: '전표일련번호',
          field: 'slipNo',
        },
        {
          label: '기수일련번호',
          field: 'accountPeriodNo',
        },
        {
          label: '품의내역',
          field: 'expenseReport',
        },
        {
          label: '작성날짜',
          field: 'reportingDate',
        },
        {
          label: '승인상태',
          field: 'slipStatus',
        },
      ],
      rows: [],
      searchTerm: '',
      selectedArray: [],
      deleteItem: [],
      editeItem: [],
      logMessage: '',

    }
  },
  computed: {
    ...mapState('account/account', ['slipFormList']),

  },
  /**
   * 리엑트의 useEffect와 같음
   */
  created() {
    this.FETCH_ALL_SLIP()
  },
  methods: {
    // 액션을 가져옴
    ...mapActions('account/account', ['FETCH_ALL_SLIP', 'DELETE_SLIP']),
    // 검색
    advanceSearch(val) {
      this.searchTerm = val
    },
    /**
    * 선택된 전표(체크박스)
    * 승인과 미결된 전표는 수정 삭제가 안된다.
    */
    selectionChanged(params) {
      const selectedSlip = params.selectedRows.map(v => v.slipStatus)
      if (selectedSlip.includes('승인') || selectedSlip.includes('미결')) {
        Vue.$toast.info('승인 or 미결된 전표는 수정이 불가합니다')
      } else {
        this.selectedArray = params.selectedRows.map(v => ({ slipNo: v.slipNo }))
        this.deleteItem = this.selectedArray
        this.editeItem = this.selectedArray
      }
    },

    /**
     * 전표삭제버튼
     */
    async deleteSlip() {
      if (!this.deleteItem.length) {
        Vue.$toast.info('승인된 전표는 삭제가 불가합니다')
        return
      }
      const response = await this.DELETE_SLIP(this.deleteItem)
      Vue.$toast.success(response.data.errorMsg)
      this.FETCH_ALL_SLIP()
    },
    /**
    * 전표수정버튼
    */
    async editSlip() {
      const selectedSlip = this.selectedArray[0].slipNo
      console.log(selectedSlip)
      this.$router.push({ name: 'journalForm', params: { selectedSlip } })
    },

    /**
     * 전표상세보기버튼
     */
    showJournalForm() {
      const selectedSlip = this.$refs.myTable.selectedRows.map(v => v.slipNo)[0]
      if (this.$refs.myTable.selectedRows.length > 1) {
        Vue.$toast.info('한개만 선택해주세요')
      } else {
        this.$router.push({ name: 'journalForm', params: { selectedSlip } })
      }
    },
  },
}
</script>
