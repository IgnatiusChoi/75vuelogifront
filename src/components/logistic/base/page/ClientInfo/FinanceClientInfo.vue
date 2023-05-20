<template>
  <div>
    <b-button variant="primary" class="mr-1" @click="searchFinance">조회</b-button>
    <b-button variant="primary" class="mr-1" @click="null">추가</b-button>
    <b-button variant="primary" class="mr-1" @click="">수정</b-button>
    <b-button variant="primary" class="mr-1" @click="null">삭제</b-button>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          :select-mode="selectMode"
          selectable
          :items="fClientList"
          :fields="fields"
          class="mb-0 scrollStyle"
          @row-selected="onRowSelected"
      />
    </div>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          :items="fClientDetailList"
          :fields="detailFields"
          class="mb-0 scrollStyle"
          @row-selected="onRowSelected"
      />
    </div>
<!--    <add-modal v-if="addModal" @modalClose="addModal=false"></add-modal>-->
  </div>

</template>

<script>
import {BButton, BTable} from "bootstrap-vue";
import { mapState } from 'vuex'
import addModal from "@/components/logistic/base/page/ClientInfo/AddClientModal.vue"

export default {
  name: "FinanceClientInfo",
  components: {
    BButton,
    BTable,
    addModal,
  },
  data() {
    return {
      fields: [
        {label: '금융거래처코드', key: 'accountAssociatesCode', sortable: true},
        {label: '사업장코드', key: 'workplaceCode', resizable: true},
        {label: '금융거래처명', key: 'accountAssociatesName', width: 300, editable: true,},
        {label: '금융거래처유형', key: 'accountAssociatesType', editable: true,},
        {label: '계좌번호', key: 'accountNumber', editable: true,},
        {label: '계좌개설점', key: 'accountOpenPlace',},
        {label: '카드번호', key: 'cardNumber'}

      ],
      detailFields: [
        {label: '카드구분', key: 'cardType', sortable: true},
        {label: '카드회원명', key: 'cardMemberName', editable: true},
        {label: '카드가맹점번호', key: 'cardOpenPlace', editable: true},
        {label: '사업자등록번호', key: 'businessLicenseNumber', editable: true, },
        {label: '금융기관코드', key: 'financialInstituteCode', editable: true, },
        {label: '금융기관명', key: 'financialInstituteName', editable: true, },
        {label: '구분', key: 'divisionCodeNo', editable: true, }
      ],
      selected: '',
      addModal: false,
      updateModal: false,
      deleteModal: false,
      selectMode: 'single'
    };
  },

  methods: {
    searchFinance(){
      this.$store.dispatch('logi/base/SEARCH_FINANCE_LIST')
    },
    onRowSelected(items) {
      this.selected = items[0]
      console.log(this.selected)
      // this.modal = true
      const payload=this.selected.accountAssociatesCode
      this.$store.dispatch('logi/base/SEARCH_FINANCE_DETAIL_LIST',payload)
    },
    // openAddModal(){
    //   this.addModal = true;
    // },
    // deleteClient(){
    //   this.$store.dispatch('logi/base/DELETE_CLIENT',this.selected).then(this.$swal.fire(
    //       '삭제 완료!',
    //       '거래처 삭제가 완료되었습니다.',
    //       'success',
    //   ))
    // }
  }
  ,
  computed: {
    ...mapState({
        fClientList: state=> state.logi.base.fClientList,
    fClientDetailList: state=> state.logi.base.fClientDetailList
    }),
  },
  mounted()
  {
    this.$store.dispatch('logi/base/resetFinance')
  },
}
</script>

<style scoped>

</style>
