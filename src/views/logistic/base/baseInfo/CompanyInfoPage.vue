<template>
  <div>
  <CGrid
      title="회사 기본정보"
      :fields="baseFields"
  />
  <CGrid
      title="회사 상세정보"
      :fields="detailFields"
  />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CGrid from '@/components/logistic/base/page/CompanyInfo/CompanyGrid.vue'
export default {
  components: {
    CGrid
  },
  data() {
    return {
      baseFields: [
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
          key: 'companyCEOName',
          label: '대표자명',
        },
        {
          key: 'companyBusinessConditions',
          label: '업태',
        },
        {
          key: 'companyBusinessItems',
          label: '종목',
        }
      ],
      detailFields: [
        {
          key: 'companyzipCode',
          label: '회사우편번호',
        },
        {
          key: 'companyBasicAddress',
          label: '회사기본주소',
        },
        {
          key: 'companyDetailAddress',
          label: '회사세부주소',
        },
        {
          key: 'companyTelNumber',
          label: '회사전화번호',
        },
        {
          key: 'companyFAXNumber',
          label: '회사팩스번호',
        },
        {
          key: 'companyEstablishmentDate',
          label: '설립년월일',
        },
        {
          key: 'companyOpenDate',
          label: '개업년월일',
        },
        {
          key: 'homepage',
          label: '회사홈페이지',
        }
      ]
    }
  }
}

</script>
