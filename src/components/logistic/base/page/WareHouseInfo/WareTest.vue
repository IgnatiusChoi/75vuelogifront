<template>
  <div>
    <my-child-component @hide-selected-data="hideSelectedData"></my-child-component>
    <button @click="hideSelectedData">Hide selected data</button>
  </div>
</template>

<script>
import MyChildComponent from './MyChildComponent.vue';

export default {
  components: {
    MyChildComponent
  },
  data() {
    return {
      selectedData: [] // 선택한 데이터를 저장할 배열
    };
  },
  methods: {
    hideSelectedData() {
      // 선택한 데이터 제거
      this.items = this.items.filter(item => !this.selectedData.includes(item));
      console.log(this.items)
      this.selectedData = []; // 선택된 데이터 배열 초기화
    }
  }
};
</script>
