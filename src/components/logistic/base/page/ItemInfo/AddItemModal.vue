<template>
  <div class="paymentModal">
    <div class="overlay" />
    <div
        class="card"
        style=" min-height:300px; min-width: 500px; max-width: 80vw; border-radius: 10px;"
    >

      <b-card-header
          class="header"
          style="padding:13px 10px 0 0"
      >
        <h4 style="margin:auto">
          추가할 행의 데이터를 적어주십시오.
        </h4>
      </b-card-header>

      <hr style="border-top:1px rgba(93, 93, 93, 0.5) solid; width:100%">

      <b-card-body class="modal-body" />


      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;"> <span style="color:red">*</span>&nbsp;품목코드</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemCode"
              placeholder="품목코드"
              :state="codeChangeAvailableStatus"
              >
          </b-form-input>
          <b-form-invalid-feedback
              tooltip
              class="mb-3"
              style="margin-left:-5px"
          >
            품목코드를 입력해주십시오.
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">품목명</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemName"
              placeholder="품목명"
          >
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">코드이름</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemGroupCode"
              placeholder="품목군코드"
          >
          </b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">품목분류</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemClassification"
              placeholder="품목분류"
          >
          </b-form-input>

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">단위</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="unitOfStock"
              placeholder="단위"
          >
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">손실율</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="LossRate"
              placeholder="손실율"
          >
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">소요일</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="leadTime"
              placeholder="소요일"
          >
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">표준단가</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="standardUnitPrice"
              placeholder="표준단가"
          >
          </b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">비고</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="description"
              placeholder="비고"
          >
          </b-form-input>
        </b-col>
      </b-row>
      <b-card-footer class="modal-footer">
        <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="closeModal"
        >
          취소
        </b-button>
        <b-button
            variant="primary"
            size="md"
            class="mb-md-1"
            @click="inputModal"
        >
          입력
        </b-button>
      </b-card-footer>
    </div>
  </div>
</template>
<script>
import {
  BDropdownDivider, BCard, BCardHeader, BCardBody, BCardFooter, BCol, BButton,
  BFormInput, BFormSelect, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'

export default {
  components: {
    BDropdownDivider,
    BCard,
    BCardHeader,
    BCardBody,
    BCardFooter,
    BCol,
    BButton,
    BFormInput,
    BFormSelect,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
  },
  props: ['tableRowData'],
  data() {
    return {
      itemCode: '',
      itemName: '',
      itemGroupCode: '',
      itemClassification: '',
      unitOfStock: '',
      LossRate: '',
      leadTime: '',
      standardUnitPrice: '',
      description: '',

      codeTypeStatus: '',
      codeChangeAvailableStatus: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close', false)
    },
    inputModal() {
      if(this.itemCode===undefined||this.itemCode==0){
        this.codeChangeAvailableStatus=false
        return
      }
      const data={
        itemCode: this.itemCode,
        itemName: this.itemName,
        itemGroupCode: this.itemGroupCode,
        itemClassification: this.itemClassification,
        unitOfStock: this.unitOfStock,
        LossRate: this.LossRate,
        leadTime: this.leadTime,
        standardUnitPrice: this.standardUnitPrice,
        description: this.description,
        status: 'INSERT'
      }
      console.log(data)
      this.closeModal()
      this.$store.dispatch('logi/base/INSERT_ITEM',data)
          .then(this.$swal.fire(
              '등록 완료!',
              '품목 등록이 완료되었습니다.',
              'success',
          ))
    },
  },
}
</script>
<style lang="scss">
//@import '../../../assets/scss/modal';
#scrollStyle::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: rgba(50,60,150,1);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
}

#scrollStyle::-webkit-scrollbar
{
  width: 10px;
  background-color: rgba(50,50,150,0);
}

#scrollStyle::-webkit-scrollbar-thumb
{
  background-clip: padding-box;
  border: 4px solid transparent;
  border-radius: 10px;
  /*    background-image: -webkit-gradient(linear,
  left bottom,
  left top,
  color-stop(0.44, rgb(122,153,217)),
  color-stop(0.72, rgb(73,125,189)),
  color-stop(0.86, rgb(28,58,148)));*/
  background-color: #7367f0;
}
</style>
