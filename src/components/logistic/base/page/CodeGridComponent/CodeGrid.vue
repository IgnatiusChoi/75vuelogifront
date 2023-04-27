<template>
  <b-card
      no-body
      style="font-family: '배달의민족 도현'; max-height: 1000px"
      class="scrollStyle"
  >
    <div class="m-2">
      <b-row>

        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <template v-for="button in buttonlist">
            <b-button
                variant="primary"
                size="md"
                class="mr-1"
                @click="button.clickEvent"
            >
              {{button.value}}
            </b-button>
          </template>
        </b-col>
      </b-row>
    </div>

    <b-row />
    <div
        style="overflow-y: auto; overflow-x: auto; max-height: 410px;"
        class="scrollStyle"
    >
      <b-table
          ref="table"
          :items="codeList"
          :fields="tableColumnsData"
          style="overflow: auto; width: 100%; "
          show-empty
          empty-text="No matching records found"
          selectable
          :select-mode="selectMode"
          :sticky-header="true"
          @row-selected="onRowSelected"
          @row-clicked="itemCodeClick"
      />
    </div>
    <div class="mx-2 mb-2">
      <b-row />
    </div>
    <transition
        name="fade"
        mode="out-in"
    >
      <TableEditModal
          v-if="tableEditModal"
          :table-row-data="tableColumnsData"
          @close="closeEditModal"
          @input-modal="inputModal"
          @ok="inputDataModal"
      />
    </transition>
  </b-card>
</template>

<script>

import TableEditModal from "@/components/common/modal/TableEditModal.vue";
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCol, BDropdown, BDropdownItem, BFormDatepicker,
  BFormInput, BInputGroup, BInputGroupAppend,
  BLink,
  BMedia, BPagination,
  BRow,
  BTable,
  BTableLite, BTooltip
} from "bootstrap-vue";
import vSelect from "vue-select";
import {mapMutations, mapState} from "vuex";

export default{
  components: {
    TableEditModal,
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
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
  },
  props: ['title', 'buttonlist', 'datepicker', 'searchCustomer', 'gridType', 'columnWidth', 'onlyOne'],
  computed: {
    ...mapState({
      grid: state => state.grid,
      tableColumns: state => state.tableColumns,
      codeList: state => state.logi.base.codeList
    }),
  },
  data(){
    return {
      divisionCodeNo:'',
      divisionCodeName:'',
      description:'',
      codeType:'',
      codeChangeAvailable:'',
      gridData:[],
      tableColumnsData: [],
      startDate: '',
      endDate: '',
      searchMethod: '',
      registMethod: '',
      selectMode: 'single',
      customerCode:'',
      selectOption: [
        'single', 'multiple',
      ],
      componentState: '',
      tableEditModal: false,
    }
  },
  watch: {
    grid() {
      if (this.gridType === 'grid') {
        this.gridData = this.grid
      }
    },
  },
  created() {
    if (this.buttonlist !== undefined) {
      this.buttonlist.map(e => {
        if (e.event === 'add') {
          e.clickEvent = this.addButton
        } else if (e.event === 'search') {
          e.clickEvent = this.searchButton
        } else if (e.event === 'delete') {
          e.clickEvent = this.deleteButton
        } else if (e.event === 'save') {
          e.clickEvent = this.saveButton
        }
      })
    }
    if (this.gridType === 'grid') {
      this.gridData = this.grid
      this.tableColumnsData = this.tableColumns
      this.componentState = 'grid'
    }
  },
  mounted() {
    /*    if (this.columnWidth === undefined) {
      this.$refs.table.style.width = this.columnWidth
    } */
  },
  methods: {
    ...mapMutations('logi/base', ['ADD_DIVISION_CODE_NO']),
    addButton() {
      console.log('추가버튼')
      this.tableEditModal = true
    },
    saveButton() {
      console.log('저장버튼')
      this.$emit('regist-data')
    },
    searchButton() {
      console.log('조회버튼')
      this.$emit('find-data')
    },
    deleteButton(){
      console.log('삭제버튼')
      let divisionCodeNo=this.divisionCodeNo
      if(!divisionCodeNo){
        alert("행을 눌러요")
        return
      }
      this.$emit('delete-data', divisionCodeNo)
    },
    onRowSelected(val) {
      this.$emit('row-selected',val)
    },
    closeEditModal(){
      this.tableEditModal = false
    },
    inputModal(rowData) {
      const row = {}
      row.rowData = rowData
      console.log("모달 rowData:::",row.rowData)
      row.gridType = this.gridType
      console.log("모달 gridType:::",row.gridType)
      this.$emit('input-modal', rowData)
      console.log('마지막emit::',rowData)
      console.log('코드리스트',this.codeList)
      this.tableEditModal = false
      this.ADD_DIVISION_CODE_NO(rowData) //확인하기
    },
    inputDataModal(){

    },
    itemCodeClick(item) {
      console.log("itemCodeClick 실행")
      console.log("itemList::::",item)
      console.log("item",item.divisionCodeNo)
      this.divisionCodeNo=item.divisionCodeNo
    }
  },
}

</script>

<style lang="scss">
@import '/src/@core/scss/vue/libs/vue-select';
@import '../../../../../assets/scss/modal';
@import '../../../../../assets/scss/scrollStyle';
</style>