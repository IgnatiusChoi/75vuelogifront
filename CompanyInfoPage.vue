<template>
  <div>
    <h1>회사 기본정보</h1>
  <b-table
      style="max-height: 300px; overflow: auto; width: 100%;"
      responsive
      :items="companyCode"
      :fields="fields"
      class="mb-0 scrollStyle"
  />
    <h1>회사 상세정보</h1>

    <b-table
        style="max-height: 300px; overflow: auto; width: 100%;"
        responsive
        :items="companyCode"
        :fields="detailfields"
        class="mb-0 scrollStyle"
    />
  </div>


</template>

<script>
import { BTable } from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    BTable,
  },
  computed: {
    ...mapState('logi/base', ['companyCode']),
  },

  created() {
    this.FETCH_ALL_CompanyCode()
  },

  methods: {
    // 액션을 가져옴
    ...mapActions('logi/base', ['FETCH_ALL_CompanyCode']),
    // 검색
  },

  data() {
    return {
      fields: [
        {
          key: 'companyCode',
          label: '회사코드',
        },
        {
          key: 'companyName',
          label: '회사명',
        },
        {
          key: 'companyDivision',
          label: '회사구분',
        },
        {
          key: 'businessLicenseNumber',
          label: '사업자등록번호',
        },
        {
          key: 'corporationLicenseNumber',
          label: '법인등록번호',
        },
        {
          key: 'companyCeoName',
          label: '대표자명',
        },
        {
          key: 'companyBusinessConditions',
          label: '업태',
        },
        {
          key: 'companyBusinessItems',
          label: '종목',
         },
        ],
      detailfields:[
        {
          key: 'companyZipCode',
          label: '회사우편번호',
        },
        {
          key: 'companyBasicAddress',
          label: '회사기본주소',
        },{
          key: 'companyDetailAddress',
          label: '회사세부주소',
        },{
          key: 'companyTelNumber',
          label: '회사전화번호',
        },
      ]
    }
  },
}

</script>
