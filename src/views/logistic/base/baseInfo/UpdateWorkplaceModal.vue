<template>
  <transition
      name="fade"
      mode="out-in"
  >
    <CommonModal>
      <template v-slot:header>
        <b-col><b>사업장 수정</b></b-col>
      </template>
      <template v-slot:body>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;"><span style="color:red">*</span>&nbsp;사업장코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceCode"
                disabled>
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">회사코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="companyCode"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceName"
               >
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업자<br/>등록번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="businessLicenseNumber"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">법인등록번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="corporationLicenseNumber"
                >
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">대표자명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceCeoName"
                >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">업태</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceBusinessConditions"
                >
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">종목</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceBusinessItems"
                >
            </b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">종목</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceBusinessItems"
                placeholder="종목">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>우편번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceZipCode"
                placeholder="우편번호"
                disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>기본주소</b-col>
          <b-col sm="6">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceBasicAddress"
                placeholder="사업장기본주소">
            </b-form-input>
          </b-col>
          <b-col sm="4">
            <b-button variant="primary" size="md" style="font-size: 1.2rem;"
                      class="text-sm-center" @click="openPostcode">우편번호 검색
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>세부주소</b-col>
          <b-col sm="6">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceDetailAddress"
                placeholder="사업장세부주소">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>전화번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceTelNumber"
                placeholder="사업장전화번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>팩스번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceFaxNumber"
                placeholder="사업장팩스번호"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>개업년월일</b-col>
            <b-col sm="8">
            <b-form-input v-model="workplaceEstablishmentDate"
                        type="text"
                        placeholder="YYYY-MM-DD"
                        autocomplete="off"
                        show-decade-nav class="text-sm-center"/>
            </b-col>
          <b-col sm="2">
            <b-form-datepicker
                v-model="workplaceEstablishmentDate"
                show-decade-nav
                button-only
                button-variant="primary"
                right
                size="sm"
                locale="en-US"
                aria-controls="example-input"
            />
            </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>설립년월일</b-col>
          <b-col sm="8">
            <b-form-input v-model="workplaceOpenDate"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          autocomplete="off"
                          show-decade-nav class="text-sm-center"/>
          </b-col>
          <b-col sm="2">
            <b-form-datepicker
                v-model="workplaceOpenDate"
                show-decade-nav
                button-only
                button-variant="primary"
                right
                size="sm"
                locale="en-US"
                aria-controls="example-input"
            />
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장<br/>폐업년월일</b-col>
          <b-col sm="8">
            <b-form-input v-model="workplaceCloseDate"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          autocomplete="off"
                          show-decade-nav class="text-sm-center"/>
          </b-col>
          <b-col sm="2">
            <b-form-datepicker
                v-model="workplaceCloseDate"
                show-decade-nav
                button-only
                button-variant="primary"
                right
                size="sm"
                locale="en-US"
                aria-controls="example-input"
            />
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">본점여부</b-col>
          <b-col sm="10">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="approvalStatus"
              >
            </b-form-input>
          </b-col>
        </b-row>

      </template>

      <template v-slot:footer>
        <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="$emit('modalClose')"
        >
          취소
        </b-button>
        <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="updateClient"
        >
          입력
        </b-button>
      </template>
    </CommonModal>
  </transition>
</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BInputGroupAppend,
  BTableLite, BFormValidFeedback, BFormInvalidFeedback, BFormDatepicker, BInputGroup,
} from 'bootstrap-vue'
import store from '@/store'
import CommonModal from '@/components/common/modal/CommonModal'
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import vSelect from "vue-select";

export default {
  components: {
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
    BFormInvalidFeedback,
    BFormValidFeedback,
    BFormDatepicker,
    BInputGroupAppend,
    BInputGroup,

    CommonModal,
  },
  props: ['selectedWorkplaceRow'],
  data() {
    return {
      workplaceCode: this.selectedWorkplaceRow.workplaceCode,
      companyCode: this.selectedWorkplaceRow.companyCode,
      workplaceName: this.selectedWorkplaceRow.workplaceName,
      businessLicenseNumber: this.selectedWorkplaceRow.businessLicenseNumber,
      corporationLicenseNumber: this.selectedWorkplaceRow.corporationLicenseNumber,
      workplaceCeoName: this.selectedWorkplaceRow.workplaceCeoName,
      workplaceBusinessConditions: this.selectedWorkplaceRow.workplaceBusinessConditions,
      workplaceBusinessItems: this.selectedWorkplaceRow.workplaceBusinessItems,

      workplaceZipCode: this.selectedWorkplaceRow.workplaceZipCode,
      workplaceBasicAddress: this.selectedWorkplaceRow.workplaceBasicAddress,
      workplaceDetailAddress: this.selectedWorkplaceRow.workplaceDetailAddress,
      workplaceTelNumber: this.selectedWorkplaceRow.workplaceTelNumber,
      workplaceFaxNumber: this.selectedWorkplaceRow.workplaceFaxNumber,
      workplaceEstablishmentDate: this.selectedWorkplaceRow.workplaceEstablishmentDate,
      workplaceOpenDate: this.selectedWorkplaceRow.workplaceOpenDate,
      workplaceCloseDate: this.selectedWorkplaceRow.workplaceCloseDate,
      approvalStatus: this.selectedWorkplaceRow.approvalStatus,


    }
  },
  computed: {},
  methods: {
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.workplaceZipCode = data.zonecode;
          this.workplaceBasicAddress = data.roadAddress;
        },
      }).open();
    },

    updateClient() {
      const data = {
        workplaceCode: this.workplaceCode,
        companyCode: this.companyCode,
        workplaceName: this.workplaceName,
        businessLicenseNumber: this.businessLicenseNumber,
        corporationLicenseNumber: this.corporationLicenseNumber,
        workplaceCeoName: this.workplaceCeoName,
        workplaceBusinessConditions: this.workplaceBusinessConditions,
        workplaceBusinessItems: this.workplaceBusinessItems,

        workplaceZipCode: this.workplaceZipCode,
        workplaceBasicAddress: this.workplaceBasicAddress,
        workplaceDetailAddress: this.workplaceDetailAddress,
        workplaceTelNumber: this.workplaceTelNumber,
        workplaceFaxNumber: this.workplaceFaxNumber,
        workplaceEstablishmentDate: this.workplaceEstablishmentDate,
        workplaceOpenDate: this.workplaceOpenDate,
        workplaceCloseDate: this.workplaceCloseDate,
        approvalStatus: this.approvalStatus

      }
      console.log(data)
      this.$store.dispatch('logi/compInfo/UPDATE_WORKPLACE', data).then(() => {
        this.$emit('modalClose')
      })
          .then(this.$swal.fire(
              '사업장 수정 완료!',
              '사업장 수정이 완료되었습니다.',
              'success',
          )).catch(() => {
            this.$swal.fire({
              icon: 'error',
              title: '에러 발생',
              text: '입력사항을 다시 확인해보세요.'
            })
          }
      )
    }
  }
}
</script>
