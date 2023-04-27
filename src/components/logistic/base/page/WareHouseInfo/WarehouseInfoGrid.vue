
<template>

  <!-- Table Container Card -->
  <b-card id="scrollStyle" no-body style="font-family: '배달의민족 도현'; overflow-x: scroll; max-height: 500px">
    <div class="m-2">

      <b-row>
        <!-- Table Top -->
        <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <slot name="header" />

        </b-col>
      </b-row>

      <b-row /></div>

    <b-table
        hover
        :sticky-header="true"
        :items="warehouseList"
        :fields="tableColumns"
        style="width: 1700px; overflow-y: scroll;"
        show-empty

        selectable
        :select-mode="'single'"
        @row-clicked="warehouseClick"

        empty-text="No matching records found"
        ref="heyTable"
    />

  </b-card>
</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
  BTableLite,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { mapActions, mapState } from 'vuex'
import vSelect from 'vue-select'

export default {
  components: {
    BCardCode,
    BTableLite,
    vSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
  },
  computed: {
    // ...mapActions('logi/sales', ['searchContract']), 메소드에 선언해야함
    ...mapState({

      warehouseList: state => state.logi.base.warehouseList,
      detailGrid: state => state.logi.base.detailGrid,
      tableColumns: state => state.logi.base.tableColumns,
    }),
  },
  data() {
    return {
      contractDetailRow: [],
      selectedRow:''
    }
  },

 methods: {
   warehouseClick(row, index) {
     console.log('warehouseClick')
     this.$emit("setValue2", row)
     this.selectedRow = row
     console.log("row", this.selectedRow)
     console.log(index)
     const idx = index
     this.warehouseCode = row.warehouseCode
     this.$store.dispatch('logi/stock/SEARCH_STOCK_DETAIL_LIST', row)
   },
 }
}
</script>

<style
    lang="scss"
    scoped
>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '/src/@core/scss/vue/libs/vue-select';

#scrollStyle::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: rgba(50,60,150,1);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
}

#scrollStyle::-webkit-scrollbar
{
  width: 10px;
  background-color: rgba(50,50,150,0);
}

#scrollStyle::-webkit-scrollbar-thumb
{
  background-clip: padding-box;
  border: 4px solid transparent;
  border-radius: 10px;

  background-color: #7367f0;
}
</style>
