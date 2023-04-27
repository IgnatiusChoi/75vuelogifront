<template>
  <div>
    <component>
      <b-tabs pills>
        <b-tab
            active
        >
          <template #title>
            <feather-icon
                icon="CornerDownRightIcon"
                size="16"
                class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">외주 발주 등록</span>
          </template>
          <!--          내용컴포넌트-->
          <OrderRegister/>
        </b-tab>

        <b-tab @click="searchMrpGatherList">
          <template #title>
            <feather-icon
                icon="CornerDownRightIcon"
                size="16"
                class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">외주 발주 조회</span>
          </template>
          <!--          내용컴포넌트-->
          <OrderInfo/>
        </b-tab>

      </b-tabs>
    </component>
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
    }
  },
  computed: {
    ...mapState('logi/order', ['orderList']),
  },
  methods: {
    ...mapActions('logi/order', ['SEARCH_ORDER_LIST']),
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
      this.contractDetail = payload
    },
    searchOrderList() {
      console.log('재고처리/발주필요 목록조회')
      if (this.rangeDate === null) {
        throw new Error('날짜입력')
      } else if (this.startDate === null || this.endDate === null) {
        throw new Error('날짜 범위 선택')
      } else {
        this.extractDate()
        const date = { startDate: this.startDate, endDate: this.endDate }
        this.SEARCH_ORDER_LIST(date)
      }
    },
    OrderOpen() {
      console.log('모의재고처리 및 취합발주')
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
