<template>

  <!--<div style="display: inline-flex">-->
  <div
    v-if="!this.accConnect"
    class="bookmark-wrapper align-items-left d-lg-flex ml-2"
    style="font-family: '카페24 써라운드'; font-size: large; cursor: pointer"
    @click="nextPage"
  >
    <credit-card-icon
      size="1.1x"
      class="custom-class"
    />
    <span class="ml-50">회계</span>
  </div>

</template>

<script>
import {
  BAvatar, BDropdownDivider, BDropdownItem, BNavItemDropdown,
} from 'bootstrap-vue'
import { BoxIcon, CreditCardIcon, UserIcon } from 'vue-feather-icons'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ accConnect: state => state.account.connect }),
  },
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    CreditCardIcon,
    UserIcon,
    BoxIcon,
  },
  methods: {
    nextPage() {
      console.log(this.accConnect)

      /*      if (this.logiConnect === false) {
        this.$refs.accTab.style.display = 'none'
      } else {
        this.$refs.accTab.style.display = 'block'
      } */
      this.$store.commit('changeTab', 'account')
    },
  },
}
</script>

<style scoped>

</style>
