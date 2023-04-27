<template>
  <div class="paymentModal">
    <div class="overlay" />
    <div
      class="card"
      style=" min-height:300px; min-width: 500px; max-width: 80vw; border-radius: 10px;"
    >
      <b-card-header
              class="header"
        style="padding:13px 10px 0 0"
      >
        <slot name="header" />
      </b-card-header>
      <hr style="border-top:1px rgba(93, 93, 93, 0.5) solid; width:100%"/>

      <b-card-body class="modal-body">
        <slot name="body" />
      </b-card-body>

      <!--<hr style="border-top:1px rgba(93, 93, 93, 0.5) solid; width:100%"/>-->

      <b-card-footer class="modal-footer">
        <slot name="footer" />
      </b-card-footer>

    </div>
  </div>
</template>
<script>
  import { BDropdownDivider, BCard, BCardHeader, BCardBody, BCardFooter } from 'bootstrap-vue'
export default {
    components: {
      BDropdownDivider,
      BCard,
      BCardHeader, BCardBody, BCardFooter,
    }
}
</script>
<style lang="scss">
    @import '../../../assets/scss/modal';

</style>
