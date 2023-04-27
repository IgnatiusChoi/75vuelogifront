<template>
  <div>
    <div>
      <b-button-group style="float: right">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchMrpGathering"
        >
          소요량취합 조회
        </b-button>
      </b-button-group>
    </div>
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
          발주/작업지시 기한
        </b-form-radio>
        <b-form-radio
          v-model="selected"
          selected
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="dueDate"
          inline
        >
          발주/작업지시 완료기한
        </b-form-radio>
      </b-form-group>
    </div>
    <div>
      <b-table
        :items="searchMrpGatheringList"
        class="editable-table"
        hover
        :fields="fields"
      />
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
import { mrpInfoList } from '@/components/logistic/production/fields'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Mps',
  components: {
    BCol,
    flatPickr,
    BFormGroup,
    BButtonGroup,
    BButton,
    BTable,
    BFormRadio,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      rangeDate: null,
      startDate: null,
      endDate: null,
      fields: mrpInfoList,
      selected: 'claimDate',
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
      this.$toast({
        component: ToastificationContent,
        props: {
          title: '조회 성공',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
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
</style>
