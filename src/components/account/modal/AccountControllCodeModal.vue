<template>
  <div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      style=" float: right"
      @click="searchCode"
    >
      전체검색
    </b-button>
    <b-table
      :fields="fields"
      :items="accountControllCodeList"
      striped
      hover
      select-mode="single"
      selectable
      @row-selected="onRowSelected"
    />
  </div>

</template>

<script>
import { BButton, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    BTable,
    BButton,

  },

  directives: {
    Ripple,
  },
  data() {
    return {
      fields: ['accountControlType', 'accountControlName'],
    }
  },
  computed: {
    ...mapState('account/base', ['accountControllCodeList']),

  },
  // 모달창이 없어질떄 호출
  beforeDestroy() {
    this.CLEAR_ACCOUNT_CONTROLL_CODE_LIST()
  },
  methods: {
    ...mapMutations('account/base', ['CLEAR_ACCOUNT_CONTROLL_CODE_LIST']),
    ...mapActions('account/base', ['FETCH_ACCOUNT_CONTROLL_CODE']),
    // 전체검색
    searchCode() {
      this.FETCH_ACCOUNT_CONTROLL_CODE()
    },
    // 테이블 선택한 아이템 가져오기
    onRowSelected(selectedItem) {
      this.$emit('input', selectedItem)
    },
  },

}
</script>

<style scoped>

</style>
