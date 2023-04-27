<template>
  <component :is="'b-card'">
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
          <span class="d-none d-sm-inline">BOM 정전개/역전개</span>
        </template>
        <!-- 내용물 컴포넌트 -->
        <Deploy /> <!--가져온 vue 객체의 태그를 선언-->
      </b-tab>

      <b-tab >
        <template #title>
          <feather-icon
              icon="CornerDownRightIcon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">BOM 등록/수정</span>
        </template>
        <!-- 내용물 컴포넌트 -->
        <Regist/>
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard,
} from 'bootstrap-vue'

import Deploy from "@/views/logistic/purchase/LogisticsBOM/Deploy/Deploy"; /*현 vue 안에 넣을 vue 객체를 import*/
import Regist from "@/views/logistic/purchase/LogisticsBOM/Regist/Regist";

export default {
  name: 'Bom', /*뷰객체 이름*/
  components: { /*현재 컴포넌트에서 다른 컴포넌트를 사용할 때 사용할 컴포넌트를 정의*/
    Regist,
    Deploy,
    BTab,
    BTabs,
    BCard,
  },
}
</script>

<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>