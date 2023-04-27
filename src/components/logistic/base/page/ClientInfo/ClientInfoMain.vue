<template>
  <div>
    <h1>거래처 정보</h1>

    <component :is="'b-card'">
      <b-tabs pills>
        <b-tab :active="isActive[0]" @click="activateTab(0)">
          <template #title>
            <feather-icon v-if="isActive[0]" icon="DiscIcon" size="16" class="mr-0 mr-sm-50"/>
            <feather-icon v-else icon="CircleIcon" size="16" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">일반 거래처</span>
          </template>
          <!-- 내용물 컴포넌트 -->
          <normal-client-info/> <!--가져온 vue 객체의 태그를 선언-->
        </b-tab>

        <b-tab :active="isActive[1]" @click="activateTab(1)">
          <template #title>
            <feather-icon v-if="isActive[1]" icon="DiscIcon" size="16" class="mr-0 mr-sm-50"/>
            <feather-icon v-else icon="CircleIcon" size="16" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">금융 거래처</span>
          </template>
          <!-- 내용물 컴포넌트 -->
          <finance-client-info/>
        </b-tab>
      </b-tabs>
    </component>
  </div>
</template>

<script>
import {BTab, BTabs, BCard,} from 'bootstrap-vue'
import FinanceClientInfo from "@/components/logistic/base/page/ClientInfo/FinanceClientInfo.vue";
import normalClientInfo from "@/components/logistic/base/page/ClientInfo/NormalClientInfo.vue";

export default {
  name: "ClientInfoMain",
  components: { /*현재 컴포넌트에서 다른 컴포넌트를 사용할 때 사용할 컴포넌트를 정의*/
    BTab,
    BTabs,
    BCard,
    FinanceClientInfo,
    normalClientInfo,
  },
  data() {
    return {
      isActive: [true, false] // 초기값으로 첫 번째 탭 활성화 상태로 설정
    }
  },
  methods: {
    activateTab(index) {
      this.isActive = this.isActive.map((value, i) => i === index)
    },
  }


}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
