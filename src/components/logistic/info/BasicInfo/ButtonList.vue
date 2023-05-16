<template>

  <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
    <b-button-group style="font-family: '배달의민족 도현'">

      <!-- 사업장 crud button-->

      <b-button
          v-show="activeButton==='workplace'"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="$emit('add')"
      >
        사업장 추가
      </b-button>

      <b-button
          v-if="activeButton==='workplace'"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="$emit('delete')"
      >
        사업장 삭제
      </b-button>
      <b-button
          v-if="activeButton==='workplace'"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          @click="$emit('edit')"
      >
        사업장 수정
      </b-button>
      <!-- 사업장 crud button 끝 -->


      <b-button
          v-if="activeButton=== ''"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style=" float: right"
          @click="$emit('submitResult')"
      >저장
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
  props: ['activeButton'],

  methods: {

    addWorkplace() {
      this.$router.push({ name: 'addSlipForm' })
    },

  },
}
</script>
<style scoped>
.ss{
  float: right;
}
</style>
