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
            @dblclick="editCell(rowIndex, colIndex)">

        <template #cell(actualCompletionAmount)="data">
          <b-form-input v-if="workOrderInfo[data.index].isEdit"
                        type="text"
                        v-model="workOrderInfo[data.index].actualCompletionAmount"
                        @blur="editCellBlur(data)" ></b-form-input>
          <span v-else @click="setEditIndex(data.index)">{{data.value}}</span>
        </template>
        </b-table>


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
    workOrderNo:'',
    requiredAmount: '',
    actualCompletionAmount:'',
    selectedCell: {
      item: null,
      field: null,
    },
    workOrderStatusList
  }),
  methods:{
    ...mapActions('logi/workInstruction', ['SEARCH_WORK_ORDER_INFO_LIST_STATUS','WORK_ORDER_COMPLETION', 'EDIT_CELL_BLUR']),

    searchWorkOrderListInfoStatus(){
      console.log('작업지시현황조회')
      //this.SEARCH_WORK_ORDER_LIST_INFO()
      this.$store.dispatch('logi/workInstruction/SEARCH_WORK_ORDER_INFO_LIST_STATUS')
    },
    workOrderStatusClick(payload){
      console.log('workOrderStatusClick')
      console.log(payload)
      this.requiredAmount = payload.requiredAmount
      this.workOrderNo = payload.workOrderNo,
      this.actualCompletionAmount = payload.actualCompletionAmount
    },

    workOrderCompletionClick(){
      console.log('workOrderCompletionClick')
      const sendData = {
        workOrderNo: this.workOrderNo,
        actualCompletionAmount: this.actualCompletionAmount
      }
      if(!this.workOrderNo){
        alert('행을 선택해주십시오')
      }
      console.log(this.actualCompletionAmount)
      console.log(this.requiredAmount)
      if(this.actualCompletionAmount === this.requiredAmount)
        this.WORK_ORDER_COMPLETION(sendData)
      else
        alert('값을 똑같게 입력하시오')
    },



    setEditIndex(index) {
      this.workOrderInfo[index].isEdit = true
    },

    editCellBlur(data){
      console.log("data가 뭐지?",data)
      this.workOrderInfo[data.index].isEdit = false
      // delete this.workOrderInfo[data.index].isEdit
      // 업데이트 하는 action을 불러
      //  workOrderNo ='WO20210702-418' + actualCompletionAmount = 100

      console.log("this.workOrderInfo[data.index",this.workOrderInfo[data.index])
      const dataList = {
        workOrderNo:this.workOrderNo,
        actualCompletionAmount:this.actualCompletionAmount
      }
      console.log("dataList=", dataList)
      this.EDIT_CELL_BLUR(dataList)
    }


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
