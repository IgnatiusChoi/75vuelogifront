<template>
  <component :is="'b-card'">
    <b-tabs pills  style="font-family: '배달의민족 도현';">
      <b-tab
        active
      >
        <template #title>
          <feather-icon
            icon="CornerDownRightIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline" style="font-size: 18px;">MRP 등록</span>
        </template>

        <!--  수주 / 판매계획 별   -->
        <div style=" margin: 15px 0 15px 150px">
        <input type="radio" id="radioA" name="radio" value="a" v-model="selectedOption" @click="handleChange" />
        <label for="radioA" style="font-size: 15px; margin-right: 10px">&nbsp; 수주로 MPS 등록 건</label>
        <input type="radio" id="radioB" name="radio" value="b" v-model="selectedOption" @click="handleChange" />
        <label for="radioB" style="font-size: 15px">&nbsp; 판매계획으로 MPS 등록 건</label>
        </div>
        <component :is="selectedComponent" />
      </b-tab>

      <b-tab @click="searchMrpGatherList">
        <template #title>
          <feather-icon
            icon="CornerDownRightIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline" style="font-size: 18px;">품목별 조달 계획</span>
        </template>

        <MrpGather
          ref="MrpGather"
        />
      </b-tab>

    </b-tabs>
  </component>
</template>
<script>
import {
  BTab, BTabs, BCard,
} from 'bootstrap-vue'

import MrpRegister from '@/components/logistic/production/mrp/MrpRegister'
import MrpRegisterBySalesPlan from '@/components/logistic/production/mrp/MrpRegisterBySalesPlan'
import MrpGather from '@/components/logistic/production/mrp/MrpGather'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    MrpRegister,
    MrpRegisterBySalesPlan,
    MrpGather,
  },
  data(){
    return {
      selectedOption : 'a',
    }
  },
  computed: {
    selectedComponent() {
      if (this.selectedOption === 'a') {
        return 'MrpRegister';
      } else if (this.selectedOption === 'b') {
        return 'MrpRegisterBySalesPlan';
      }
      return null;
    },
  },
  methods: {
    searchMrpGatherList() {
      this.$refs.MrpGather.searchMrpGatherList()
    },
    handleChange() {
      if (this.selectedOption === 'a') {
        this.selectedComponent = 'MrpRegister';
      } else if (this.selectedOption === 'b') {
        this.selectedComponent = 'MrpRegisterBySalesPlan';
      }
    },
  },
}
</script>
