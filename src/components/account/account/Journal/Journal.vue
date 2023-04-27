<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>시작일</label>
            <b-form-input
              v-model="startDate"
              placeholder="Search"
              type="date"
              class="d-inline-block"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>종료일</label>
            <b-form-input
              v-model="endDate"
              placeholder="Search"
              type="date"
              class="d-inline-block"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <b-button
      variant="relief-primary"
      @click="searchJournal"
    >
      조회
    </b-button>

    <!-- table -->
    <vue-good-table
      ref="myTable"
      :columns="columns"
      :rows="journalList"
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
import {BAvatar, BButton, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow,} from 'bootstrap-vue'
import {VueGoodTable} from 'vue-good-table'
import {mapActions, mapState} from 'vuex'
import Vue from 'vue'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    VueGoodTable,
    // eslint-disable-next-line vue/no-unused-components
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    MenuSlipForm,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  data() {
    return {
      pageLength: 10,
      columns: [
        {
          label: '일자',
          field: 'reportingDate',
        },
        {
          label: '차변계정',
          field: 'leftAccountName',
        },
        {
          label: '차변금액',
          field: 'leftDebtorPrice',
        },
        {
          label: '대변계정',
          field: 'rightAccountName',
        },
        {
          label: '대변금액',
          field: 'rightCreditsPrice',
        },
        {
          label: '거래처',
          field: 'customerName',
        },
        {
          label: '적요',
          field: 'expenseReport',
        },
      ],
      rows: [],
      searchTerm: '',
      selectedArray: [],
      endDate: '',
      startDate: '',
    }
  },
  computed: {
    ...mapState('account/account', ['journalList']),

  },
  methods: {
    // 액션을 가져옴
    ...mapActions('account/account', ['SEARCH_JOURNAL']),
    // 검색
    // selectionChanged(params) {
    //   // const selectedSlip = params.selectedRows.map(v => v.slipStatus)
    // },
    /**
     * 날짜에 따른 분개징조회
     * 204 상태를 서버에서 보내준다 ( NO-CONTNET) 검색시 아무것도 발견하지 못했을때
     */
    async searchJournal() {
      const date = {
        startDate: this.startDate,
        endDate: this.endDate,
      }
      const response = await this.SEARCH_JOURNAL(date)
      if (response.status === 204) {
        Vue.$toast.info('검색결과가 존재하지 않습니다')
      }
    },

  },
}
</script>
<style lang="css">

</style>
