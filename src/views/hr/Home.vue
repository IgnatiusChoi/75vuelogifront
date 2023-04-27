<template>
  <div style="font-family: '카페24 써라운드'">
    <b-card title="Kick start your project 🚀">
      <b-card-text>인사관리 페이지입니다</b-card-text>
      <b-card-text>업무관련은 아래로 연락해주세요<b-link
        href="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/"
        target="_blank"
      >
        문의 페이지.
      </b-link> 저녁 7시 이후로는 급한용무만 관리자에게 연락 바랍니다.</b-card-text>
    </b-card>

    <b-card title="Want to integrate JWT? 🔒">
      <b-card-text>We carefully crafted JWT flow so you can implement JWT with ease and with minimum efforts.</b-card-text>
      <b-card-text>Please read our  JWT Documentation to get more out of JWT authentication.</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'
import { mapState } from 'vuex'


export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  created() {
    this.GET_COMPANY_CODE()
  },
  ...mapState({
    companyInfo: state => state.auth.companyInfo,
  }),
}

</script>

<style>

</style>
