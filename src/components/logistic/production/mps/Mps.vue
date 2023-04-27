<template>
  <div>
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      @click="registerMPS"
    >
      MPS 등록
    </b-button>
    <b-button-group style="float: right">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
        @click="searchContractDetailInMpsAvailable"
      >
        MPS등록 가능 조회
      </b-button>
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
        @click="test"
      >
        기능 없음
      </b-button>

    </b-button-group>
    <div
      style="margin: 0 0 10px 0; float:right;"
    >
      <b-col>
        <b-form-group>
          <flat-pickr
            v-model="rangeDate"
            placeholder="시작일 & 종료일"
            class="form-control"
            :config="{ mode: 'range'}"
          />
        </b-form-group>
      </b-col>
    </div>
    <div>
      <b-table
        :items="this.contractDetailList"
        class="editable-table"
        hover
        selectable
        :select-mode="'single'"
        :fields="fields"
        @row-selected="handleInput"
      >
        <template v-slot:cell(mpsPlanDate)="row">
          <b-form-group>
            <flat-pickr
              v-model="row.item.mpsPlanDate"
              class="form-control"
            />
          </b-form-group>
        </template>
        <template v-slot:cell(scheduledEndDate)="row">
          <b-form-group>
            <flat-pickr
              v-model="row.item.scheduledEndDate"
              class="form-control"
            />
          </b-form-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import BEditableTable from 'bootstrap-vue-editable-table'
import {
  BCol, BButtonGroup,
  BButton, BFormGroup, BTable, BFormInput,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import { Mps } from '@/components/logistic/production/fields'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Mps',
  components: {
    BEditableTable,
    BCol,
    flatPickr,
    BFormGroup,
    BButtonGroup,
    BButton,
    BTable,
    BFormInput,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      getContractDetail: null,
      contractDetail: null,
      mpsPlanDate: null,
      scheduledEndDate: null,
      rangeDate: null,
      startDate: null,
      endDate: null,
      fields: Mps,
    }
  },
  computed: {
    ...mapState('logi/mps', ['contractDetailList']),
    ...mapGetters('logi/mps', ['GET_CONTRACT_DETAIL']),
  },
  methods: {
    ...mapActions('logi/mps', ['SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE', 'CONVERT_CONTRACT_DETAIL_TO_MPS']),
    ...mapActions('common/utils', ['OPEN_ALERT_DIALOG']),
    /*    openAlert() {
      const alertDialogInfo = {
        timeout: 3000,
        emoji: '🙏🏻',
        title: '성공적으로 등록되었어요!',
        firstLineText: 'MRP로 넘어가세요!',
      }
      this.OPEN_ALERT_DIALOG(alertDialogInfo)
    }, */
    extractDate() {
      this.startDate = this.rangeDate.split('to')[0].trim()
      this.endDate = this.rangeDate.split('to')[1].trim()
    },
    searchContractDetailInMpsAvailable() {
      if (this.rangeDate == null) {
        throw new Error('날짜부터 고르고 진행하이소')
      }
      this.extractDate()
      const payload = { searchCondition: 'contractDate', startDate: this.startDate, endDate: this.endDate }
      this.SEARCH_CONTRACT_DETAIL_IN_MPS_AVAILABLE(payload)
    },
    handleInput(payload) {
      this.contractDetail = payload
    },
    registerMPS() {
      if (this.contractDetail[0].mpsPlanDate === null && this.contractDetail[0].scheduledEndDate === null) {
        throw new Error('계획일자, 출하예정일 선택')
      } else {
        this.CONVERT_CONTRACT_DETAIL_TO_MPS(this.contractDetail[0])
        this.$toast({
          component: ToastificationContent,
          props: {
            title: '등록 성공',
            icon: 'EditIcon',
            variant: 'success',
          },
        })
        // this.openAlert()
      }
    },
    test() {
      console.log(this.fields)
    },
  },
}
</script>
<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
table.editable-table {
  margin: auto;
}

table.editable-table td {
  vertical-align: middle;
}

.editable-table .data-cell {
  padding: 8px;
  vertical-align: middle;
}

.editable-table .custom-checkbox {
  width: 50px;
}

.name-col {
  width: 120px;
}

.department-col {
  width: 150px;
}

.age-col {
  width: 100px;
}

.date-col {
  width: 200px;
}

.is-active-col {
  width: 100px
}
</style>
