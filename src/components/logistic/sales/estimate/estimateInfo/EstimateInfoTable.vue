<template>
  <div>
    <!-- 견적조회버튼 -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="searchDate"
    >
      견적조회
    </b-button>
    <!-- 조회 종류 선택 -->
    <div style="float: right; display: inline-flex">
      <b-row>
        <b-col md="6">
          <label for="example-input1">선택</label>
          <b-form-group>
            <v-select
              v-model="checked"
              style="width: 200px;"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :options="option"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- 조회날짜 시작일 -->
      <div style="display: inline-flex">
        <div>
          <label for="example-input1">시작일</label>
          <b-input-group
            class="mb-1"
            style="width: 200px"
          >
            <b-form-input
              id="example-input1"
              v-model="startD"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
              show-decade-nav
            />
            <b-input-group-append>
              <b-form-datepicker
                v-model="startD"
                show-decade-nav
                button-only
                right
                locale="en-US"
                aria-controls="example-input1"
                @context="onContext"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
        <!-- 조회날짜 종료일 -->
        <div>
          <label for="example-input2">종료일</label>
          <b-input-group
            class="mb-1"
            style="width: 200px"
          >
            <b-form-input
              id="example-input2"
              v-model="endD"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
              show-decade-nav
            />
            <b-input-group-append>
              <b-form-datepicker
                v-model="endD"
                show-decade-nav
                button-only
                right
                locale="en-US"
                aria-controls="example-input2"
                @context="onContext"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
    <!-- 그리드 -->
    <div
      class="scrollStyle"
      style="max-height: 300px; overflow-y: auto; width: 100%"
    >
      <b-table
        :items="estimateList"
        :fields="fields"
      />
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BTable, BFormDatepicker, BInputGroup,
  BInputGroupAppend, BFormInput,
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import Vuex, { mapState } from 'vuex'

export default {
  components: {
    BTable,
    BButton,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BRow,
    BCol,
    BFormGroup,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    ...mapState('logi/sales', ['estimateList']),
  },
  methods: {
    searchDate() {
      const payload = {
        startDate: this.$data.startD,
        endDate: this.$data.endD,
        dateSearchCondition: this.$data.checked.key,
      }
      console.log(payload)
      if (this.$data.startD !== '' && this.$data.endD !== '') {
        if (this.$data.checked.key === 'estimateDate') {
          this.$data.checked.key = 'estimateDate'
        } else if (this.$data.checked.key === 'effectiveDate') {
          this.$data.checked.key = 'effectiveDate'
        }
        console.log(`누구${payload}`)
        this.$store.dispatch('logi/sales/SEARCH_ESTIMATE_INFO', payload)
      } else {
        throw new Error('날짜 선택해라')
      }
      console.log(this.$data.startD)
      console.log(this.$data.endD)
      console.log(this.$data.checked.key)
      console.log(payload)
    },
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no - date - selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'estimateNo',
          label: '견적일련번호',
        },
        {
          key: 'customerCode',
          label: '거래처코드',
        },
        {
          key: 'estimateDate',
          label: '견적일자',
        },
        {
          key: 'contractStatus',
          label: '수주여부',
        },
        {
          key: 'estimateRequester',
          label: '견적요청자',
        },
        {
          key: 'effectiveDate',
          label: '유효일자',
        },
        {
          key: 'personCodeInChange',
          label: '견적담당자코드',
        },
        {
          key: 'description',
          label: '비고',
        },
      ],
      startD: '',
      endD: '',
      checked: '',
      dateSearchCondition: [],
      option: [{ key: 'estimateDate', label: '견적일자' }, { key: 'effectiveDate', label: '유효일자' }],
    }
  },
}
</script>
<style scoped; lang="scss">
.ss {
  float: right;
}

@import '@core/scss/vue/libs/vue-select.scss';
@import 'src/assets/scss/scrollStyle.scss';
</style>
