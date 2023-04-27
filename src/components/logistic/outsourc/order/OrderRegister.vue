<template>
  <div>
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        style="float: right"
        variant="outline-primary"
        @click="searchOrderList"
      >
        외주 발주 등록 가능한 리스트 조회
      </b-button>


        <b-button
            style="float: right"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="OrderOpen"
        >
          외주 발주 등록
        </b-button>
    <div>
      <b-form-radio-group
          v-model="selected"
          :options="options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
          style="float: right"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
      >


        <div class="mt-3">Selected: {{ selected }}</div>
        <b-form-radio v-model="selected" name="some-radios" value="CLAIM_DATE">발주/작업지시 기한</b-form-radio>
        <b-form-radio v-model="selected" name="some-radios" value="DUE_DATE">발주/작업지시 완료기한</b-form-radio>
      </b-form-radio-group>
    </div>

      <div
        style="margin: 0 0 10px 0; float:right;"
      >
        <b-col>
          <b-form-group
          >
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
          ref="selectableTable"
          :items="outsourceGrid"
          class="editable-tabdle"
          hover
          selectable
          :select-mode="'multi'"
          :fields="fields"

          @row-selected="handleInput"
          >
        </b-table>
      </div>
  </div>
</template>

<script>
import {
  BCol, BButtonGroup,
  BButton, BFormGroup, BTable, BFormInput, BTab, BTabs,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import {orderList, outsourceList} from '@/components/logistic/outsourc/fields'
import { mapActions, mapState } from 'vuex'
import OrderRegister from "@/components/logistic/outsourc/order/OrderRegister";
import OrderInfo from "@/components/logistic/outsourc/order/OrderInfo";


export default {
  name: 'Mps',
  components: {
    BCol,
    flatPickr,
    BFormGroup,
    BButtonGroup,
    BButton,
    BTable,
    BFormInput,

    OrderRegister,
    OrderInfo

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      rangeDate: null,
      startDate: null,
      endDate: null,
      fields: outsourceList,
      selected: '',
      insertData:[],
    }
  },
  computed: {
    //...mapState('logi/order', ['orderList']),
    ...mapState('logi/outsource', ['outsourceGrid']),
  },
  methods: {
    //...mapActions('logi/order', ['SEARCH_ORDER_LIST']),
    ...mapActions('logi/outsource', ['searchOutsourcInfoList', 'insertOutsourcList', 'searchOutsourcList']),
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    extractDate() {
      this.startDate = this.rangeDate.split('to')[0].trim()
      this.endDate = this.rangeDate.split('to')[1].trim()
    },
    handleInput(payload) {
      this.insertData = [];
      console.log("로우클릭이벤트")
      console.log(payload)
      this.insertData = payload;
    },
    searchOrderList() {
      console.log('재고처리/발주필요 목록조회')
      if (this.rangeDate === null) {
        throw new Error('날짜입력')
      }

        else {
        this.extractDate()
        const date = { startDate: this.startDate, endDate: this.endDate, searchDateCondition:this.selected }
        console.log(date)
        this.searchOutsourcList(date)
      }
    },
    OrderOpen() {
      console.log('등록버튼')
      console.log(this.insertData)
      const insertData = Array.from(this.insertData)
      console.log("여기확인")
      console.log(insertData)
      this.insertOutsourcList(insertData)

    },
    OptionOrderOpen() {
      console.log('임의발주')
    },
    onPreviewClick(value, index, item) {
      // value == value of checkbox (ie. true or false, or whatever is stored in v-model)
      // index == visual index of row (i.e. the index of the row wrt the displayed rows)
      // item == the clicked row item data
    }
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