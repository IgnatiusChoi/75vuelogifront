<template>
  <div style="font-family: '배달의민족 도현';">
    <div
      style="margin: 0 0 10px 0; float:left;"
    >
      <b-col>
<!--        <MonthPickerInput-->
<!--            style="font-size: 15px"-->
<!--            class="custom-placeholder"-->
<!--            placeholder="        조회 월 선택" no-default="true"/>-->
<!--        <b-form-group>-->
<!--          <flat-pickr-->
<!--            v-model="rangeDate"-->
<!--            placeholder="조회 날짜 (기간)선택"-->
<!--            class="form-control custom-placeholder"-->
<!--            :config="{ mode: 'range'}"-->
<!--          />-->
<!--        </b-form-group>-->
      </b-col>
    </div>
    <div style="float: left; margin:  10px 0 0 0 ;">
      <b-form-group
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="claimDate"
          inline
        >
          발주/작업 지시일
        </b-form-radio>
        <b-form-radio
          v-model="selected"
          selected
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="dueDate"
          inline
        >
          납기일
        </b-form-radio>
      </b-form-group>
    </div>
    <div>
      <b-button-group style="float: left">
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="searchMrpGathering"
        >
          소요량취합 조회
        </b-button>

        <!--  화면 중상단 설명구  -->
        <span class="alert-class">
    {{alert}}
    </span>
        <!--  화면 중상단 설명구  -->
      </b-button-group>


    <div>
      <b-button-group style="float: right">
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="linkToOrder"
        >
          발주 페이지로
        </b-button>
      </b-button-group>
    </div>
    <div>
      <b-button-group style="float: right">
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="linkToWorkOrder"
        >
          작업지시 페이지로
        </b-button>
      </b-button-group>
    </div>
  </div>

    <div>
      <b-table/>
    </div>
  </div>
</template>

<script>
import {
  BCol, BButtonGroup,
  BButton, BFormGroup, BTable, BFormRadio,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import {mrpGatheringList} from '@/components/logistic/production/fields'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapState } from 'vuex'

import {MonthPickerInput} from "vue-month-picker";
export default {
  name: 'MrpGatheringInfo',
  components: {
    BCol,
    flatPickr,
    BFormGroup,
    BButtonGroup,
    BButton,
    BTable,
    BFormRadio,
    MonthPickerInput,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      rangeDate: null,
      startDate: null,
      endDate: null,
      fields: mrpGatheringList,
      selected: 'claimDate',
      alert : '',
    }
  },
  computed: {
    ...mapState('logi/mrp', ['searchMrpGatheringList']),
  },
  methods: {
    ...mapActions('logi/mrp', ['SEARCH_MRP_GATHERING']),
    extractDate() {
      this.startDate = this.rangeDate.split('to')[0].trim()
      this.endDate = this.rangeDate.split('to')[1].trim()
    },
    searchMrpGathering() {
      if (this.rangeDate === null && this.rangeDate.length < 10) {
        throw new Error('날짜 선택하셈')
      }
      console.log(this.rangeDate.length)
      this.extractDate()
      const payload = {
        searchDateCondition: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.SEARCH_MRP_GATHERING(payload)
      this.alert = '단순 조회 페이지임 발주, 작업지시는 링크따라 이동 👉👉👉'
      this.$toast({
        component: ToastificationContent,
        props: {
          title: '조회 성공',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
    linkToOrder(){
      this.$router.push('/logi/purchase/orderRegister')
    },
    linkToWorkOrder(){
      this.$router.push('/logi/production/WorkInstruction')
    },
    test() {
      console.log(mrpInfoList)
      console.log(this.searchMrpGatheringList)
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

.custom-placeholder::placeholder {
  color: #ed5017;
  text-align: center;
}

.alert-class {
  margin: 10px 0 0 100px;
  color: rgba(255, 4, 4, 0.7);
  font-size : 15px;
  font-weight: bold;
  font-family: "배달의민족 도현";

}
</style>
