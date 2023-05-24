<template>
  <div>
    <h1> 품목 관리 </h1>

    <b-button variant="primary" class="mr-1" @click="searchItemList">조회</b-button>
    <b-button variant="primary" class="mr-1" @click="OpenAddModal">추가</b-button>
    <b-button variant="primary" class="mr-1" @click="OpenUpdateModal">수정</b-button>
    <b-button variant="primary" class="mr-1" @click="deleteItem">삭제</b-button>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          :select-mode="selectMode"
          responsive
          selectable
          :items="itemList"
          :fields="this.tableColumns"
          class="mb-0 scrollStyle"
          @row-selected="onRowSelected"
      />
    </div>
    <addModal v-if="addModalPage" @close="addModalPage=false"></addModal>
    <updateModal v-if="updateModalPage" @close="updateModalPage=false" :itemTable="selectedItem"></updateModal>
  </div>

</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend, BTab, BTabs,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import addModal from '@/components/logistic/base/page/ItemInfo/AddItemModal.vue'
import updateModal from '@/components/logistic/base/page/ItemInfo/UpdateItemModal.vue'
export default {
  components: {
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
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BFormRadioGroup,
    BCardText,
    BTab, BTabs,
    addModal,
    updateModal
  },
  data() {
    return {
        tableColumns: [
          { key: 'itemCode', label: '품목코드', sortable: true },
          { key: 'itemName', label: '품목명', sortable: true },
          { key: 'itemGroupCode', label: '품목군코드', sortable: true },
          { key: 'itemClassification', label: '품목분류', sortable: true },
          { key: 'unitOfStock', label: '단위', sortable: true },
          { key: 'LossRate', label: '손실율', sortable: true },
          { key: 'leadTime', label: '소요일', sortable: true },
          { key: 'standardUnitPrice', label: '표준단가', sortable: true },
          { key: 'description', label: '비고', sortable: true },
        ],
        selectMode: 'single',
        selectedItem: '',
        addModalPage: false,
        updateModalPage: false
      }
  },
  setup() {
  },
  created() {
  },
  computed: {
    ...mapState('logi/base', ['itemList'])
  },
  methods: {
    OpenAddModal(){
      this.addModalPage=true
    },
    OpenUpdateModal(){
      this.updateModalPage=true
    },
    searchItemList(){
      this.$store.dispatch('logi/base/searchItemList')
    },
    onRowSelected(item){
      this.selectedItem=item[0]
      console.log(this.selectedItem)
    },
    deleteItem(){
      const payload = this.selectedItem
      payload.status="DELETE"
      console.log(payload)
      this.$store.dispatch('logi/base/DELETE_ITEM',payload).then(this.$swal.fire(
          '삭제 완료!',
          '품목 삭제가 완료되었습니다.',
          'success',
      ))
    }
  },
  mounted() {
    this.$store.dispatch('logi/base/resetItemList')
  }
}
</script>
