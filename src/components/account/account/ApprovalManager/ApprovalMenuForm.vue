<template>
  <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
    <b-button-group>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        v-b-modal.openAddSlipModal
        variant="primary"
        @click="$emit('approvalSlip')"
      >전표승인
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        style=" float: right"
        @click="$emit('rejectSlip')"
      >전표반려
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
import {
  BButtonToolbar, BButtonGroup, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButtonToolbar,
    BButtonGroup,
    BButton,

  },
  directives: {
    Ripple,
  },
  props: [],

  methods: {

  },
}
</script>
<style scoped>
.ss{
  float: right;
}
</style>
