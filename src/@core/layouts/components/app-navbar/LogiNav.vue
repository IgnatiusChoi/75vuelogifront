<template>
  <div
    v-if="!this.logiConnect"
    class="bookmark-wrapper align-items-left d-lg-flex ml-2"
    style="font-family: '카페24 써라운드'; font-size: large; cursor: pointer"
    @click="nextPage"
  >
    <truck-icon
      size="1.1x"
      class="custom-class"
    />
    <span class="ml-50">물류</span>
  </div>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { CreditCardIcon, TruckIcon, UserIcon } from 'vue-feather-icons'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ logiConnect: state => state.logi.connect }),
  },
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    CreditCardIcon,
    UserIcon,
    TruckIcon,
  },
  methods: {
    nextPage() {
      console.log(this.logiConnect)

      /*      if (this.logiConnect === false) {
        this.$refs.logiTab.style.display = 'none'
      } else {
        this.$refs.logiTab.style.display = 'block'
      } */
      this.$store.commit('changeTab', 'logi')
    },
  },
}
</script>

<style scoped>

</style>
