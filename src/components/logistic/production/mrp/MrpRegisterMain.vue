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
          <span class="d-none d-sm-inline">MRP등록</span>
        </template>
        <!--  내용물 컴포넌트       -->
        <MrpRegister />
      </b-tab>

      <b-tab @click="searchMrpGatherList">
        <template #title>
          <feather-icon
            icon="CornerDownRightIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">소요량취합</span>
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
import MrpGather from '@/components/logistic/production/mrp/MrpGather'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    MrpRegister,
    MrpGather,
  },
  methods: {
    searchMrpGatherList() {
      this.$refs.MrpGather.searchMrpGatherList()
    },
  },
}
</script>
