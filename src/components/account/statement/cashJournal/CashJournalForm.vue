<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>시작일</label>
            <b-form-input
              v-model="startDate"
              class="d-inline-block"
              placeholder="Search"
              type="date"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>종료일</label>
            <b-form-input
              v-model="endDate"
              class="d-inline-block"
              placeholder="Search"
              type="date"
            />
          </b-form-group>

        </b-col>
        <b-col>
          <b-button
            style="margin: 24px"
            variant="relief-primary"
            @click="searchJournal"
          >
            조회
          </b-button>
        </b-col>
      </b-row>

    </div>

    <!-- table -->
    <div>
      <vue-good-table
        ref="myTable"
        :columns="columns"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
        :rows="cashJournalList"
        theme="black-rhino"
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
                :per-page="pageLength"
                :total-rows="props.total"
                :value="1"
                align="right"
                class="mt-1 mb-0"
                first-number
                last-number
                next-class="next-item"
                prev-class="prev-item"
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
    </div>
  </div>
</template>

<script>

import {
  BAvatar, BButton, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'
// eslint-disable-next-line import/extensions
import AccountCodeModal from '../../modal/AccountCodeModal'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AccountCodeModal,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BTable,

    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  data() {
    return {
      pageLength: 10,
      columns: [
        {
          label: '해당월',
          field: 'monthReportingDate',
        },
        {
          label: '일자',
          field: 'reportingDate',
        },
        {
          label: '적요',
          field: 'expenseReport',
        },
        {
          label: '거래처',
          field: 'customerCode',
        },
        {
          label: '거래처명',
          field: 'customerName',
        },
        {
          label: '입금',
          field: 'deposit',
        },

        {
          label: '출금',
          field: 'withdrawal',
        },
        {
          label: '잔액',
          field: 'balance',
        },

      ],
      rows: [],
      searchTerm: '',
      endDate: '',
      startDate: '',

    }
  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/statement', ['cashJournalList']),

  },
  /**
   * 컴포넌트가 사라질때 호출되는 훅
   */
  beforeDestroy() {
    this.CLEAR_CASH_JOURNAL_LIST()
  },

  methods: {
    ...mapMutations('account/statement', ['CLEAR_CASH_JOURNAL_LIST']),
    ...mapActions('account/statement', ['FETCH_CASH_JOURNAL_LIST']),

    /**
     * 날짜에 따른 일 월계표 조회
     * 204 상태를 서버에서 보내준다 ( NO-CONTNET) 검색시 아무것도 발견하지 못했을때
     * 유효성체크
     */
    async searchJournal() {
      if (this.startDate === '' || this.endDate === '') {
        Vue.$toast.info('검색일자를 정해주세요~')
        return
      }
      const searchData = {
        startDate: this.startDate,
        endDate: this.endDate,
      }
      const response = await this.FETCH_CASH_JOURNAL_LIST(searchData)
      if (response.status === 204) {
        Vue.$toast.info('검색결과가 존재하지 않습니다')
      }
    },

  },
}
</script>
<style lang="css">

</style>
