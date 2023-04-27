<template>
  <div>
    <h1> 여긴 거래처 관리 페이지</h1>
    <hr>
    <div style="background-color: navajowhite">
    <client-info-main></client-info-main>
    </div>
  </div>
</template>

<script>
import clientInfoMain from '@/components/logistic/base/page/ClientInfo/ClientInfoMain.vue'
export default {
  name: "ClientInfo",
  components: {clientInfoMain}
}
</script>

<style scoped>

</style>
