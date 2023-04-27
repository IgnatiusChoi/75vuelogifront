<template>
  <div>
    <div>
    <b-button variant="primary" size="md" class="mb-md-1">
      창고조회
    </b-button>
    <b-button
        variant="primary" size="md"
        class="mb-md-1 ml-1">
      창고삭제
    </b-button>
    <b-button variant="primary" size="md" class="mb-md-1 ml-1">
      창고저장
    </b-button>

    <b-button  variant="primary" size="md" class="mb-md-1 ml-1">
      창고 추가(모달)
    </b-button>
    </div>
<!--    //v-b-modal.addWarehouse-->
    <div>
      <WGrid
          title="창고 기본정보"
          :fields="baseFields"
      />
      <WGrid
          title="창고 상세정보"
          :fields="detailFields"
      />
    </div>

  </div>
</template>

<script>
import WGrid from '@/components/logistic/base/page/WareHouseInfo/WarehouseGrid.vue'
import BEditableTable from "bootstrap-vue-editable-table";
export default {
  components: {
    WGrid
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
          key: 'companyBusinessCondition',
          label: '업태',
        },
        {
          key: 'companyBusinessItem',
          label: '종목',
        }
      ],
      detailFields: [
        {
          key: 'companyZIPCode',
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
