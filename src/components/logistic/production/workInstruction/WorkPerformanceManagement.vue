<template>

  <b-card
      no-body
      style="font-family: '배달의민족 도현'; max-height: 500px"
  >
    <div class="m-2">

      <h2 style="margin-bottom: 30px">생산실적관리</h2>
      <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchProductionPerformanceInfoList"
      >
        생산실적조회
      </b-button>

      <div style="margin-top: 30px">
        <b-table
            class="editable-table"
            hover
            selectable
            :sticky-header="true"
            show-empty
            empty-text="No matching records found"
            :select-mode="'single'"
            :fields="workPerformanceManagementList"
            :items="this.workPerformanceManagementListItem"
        />
      </div>

    </div>

  </b-card>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'
import {workPerformanceManagementList} from "@/components/logistic/production/fields";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  data: () => ({
    selected: '',
    selectMode: 'single',
    modal: false,
    workPerformanceManagementList
  }),
  computed: {
    ...mapState('logi/workInstruction', ['workPerformanceManagementListItem'])
  },
  methods: {
    ...mapActions('logi/workInstruction', ['SEARCH_PRODUCTION_PERFORMANCE_INFO_LIST']),
    searchProductionPerformanceInfoList() {

      console.log("뜨니?^^;;;;;;;;")
      this.SEARCH_PRODUCTION_PERFORMANCE_INFO_LIST()
      // this.$store.dispatch('logi/workInstruction/SEARCH_WORK_ORDER_LIST')
    },
  }
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>