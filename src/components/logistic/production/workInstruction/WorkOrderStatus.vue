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
    >
      작업지시현황조회
    </b-button>
    <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="outline-primary"
    >
      작업완료등록
    </b-button>

    <div style="margin-top: 30px">
      <b-table
          class="editable-table"
          hover
          selectable
          show-empty
          empty-text="No matching records found"
          :select-mode="'single'"
          :fields="workOrderStatusList"
      />
    </div>

  </div>

  </b-card>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'
import {workOrderStatusList} from "@/components/logistic/production/fields";

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
    workOrderStatusList
  }),
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>