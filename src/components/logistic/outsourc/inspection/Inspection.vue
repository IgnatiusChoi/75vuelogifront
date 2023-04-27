<template>
  <div>

    <b-button
        style="float: right"
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
        @click="inpectionComplete"
    >
      외주 자재 검사 완료
    </b-button>

    <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        style="float: right"
        variant="outline-primary"
        @click="searchInspecionList"
    >
      외주 자재 실적 조회
    </b-button>
    <div>
      <b-table
          ref="selectableTable"
          :items="inspectionInfo"
          class="editable-tabdle"
          hover
          selectable
          :select-mode="'multi'"
          :fields="fields"
          @row-selected="handleInput"
      />
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
import {outsourceList} from '@/components/logistic/outsourc/fields'
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
      rowData:'',
    }
  },
  computed: {
    //...mapState('logi/order', ['orderList']),
    ...mapState('logi/outsource', ['inspectionInfo']),
  },
  methods: {
    //...mapActions('logi/order', ['SEARCH_ORDER_LIST']),
    ...mapActions('logi/outsource', ['searchOutsourcInfoList', 'searchInspecion', 'completeInspection']),
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
      this.rowData=payload
    },
    searchInspecionList() {
      console.log('외주 자재 실적 조회')
      this.searchInspecion()
    },
    inpectionComplete() {
      console.log('외주 자재 검사 완료')
      delete this.rowData.__ob__;
      console.log(this.rowData[0])
      const rowData = this.rowData[0]
      console.log(rowData)
      this.completeInspection(rowData)
    },
    OptionOrderOpen() {
      console.log('임의발주')
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