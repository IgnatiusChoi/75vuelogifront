<template>
  <div>
    <h1> 여긴 일반거래처</h1>

    <b-button variant="outline-primary" @click="searchClient">조회</b-button>
    <b-button variant="outline-primary" @click="openAddModal">추가</b-button>
    <b-button variant="outline-primary" @click="">수정</b-button>
    <b-button variant="outline-primary" @click="deleteClient">삭제</b-button>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          selectable
          :items="nClientList"
          :fields="fields"
          class="mb-0 scrollStyle"
          @row-selected="onRowSelected"
      />
    </div>
    <add-modal v-if="addModal" @modalClose="addModal=false"></add-modal>
  </div>

</template>

<script>
import {BButton, BTable} from "bootstrap-vue";
import { mapState } from 'vuex'
import addModal from "@/components/logistic/base/page/ClientInfo/AddClientModal.vue"

export default {
  name: "NormalClientInfo",
  components: {
    BButton,
    BTable,
    addModal,
  },
  data() {
    return {
      fields: [
        {label: '일반거래처코드', key: 'customerCode',},
        // {label: "NO", width: 55, valueGetter: "node.rowIndex + 1", hide: true,},
        {label: '사업장코드', key: 'workplaceCode', resizable: true},
        {label: '거래처명', key: 'customerName', width: 300, editable: true,},
        {label: '거래처유형', key: 'customerType', editable: true,},
        {label: '거래처대표자명', key: 'customerCeo', editable: true,},
        {label: 'status', key: 'status',},
        {label: '사업자등록번호', key: 'businessLicenseNumber'},
        {label: '개인거래처 주민등록번호', key: 'socialSecurityNumber',},
        {label: '업태', key: 'customerBusinessConditions', editable: true},
        {label: '종목', key: 'customerBusinessItems', editable: true},
        {label: '우편번호', key: 'customerZipCode', editable: true, hide: true},
        {label: '기본주소', key: 'customerBasicAddress', editable: true, hide: true},
        {label: '세부주소', key: 'customerDetailAddress', editable: true, hide: true},
        {label: '전화번호', key: 'customerTelNumber', editable: true, hide: true},
        {label: '팩스번호', key: 'customerFaxNumber', editable: true, hide: true},
        {label: '비고', key: 'customerNote', hide: true},
        // {label: '사업자등록번호', key: 'companyCeoName', hide: true} 나도 있는게 맞지 않은가 생각은 했지만, 데이터모델링에도 사업자등록번호가 없어서 일단은 주석처리함
      ],
      selected: '',
      addModal: false,
      updateModal: false,
      deleteModal: false,
    };
  },

methods: {
    searchClient(){
      this.$store.dispatch('logi/base/SEARCH_CLIENT_LIST')
    },
    onRowSelected(items) {
      this.selected = items[0]
      console.log(this.selected)
      // this.modal = true
    },
    openAddModal(){
      this.addModal = true;
    },
    deleteClient(){
      this.$store.dispatch('logi/base/DELETE_CLIENT',this.selected).then(this.$swal.fire(
          '삭제 완료!',
          '거래처 삭제가 완료되었습니다.',
          'success',
      ))
    }
}
,
computed: {
    ...mapState('logi/base', ['nClientList']),
},
mounted()
{
  this.$store.dispatch('logi/base/resetSearch')
},
}
</script>

<style scoped>

</style>
