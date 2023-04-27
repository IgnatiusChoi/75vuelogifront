<template>
  <div>
    <b-form-group label="Label">
      <b-form-radio-group v-model="selected" :options="options" />
    </b-form-group>
  </div>
</template>

<script>
import { BFormRadioGroup } from 'bootstrap-vue';

export default {
  components: {
    BFormRadioGroup,
  },
  data() {
    return {
      selected: '',
      options: [{ text: 'Option 1', value: '1' }, { text: 'Option 2', value: '2' }, { text: 'Option 3', value: '3' }],
    };
  },
};
</script>
