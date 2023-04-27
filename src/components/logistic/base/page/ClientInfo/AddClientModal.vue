<template>
  <transition
      name="fade"
      mode="out-in"
  >
    <CommonModal>
      <template v-slot:header>
        <b-col>거래처 등록</b-col>
      </template>
      <template v-slot:body>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right"><span style="color:red">*</span>거래처코드 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerCode"
              placeholder="일반거래처코드"
              style="width: 200px;"
              :state="customerCodeStatus"
          />
          <b-form-invalid-feedback
              tooltip
              class="mb-3"
              style="margin-left:-5px"
          >
            일반거래처코드는 반드시 입력해야 합니다.
          </b-form-invalid-feedback>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right; margin-top:8px">사업장코드 : </label>
          </div>
          <b-col>
            <b-form-input
                v-model="workplaceCode"
                disabled
                style="width: 200px;"
            />
          </b-col>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">거래처명 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerName"
              placeholder="거래처명"
              style="width: 200px;"
          />

        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px;float:right; margin-top:8px"> 거래처유형 : &nbsp</label>
          </div>
          <b-col>
            <b-form-select
                v-model="customerType"
                :options="customerTypeOption"
                style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
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
        </b-col>

        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">대표자명 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerCeo"
              placeholder="거래처대표자명"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">사업자등록번호:</label>
          </div>
          <b-form-input
              v-model="businessLicenseNumber"
              placeholder="사업자등록번호"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">거래처 주민등록번호 : &nbsp</label>
          </div>
          <b-form-input
              v-model="socialSecurityNumber"
              placeholder="개인거래처 주민등록번호"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">업태 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerBusinessConditions"
              placeholder="업태"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">종목 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerBusinessItems"
              placeholder="종목"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">우편번호 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerZipCode"
              placeholder="우편번호"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">기본주소 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerBasicAddress"
              placeholder="기본주소"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">세부주소 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerDetailAddress"
              placeholder="세부주소"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">전화번호 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerTelNumber"
              placeholder="거래처 전화번호"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">FAX번호 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerFaxNumber"
              placeholder="거래처 FAX 번호"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">비고 : &nbsp</label>
          </div>
          <b-form-input
              v-model="customerNote"
              placeholder="비고"
              style="width: 200px;"
          />
        </b-col>
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
            @click="addClient"
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
  data() {
    return {
      customerCode: '',
      workplaceCode: 'BRC-01',
      customerName: '',
      customerType: '',
      customerCeo: '',
      status: '',
      businessLicenseNumber: '',
      socialSecurityNumber: '',
      customerBusinessConditions: '',
      customerBusinessItems: '',
      customerZipCode: '',
      customerBasicAddress: '',
      customerDetailAddress: '',
      customerTelNumber: '',
      customerFaxNumber: '',
      customerNote: '',

      customerTypeOption: [
        { value: '일반', text: '일반고객' },
        { value: '해외', text: '해외고객' },
      ],
      customerCodeStatus: '',
      customerTypeStatus: '',
    }
  },
  computed: {

  },
  methods: {
    addClient(){
      if(this.customerCode===undefined||this.customerCode.length==0){
        this.customerCodeStatus=false
        return
      } if(this.customerType===undefined||this.customerType.length==0){
        this.customerTypeStatus=false
        return
      }

      const data={
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
      this.$store.dispatch('logi/base/INSERT_CLIENT', data).then(()=>{this.$emit('modalClose')})
          .then(this.$swal.fire(
              '거래처 등록 완료!',
              '거래처 등록이 완료되었습니다.',
              'success',
          )).catch(()=>{this.$swal.fire({
                icon:'error',
                title:'에러 발생',
                text:'입력사항을 다시 확인해보세요.'})}
      )
    }
  }
}
</script>
