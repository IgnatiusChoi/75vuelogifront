<template>
  <!-- success -->
  <div>
    <b-alert
      v-model="dialog"
      variant="success"
    >
      <h4 class="alert-heading">
        {{ emoji }}{{ title }}
      </h4>
      <div class="alert-body">
        <span>{{ firstLineText }}</span>
      </div>
    </b-alert>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Boolean,
    timeout: {
      type: Number,
      default: 1000,
    },
    emoji: String,
    title: String,
    firstLineText: String,
  },
  mounted() {
    console.log('마운트 되니?')
    setTimeout(() => {
      this.$store.dispatch('CLOSE_ALERT_DIALOG')
    }, this.timeout)
  },
  // destroyed() {
  //   console.log("destoyed")
  // },
}
</script>
