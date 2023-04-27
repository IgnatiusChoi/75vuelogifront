<template>
  <div>
    <div class="custom-search">

      <!-- 검색 -->
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

    <!-- 테이블 -->
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
      <!--전표승인 전표반려 버튼 -->
      <div slot="table-actions">
        <ApprovalMenuForm
          @approvalSlip="approvalSlip"
          @rejectSlip="rejectSlip"
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
import ApprovalMenuForm from '@/components/account/account/ApprovalManager/ApprovalMenuForm.vue'
import {
  BAvatar, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow,
} from 'bootstrap-vue'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'
import { VueGoodTable } from 'vue-good-table'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'

export default {
  components: {
    ApprovalMenuForm,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  data() {
    return {
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
          label: '전표유형',
          field: 'slipType',
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
          label: '작성자',
          field: 'reportingEmpName',
        },
        {
          label: '승인날짜',
          field: 'approvalDate',
        },
        {
          label: '승인자',
          field: 'approvalEmpCode',
        },
        {
          label: '승인상태',
          field: 'slipStatus',
        },
      ],
      rows: [],
      searchTerm: '',
      slipStatus: [],
      selectedSlip: [],
    }
  },
  computed: {
    ...mapState('account/account', ['slipFormList']),
    /**
     * 오늘날짜
     * @returns {string}
     */
    formatDate() {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 9 ? month : `0${month}`
      let day = date.getDate()
      day = day > 9 ? day : `0${day}`
      return `${year}-${month}-${day}`
    },
  },
  watch: {

  },
  created() {
    this.FETCH_ALL_SLIP()
  },
  methods: {
    // 액션을 가져옴
    ...mapActions('account/account', ['FETCH_ALL_SLIP', 'APPROVAL_SLIP']),
    // 검색
    advanceSearch(val) {
      this.searchTerm = val
    },
    /**
     * 업데이트후 초기화함수
     */
    initialSlipList() {
      this.FETCH_ALL_SLIP()
    },
    /**
     * 선택된 전표(체크박스)
     * 1.slipStatus로 미결 승인 반려에 따라 처리가능하게 배열에 선택된 항목의 상태를 넣어둔다.
     * 2.seletedSlip
     *    객체 비구조화 할당이용 approvalDate에는  computed속성의 메서드 이용 오늘 날짜를 할당
     *     로그인시 승인자 코드를 approvalEmpCode 할당후 다른것은 가만히 두고 아래 두개만 변경
     *     화살표 함수에서 객체를 리턴할때는 ({}) 이렇게 !!! 기억하세요~
     * 3.로그인 한 아이디를 이용하여 sesstionStorge에 저장된 아이디를 승인자로 사용합니다! 참고하세요
     *
     */
    selectionChanged({ selectedRows }) {
      this.slipStatus = selectedRows.map(v => v.slipStatus)

      this.selectedSlip = selectedRows.map(newSlip => ({
        ...newSlip,
        approvalDate: this.formatDate,
        approvalEmpCode: sessionStorage.getItem('empCode'),
      }))
    },
    /**
     * 승인받기위한 조건
     * 승인받은 전표-->승인 x
     * 반려받은 전표-->승인 x
     * 미결 --->승인 o
     */
    async approvalSlip() {
      const isApprovalStatus = this.slipStatus.includes('승인')
      const isRejectStatus = this.slipStatus.includes('반려')
      if (isApprovalStatus) {
        Vue.$toast.info('승인된 전표가 이미 있습니다!')
      } else if (isRejectStatus) {
        Vue.$toast.info('반려된 전표는 재작성 후 승인받으세요!')
      } else {
        const approvalSlip = this.selectedSlip.map(newSlip => ({
          ...newSlip,
          slipStatus: '승인',
        }))
        const updateList = await this.APPROVAL_SLIP(approvalSlip)
        Vue.$toast.info(`전표번호 :${updateList.join()} 승인 되었습니다.`)
        this.initialSlipList()
      }
    },
    /**
     * 반려
     */
    async rejectSlip() {
      console.log('반려')
      const isApprovalStatus = this.slipStatus.includes('승인')
      const isRejectStatus = this.slipStatus.includes('반려')
      if (isApprovalStatus) {
        Vue.$toast.info('승인된 전표는 반려가 불가능합니다!')
        return
      } if (isRejectStatus) {
        Vue.$toast.info('이미 반려된 전표가 있습니다!')
      } else {
        const rejectSlip = this.selectedSlip.map(newSlip => ({
          ...newSlip,
          slipStatus: '반려',
        }))
        const updateList = await this.APPROVAL_SLIP(rejectSlip)
        Vue.$toast.info(`전표번호 :${updateList.join()} 반려 되었습니다.`)
        this.initialSlipList()
      }
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
