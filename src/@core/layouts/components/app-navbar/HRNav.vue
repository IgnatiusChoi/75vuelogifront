<template>
  <div
    v-if="!this.hrConnect"
    class="bookmark-wrapper align-items-left d-lg-flex ml-2"
    style="font-family: '카페24 써라운드'; font-size: large; cursor: pointer"
    @click="nextPage"
  >
    <user-icon
      size="1.1x"
      class="custom-class"
    />
    <span class="ml-50">인사</span>
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
    ...mapState({ hrConnect: state => state.hr.connect }),
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
      console.log('라우터')
      console.log(this.hrConnect)
      /*      if (this.hrConnect === false) {
        this.$refs.hrTab.style.display = 'none'
      } else {
        this.$refs.hrTab.style.display = 'block'
      } */
      this.$store.commit('changeTab', 'hr')
    },
  },
}
</script>

<style scoped>

</style>
