<template>
  <div>
    <CustomerGrid
        grid-type="grid"
        :buttonlist="buttonList"
        title="거래처관리"
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
import CustomerGrid from '@/components/account/base/accountGridComponent/CustomerGrid.vue'
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
  BFormGroup,
} from 'bootstrap-vue'
import BEditableTable from 'bootstrap-vue-editable-table'
import { mapActions, mapState } from 'vuex'
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

    CustomerGrid
  },
  computed: {
    ...mapState({
      grid: state=>state.grid,
      customerList: state => state.account.base.customerList,
    })
  },
  data: ()=>({
    customerCode: '',
    workplaceCode:'',
    customerName:'',
    customerCeo:'',
    businessLicenseNumber:'',
    customerBusinessConditions:'',
    customerBusinessItems:'',
    customerBasicAddress:'',
    selected: '',
    selectData:[],
    buttonList:[
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
  created() {
    let dataList=[]
    this.customerList.map(e=>{
      const {customerCode}=e
      dataList.push({ text: customerCode, value: customerCode})
    })
    const tableColumns=[{
      tableColumns:[
        {key: 'customerCode', label: '거래처코드', sortable: true,},
        {key: 'workplaceCode', label: '사업장코드', sortable: true,} ,
        {key: 'customerName', label: '거래처명', sortable: true,},
        {key: 'customerCeo', label: '대표자', sortable: true,},
        {key: 'businessLicenseNumber', label: '사업자등록번호', sortable: true,},
        {key: 'customerBusinessConditions', label: '업태', sortable: true},
        {key: 'customerBusinessItems', label: '종목', sortable: true},
        {key: 'customerBasicAddress', label: '거래처기본주소', sortable: true}
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
      this.$store.dispatch('account/base/SEARCH_CUSTOMER_INFO_LIST')
    },
    deleteData(customerCode){
      console.log("deleteData")
      console.log('de;eteData2',customerCode)
      this.$store.dispatch('account/base/DELETE_CUSTOMER_CODE', customerCode)
    },
    async gridInputModal(rowData){
      // await this.$store.dispatch('account/base/GET_CUSTOMER_LIST',rowData[0].item)
    },
    async registData(){
      console.log("폼에서 저장버튼")
      console.log(this.selectData)
      this.$store.dispatch('account/base/SAVE_CUSTOMER_CODE', this.selectData)
    }
  },
}
</script>

<style>

</style>
