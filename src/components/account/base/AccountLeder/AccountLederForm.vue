<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>계정조회</label>
            <b-form-input
              v-model="accountCode"
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @click="searchAccountCode"
            />
          </b-form-group>
        </b-col>
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
    <div>

      <vue-good-table
        ref="myTable"
        :columns="columns"
        :rows="GET_ACCOUNT_LEDER_LIST"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
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
    </div>
    <!-- 계정코드 , 계정명 전용 모달-->
    <b-modal
      id="accountCode"
      ref="accountModal"
      title="계정코드 찾기"
    >
      <p class="my-5">
        <AccountCodeModal
          v-model:value="accountCode"
          condition="accountCode"
        />
      </p>
    </b-modal>

  </div>
</template>

<script>

import {
  BButton, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex'
import Vue from 'vue'
// eslint-disable-next-line import/extensions
import AccountCodeModal from '../../modal/AccountCodeModal'

export default {
  components: {
    AccountCodeModal,
    BButton,
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
          label: '분개등록일자',
          field: 'reportingDate',
        },
        {
          label: '계정명',
          field: 'accountName',
        },
        {
          label: '차변금액',
          field: 'leftDebtorPrice',
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
      fields: ['accountInnerCode', 'accountName'],
      rows: [],
      searchTerm: '',
      endDate: '',
      startDate: '',
      accountCode: '',
    }
  },
  computed: {
    ...mapState('account/base', ['accountLederList']),
    ...mapGetters('account/base', ['GET_ACCOUNT_LEDER_LIST']),

  },
  beforeDestroy() {
    this.CLEAR_ACCOUNT_LEDGER_LIST()
  },
  methods: {
    // 액션을 가져옴
    ...mapActions('account/base', ['FETCH_ACCOUNT_LEDGER']),
    ...mapMutations('account/base', ['CLEAR_ACCOUNT_LEDGER_LIST']),
    /**
     * 계정과목 모달 띄우기
     */
    searchAccountCode() {
      this.$root.$emit('bv::show::modal', 'accountCode', '#focusThisOnClose')
    },

    /**
     * 날짜에 따른 분개징조회
     * 204 상태를 서버에서 보내준다 ( NO-CONTNET) 검색시 아무것도 발견하지 못했을때
     * 유효성체크
     */
    async searchJournal() {
      if (this.startDate === '' || this.endDate === '') {
        Vue.$toast.info('검색일자를 정해주세요~')
        return
      } if (this.accountCode === '') {
        Vue.$toast.info('계정코드를 입력주세요~')
        return
      }
      const searchData = {
        startDate: this.startDate,
        endDate: this.endDate,
        accountCode: this.accountCode,
      }
      const response = await this.FETCH_ACCOUNT_LEDGER(searchData)
      if (response.status === 204) {
        Vue.$toast.info('검색결과가 존재하지 않습니다')
      }
    },
  },
}
</script>
<style lang="css">

</style>
