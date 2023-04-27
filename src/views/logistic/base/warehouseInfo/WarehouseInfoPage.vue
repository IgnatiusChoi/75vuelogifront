<template>
  <!--  <h1> 여긴 창고 관리 페이지</h1>-->
  <warehouse-info></warehouse-info>
<!--<ware-test></ware-test>-->
</template>

<script>
import WarehouseInfo from "@/components/logistic/base/page/WareHouseInfo/WarehouseInfo.vue";
import WareTest from "@/components/logistic/base/page/WareHouseInfo/WareTest";
export default {
  name: "WarehouseInfoPage",
  components: {
    WarehouseInfo,
    WareTest

  }

}
</script>

<style scoped>

</style>
