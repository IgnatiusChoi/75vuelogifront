<template>
  <transition
      name="fade"
      mode="out-in"
  >
    <CommonModal>
      <template v-slot:header>
        <b-col><b>거래처 수정</b></b-col>
      </template>
      <template v-slot:body>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;"><span style="color:red">*</span>&nbsp;거래처코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerCode"
                disabled>
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                disabled
                style="font-size: 1.2rem;"
                v-model="workplaceCode"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">거래처명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerName"
                placeholder="거래처명">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;"><span style="color:red">*</span>&nbsp;거래처유형</b-col>
          <b-col sm="4">
            <b-form-select
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerType"
                :options="customerTypeOption"
                :state="customerTypeStatus"
            />
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              거래처유형을 선택해주십시오.
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">대표자명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerCeo"
                placeholder="거래처대표자명">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업자등록번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="businessLicenseNumber"
                placeholder="사업자등록번호">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">주민등록번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="socialSecurityNumber"
                placeholder="개인거래처 주민등록번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">업태</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerBusinessConditions"
                placeholder="업태">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">종목</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerBusinessItems"
                placeholder="종목">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">우편번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerZipCode"
                placeholder="우편번호"
                disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">기본주소</b-col>
          <b-col sm="6">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerBasicAddress"
                placeholder="기본주소">
            </b-form-input>
          </b-col>
          <b-col sm="4">
            <b-button variant="primary" size="md" style="font-size: 1.2rem;"
                      class="text-sm-center" @click="openPostcode">우편번호 검색
            </b-button>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">세부주소</b-col>
          <b-col sm="6">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerDetailAddress"
                placeholder="세부주소">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">전화번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerTelNumber"
                placeholder="거래처 전화번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">FAX번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerFaxNumber"
                placeholder="거래처 FAX번호"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">비고</b-col>
          <b-col sm="10">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="customerNote"
                placeholder="비고">
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
  props: ['selectClientData'],
  data() {
    return {
      customerCode: this.selectClientData.customerCode,
      workplaceCode: this.selectClientData.workplaceCode,
      customerName: this.selectClientData.customerName,
      customerType: this.selectClientData.customerType,
      customerCeo: this.selectClientData.customerCeo,
      status: '',
      businessLicenseNumber: this.selectClientData.businessLicenseNumber,
      socialSecurityNumber: this.selectClientData.socialSecurityNumber,
      customerBusinessConditions: this.selectClientData.customerBusinessConditions,
      customerBusinessItems: this.selectClientData.customerBusinessItems,
      customerZipCode: this.selectClientData.customerZipCode,
      customerBasicAddress: this.selectClientData.customerBasicAddress,
      customerDetailAddress: this.selectClientData.customerDetailAddress,
      customerTelNumber: this.selectClientData.customerTelNumber,
      customerFaxNumber: this.selectClientData.customerFaxNumber,
      customerNote: this.selectClientData.customerNote,

      customerTypeOption: [
        {value: '일반', text: '일반고객'},
        {value: '해외', text: '해외고객'},
      ],
      customerCodeStatus: '',
      customerTypeStatus: '',
    }
  },
  computed: {},
  methods: {
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.customerZipCode = data.zonecode;
          this.customerBasicAddress = data.roadAddress;
        },
      }).open();
    },

    updateClient() {
      if (this.customerType === undefined || this.customerType.length == 0) {
        this.customerTypeStatus = false
        return
      }

      const data = {
        customerCode: this.customerCode,
        workplaceCode: this.workplaceCode,
        customerName: this.customerName,
        customerType: this.customerType,
        customerCeo: this.customerCeo,
        businessLicenseNumber: this.businessLicenseNumber,
        socialSecurityNumber: this.socialSecurityNumber,
        customerBusinessConditions: this.customerBusinessConditions,
        customerBusinessItems: this.customerBusinessItems,
        customerZipCode: this.customerZipCode,
        customerBasicAddress: this.customerBasicAddress,
        customerDetailAddress: this.customerDetailAddress,
        customerTelNumber: this.customerTelNumber,
        customerFaxNumber: this.customerFaxNumber,
        customerNote: this.customerNote
      }
      console.log(data)
      this.$store.dispatch('logi/base/UPDATE_CLIENT', data).then(() => {
        this.$emit('modalClose')
      })
          .then(this.$swal.fire(
              '거래처 수정 완료!',
              '거래처 수정이 완료되었습니다.',
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
