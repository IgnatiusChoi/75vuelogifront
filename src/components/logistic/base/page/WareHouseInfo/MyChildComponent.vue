<template>
  <b-table :items="items" @row-clicked="onRowClicked" ref="hideSelectedData"></b-table>
</template>

<script>
export default {
  data() {
    return {
      selectedData: [], // 선택된 데이터 저장 배열
      items: [
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' },
        { id: 3, name: 'item 3' }
      ]
    };
  },
  methods: {
    onRowClicked(item) {
      console.log(item)
      this.selectedData.push(item); // 선택한 데이터를 배열에 추가
    }
  }
};
</script>
