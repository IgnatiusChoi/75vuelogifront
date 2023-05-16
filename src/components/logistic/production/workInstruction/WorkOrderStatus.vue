<template>

  <b-card
      no-body
      style="font-family: '배달의민족 도현'; max-height: 500px"
  >
    <div class="m-2">

      <h2 style="margin-bottom: 30px">작업지시현황</h2>
      <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchWorkOrderListInfoStatus"
      >
        작업지시현황조회
      </b-button>
      <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="workOrderCompletionClick"
      >
        작업완료등록
      </b-button>

      <div style="margin-top: 100px">
        <b-table
            class="editable-table"
            hover
            selectable
            :sticky-header="true"
            show-empty
            empty-text="No matching records found"
            :select-mode="'single'"
            :fields="workOrderStatusList"
            :items="workOrderInfo"
            @row-clicked="workOrderStatusClick"
        />
      </div>

    </div>

  </b-card>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'
import {workOrderStatusList} from "@/components/logistic/production/fields";
import {mapActions, mapState} from "vuex";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  name: "workOrderStatusList",
  data: () => ({
    selected: '',
    selectMode: 'single',
    modal: false,
    workSiteCode : '',
    workOrderStatusList
  }),
  methods:{
    ...mapActions('logi/workInstruction', ['SEARCH_WORK_ORDER_INFO_LIST_STATUS']),

    searchWorkOrderListInfoStatus(){
      console.log('작업지시현황조회')
      //this.SEARCH_WORK_ORDER_LIST_INFO()
      this.$store.dispatch('logi/workInstruction/SEARCH_WORK_ORDER_INFO_LIST_STATUS')
    },
    workOrderStatusClick(payload){
      console.log('workOrderStatusClick')
      console.log(payload)
      this.workSiteCode = payload.workSiteCode
    },
    workOrderCompletionClick(){
      console.log('workOrderCompletionClick', this.workSiteCode)




    }
//     console.log('작업시지 모의 전개',this.mrpNo)
//     const sendData={
//       mrpNo: this.mrpNo,
//       mrpGatheringNo: this.mrpGatheringNo
//     }
//     if(!this.mrpNo){
//   alert("행을 선택해주십시오")
//   return;
// }
// this.SHOW_WORK_ORDER_DIALOG(sendData)


  },
  computed: {
    ...mapState({
      workOrderInfo: state => state.logi.workInstruction.workOrderInfo
    }),
  }
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
