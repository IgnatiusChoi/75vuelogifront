<template>
  <div>
    <b-button variant="primary" class="mr-1" @click="searchClient">조회</b-button>
    <b-button variant="primary" class="mr-1" @click="openAddModal">추가</b-button>
    <b-button variant="primary" class="mr-1" @click="openUpdateModal">수정</b-button>
    <b-button variant="primary" class="mr-1" @click="deleteClient">삭제</b-button>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          selectable
          :select-mode="selectMode"
          :items="nClientList"
          :fields="fields"
          class="mb-0 scrollStyle"
          @row-selected="onRowSelected"
      />
    </div>
    <div>
      <b-table
          style="max-height: 300px; overflow: auto; width: 100%"
          responsive
          :items="nClientDetailList"
          :fields="detailFields"
          class="mb-0 scrollStyle"
      />
    </div>
    <add-modal v-if="addModal" @modalClose="addModal=false"></add-modal>
    <up-modal v-if="updateModal" @modalClose="updateModal=false" :select-client-data="selected"></up-modal>
  </div>

</template>

<script>
import {BButton, BTable} from "bootstrap-vue";
import { mapState } from 'vuex'
import addModal from "@/components/logistic/base/page/ClientInfo/AddClientModal.vue"
import upModal from "@/components/logistic/base/page/ClientInfo/UpdateClientModal.vue"

export default {
  name: "NormalClientInfo",
  components: {
    BButton,
    BTable,
    addModal,
    upModal
  },
  data() {
    return {
      fields: [
        {label: '일반거래처코드', key: 'customerCode', sortable: true},
        {label: '사업장코드', key: 'workplaceCode', resizable: true},
        {label: '거래처명', key: 'customerName', width: 300, editable: true,},
        {label: '거래처유형', key: 'customerType', editable: true,},
        {label: '거래처대표자명', key: 'customerCeo', editable: true,},
        {label: 'status', key: 'status',},
        {label: '사업자등록번호', key: 'businessLicenseNumber'},
        {label: '개인거래처 주민등록번호', key: 'socialSecurityNumber', sortable: true},
        // {label: '사업자등록번호', key: 'companyCeoName', hide: true} 나도 있는게 맞지 않은가 생각은 했지만, 데이터모델링에도 사업자등록번호가 없어서 일단은 주석처리함
      ],
      detailFields: [
        {label: '업태', key: 'customerBusinessConditions', editable: true},
        {label: '종목', key: 'customerBusinessItems', editable: true},
        {label: '우편번호', key: 'customerZipCode', editable: true, hide: true},
        {label: '기본주소', key: 'customerBasicAddress', editable: true, hide: true},
        {label: '세부주소', key: 'customerDetailAddress', editable: true, hide: true},
        {label: '전화번호', key: 'customerTelNumber', editable: true, hide: true},
        {label: '팩스번호', key: 'customerFaxNumber', editable: true, hide: true},
        {label: '비고', key: 'customerNote', hide: true},
      ],
      selected: '',
      addModal: false,
      updateModal: false,
      deleteModal: false,
      selectMode: 'single'
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
      const payload=this.selected.customerCode
      this.$store.dispatch('logi/base/SEARCH_CLIENT_DETAIL_LIST',payload)
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
    },
  openUpdateModal(){
    if (!this.selected || this.selected.customerCode === undefined || this.selected.customerCode.length == 0) {
      window.alert("수정할 데이터를 선택하십시오")
      return
    }
      this.updateModal = true;
  }
}
,
computed: {
    ...mapState({
        nClientList: state=> state.logi.base.nClientList,
        nClientDetailList: state=> state.logi.base.nClientDetailList
    }),
},
mounted()
{
  this.$store.dispatch('logi/base/resetClient')
},
}
</script>

<style scoped>

</style>
