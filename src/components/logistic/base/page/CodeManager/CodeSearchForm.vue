<template>
  <div>
    <CodeGrid
        grid-type="grid"
        :buttonlist="buttonList"
        title="코드관리"
        column-width="3000px"
        only-one="true"
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
            value: '수정',
            event: 'update',
          },
          {
            value: '삭제',
            event: 'delete',
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
        {key: 'codeChangeAvailable', label: '변경가능여부', sortable: true},
        {key: 'description', label: '설명', sortable: true},
      ]
    }]
    this.$store.commit('SET_TABLE', tableColumns)
  },
  methods: {
  },
  mounted(){
    this.$store.dispatch('logi/base/resetCodeList')
  }
}

</script>

<style>

</style>
