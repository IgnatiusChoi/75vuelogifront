<template>
  <transition
      name="fade"
      mode="out-in"
  >
    <CommonModal>
      <template v-slot:header>
        <b-col><b>금융거래처 등록</b></b-col>
      </template>
      <template v-slot:body>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;"><span style="color:red">*</span>&nbsp;금융거래처 코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="accountAssociatesCode"
                placeholder="금융거래처코드"
                :state="customerCodeStatus"
            disabled>
            </b-form-input>
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              금융거래처코드는 반드시 입력해야 합니다.
            </b-form-invalid-feedback>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업장코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="workplaceCode"
                placeholder="사업장코드"
            disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">금융거래처명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="accountAssociatesName"
                placeholder="금융거래처명">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">금융거래처<br/>유형</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="accountAssociatesType"
                placeholder="금융거래처유형">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">계좌번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="accountNumber"
                placeholder="계좌번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">계좌개설점</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="accountOpenPlace"
                placeholder="계좌개설점">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">카드번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="cardNumber"
                placeholder="카드번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">카드구분</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="cardType"
                placeholder="카드구분">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">카드회원명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="cardMemberName"
                placeholder="카드회원명">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">카드가맹점<br/>번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="cardOpenPlace"
                placeholder="카드가맹점번호"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">사업자<br/>등록번호</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="businessLicenseNumber"
                placeholder="사업자등록번호">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">금융기관코드</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="financialInstituteCode"
                placeholder="금융기관코드"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">금융기관명</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="financialInstituteName"
                placeholder="금융기관명">
            </b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-center" style="font-size: 1.1rem;">구분</b-col>
          <b-col sm="4">
            <b-form-input
                class="text-sm-center"
                style="font-size: 1.2rem;"
                v-model="divisionCodeNo"
                placeholder="구분"
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
            @click="updateFinance"
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
      accountAssociatesCode: this.selectClientData.accountAssociatesCode,
      workplaceCode: this.selectClientData.workplaceCode,
      accountAssociatesName: this.selectClientData.accountAssociatesName,
      accountAssociatesType: this.selectClientData.accountAssociatesType,
      accountNumber: this.selectClientData.accountNumber,
      accountOpenPlace: this.selectClientData.accountOpenPlace,
      cardNumber: this.selectClientData.cardNumber,
      cardType: this.selectClientData.cardType,
      cardMemberName: this.selectClientData.cardMemberName,
      cardOpenPlace: this.selectClientData.cardOpenPlace,
      businessLicenseNumber: this.selectClientData.businessLicenseNumber,
      financialInstituteCode: this.selectClientData.financialInstituteCode,
      financialInstituteName: this.selectClientData.financialInstituteName,
      divisionCodeNo: this.selectClientData.divisionCodeNo,

      customerCodeStatus: '',
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

    updateFinance() {

      const data = {
        accountAssociatesCode: this.accountAssociatesCode,
        workplaceCode: this.workplaceCode,
        accountAssociatesName: this.accountAssociatesName,
        accountAssociatesType: this.accountAssociatesType,
        accountNumber: this.accountNumber,
        accountOpenPlace: this.accountOpenPlace,
        cardNumber: this.cardNumber,
        cardType: this.cardType,
        cardMemberName: this.cardMemberName,
        cardOpenPlace: this.cardOpenPlace,
        businessLicenseNumber: this.businessLicenseNumber,
        financialInstituteCode: this.financialInstituteCode,
        financialInstituteName: this.financialInstituteName,
        divisionCodeNo: this.divisionCodeNo,
      }
      console.log(data)
      this.$store.dispatch('logi/base/UPDATE_FINANCE', data).then(() => {
        this.$emit('modalClose')
      })
          .then(this.$swal.fire(
              '금융거래처 수정 완료!',
              '금융거래처 수정이 완료되었습니다.',
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
