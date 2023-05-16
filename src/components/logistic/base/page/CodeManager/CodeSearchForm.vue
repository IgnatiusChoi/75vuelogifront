<template>
  <div>
    <CodeGrid
        grid-type="grid"
        :buttonlist="buttonList"
        title="코드관리"
        column-width="3000px"
        only-one="true"
        @row-selected="showGridData"
        @find-data="getGridData"
        @input-modal="gridInputModal"
        @regist-data="registData"
        @delete-data="deleteData"
    />
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BButton,
  BCard, BCardText,
  BCol,
  BDropdown,
  BDropdownItem, BFormDatepicker, BFormGroup,
  BFormInput, BFormRadioGroup, BInputGroup, BInputGroupAppend,
  BLink,
  BMedia, BPagination,
  BRow,
  BTable, BTooltip
} from "bootstrap-vue";
import BEditableTable from "bootstrap-vue-editable-table";
import CodeGrid from '@/components/logistic/base/page/CodeGridComponent/CodeGrid.vue'
import {mapState} from "vuex";

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
    BEditableTable,
    BFormRadioGroup,
    BCardText,
    BFormGroup,

    CodeGrid
  },
  computed: {
    ...mapState({
      grid: state=>state.grid,
      codeList: state=>state.logi.base.codeList,
    })
  },
  data: ()=>({
    divisionCodeNo: '',
    divisionCodeName: '',
    description: '',
    codeType: '',
    codeChangeAvailable: '',
    selected: '',
    selectData: [],
    buttonList:
        [
          {
            value: '조회',
            event: 'search',
          },
          {
            value: '추가',
            event: 'add',
          },
          {
            value: '삭제',
            event: 'delete',
          },
          {
            value: '저장',
            event: 'save',
          },
        ]

  }),
  created(){
    let dataList=[]
    this.codeList.map(e=>{
      const {divisionCodeNo}=e
      dataList.push({text: divisionCodeNo, value: divisionCodeNo})
    })
    const tableColumns=[{
      tableColumns:[
        {key: 'divisionCodeNo', label: '코드번호', sortable: true},
        {key: 'codeType', label: '코드타입', sortable: true},
        {key: 'divisionCodeName', label: '코드이름', sortable: true},
        {key: 'codeChangeAvailable', label: '코드변경사항', sortable: true},
        {key: 'description', label: '설명', sortable: true},
      ]
    }]
    this.$store.commit('SET_TABLE', tableColumns)
  },
  methods: {
    showGridData(selectData){
      console.log(selectData)
      this.selectData=selectData[0]
      console.log('클릭하고',selectData)
    },
    getGridData(){
      console.log("getGridData")
      // this.$store.dispatch('account/base/SEARCH_CUSTOMER_INFO_LIST')
    },
    deleteData(customerCode){
      console.log("deleteData")
      // this.$store.dispatch('account/base/DELETE_CUSTOMER_CODE', customerCode)
    },
    async gridInputModal(rowData){
      // await this.$store.dispatch('account/base/GET_CUSTOMER_LIST',rowData[0].item)
    },
    async registData(){
      console.log("폼에서 저장버튼")
      console.log(this.selectData)
      // this.$store.dispatch('account/base/SAVE_CUSTOMER_CODE', this.selectData)
    }
  },
}

</script>

<style>

</style>