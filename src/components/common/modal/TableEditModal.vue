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
      <div>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
        <div style="width: 110px; ">
          <label style="font-size: 15px; float:right">구분코드번호 : &nbsp</label>
        </div>
        <b-form-input
            v-model="divisionCodeNo"
            placeholder="구분코드번호(자동생성)"
            style="width: 200px;"
            disabled
        />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px;float:right; margin-top:8px"> 코드타입 : &nbsp</label>
          </div>
          <b-col>
            <b-form-select
                v-model="codeType"
                :options="codeTypeOption"
                style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                :state="codeTypeStatus"
            />
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              코드타입을 선택해주십시오.
            </b-form-invalid-feedback>
          </b-col>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-1"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right">코드이름 : &nbsp</label>
          </div>
          <b-form-input
              v-model="divisionCodeName"
              placeholder="코드이름"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-1"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px;float:right; margin-top:8px"> 변경가능여부 : &nbsp</label>
          </div>
          <b-col>
            <b-form-select
                v-model="codeChangeAvailable"
                :options="codeChangeAvailableOption"
                style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                :state="codeChangeAvailableStatus"
            />
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              변경가능여부 옵션을 선택해주십시오.
            </b-form-invalid-feedback>
          </b-col>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-1"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right">구분 : &nbsp</label>
          </div>
          <b-form-input
              v-model="description"
              placeholder="코드이름"
              style="width: 200px;"
          />
        </b-col>
      </div>

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
      divisionCodeNo: '',
      codeType: '',
      divisionCodeName: '',
      codeChangeAvailable: '',
      description: '',
      codeTypeOption: [
        { value: '공통', text: '공통' },
        { value: '회계', text: '회계' },
        { value: '구매', text: '구매' },
        { value: '영업', text: '영업' }
      ],
      codeChangeAvailableOption: [
        { value: '변경가능', text: '변경가능' },
        { value: '변경불가능', text: '변경불가능' }
      ],
      codeTypeStatus: '',
      codeChangeAvailableStatus: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close', false)
    },
    inputModal() {
      if(this.codeType===undefined||this.codeType==0){
        this.codeTypeStatus=false
        return
      }
      if(this.codeChangeAvailable===undefined||this.codeChangeAvailable==0){
        this.codeChangeAvailableStatus=false
        return
      }
      const data={
        divisionCodeNo: null,
        codeType: this.codeType,
        divisionCodeName: this.divisionCodeName,
        codeChangeAvailable: this.codeChangeAvailable,
        description: this.description,
        status: 'INSERT'
      }
      console.log(data)
      this.closeModal()
      this.$store.dispatch('logi/base/addCode',data)
          .then(this.$swal.fire(
              '등록 완료!',
              '코드 등록이 완료되었습니다.',
              'success',
          ))
    },
  },
}
</script>
<style lang="scss">
    @import '../../../assets/scss/modal';
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
