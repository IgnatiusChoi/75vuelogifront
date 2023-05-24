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
          수정할 행의 데이터를 적어주십시오.
        </h4>
      </b-card-header>

      <hr style="border-top:1px rgba(93, 93, 93, 0.5) solid; width:100%">

      <b-card-body class="modal-body" />


      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;"> <span style="color:red">*</span>&nbsp;품목군코드</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemGroupCode"
              placeholder="품목군코드"
              disabled
          >
          </b-form-input>

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4" class="text-sm-center" style="font-size: 1.1rem;">품목군명</b-col>
        <b-col sm="7">
          <b-form-input
              class="text-sm-center"
              style="font-size: 1.2rem;"
              v-model="itemGroupName"
              placeholder="품목군명"
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
  props: ['itemTable'],
  data() {
    return {
      itemGroupCode: this.itemTable.itemGroupCode,
      itemGroupName: this.itemTable.itemGroupName,
      description: this.itemTable.description
    }
  },
  methods: {
    closeModal() {
      this.$emit('close', false)
    },
    inputModal() {
      const data={
        itemGroupCode: this.itemGroupCode,
        itemGroupName: this.itemGroupName,
        description: this.description,
        status: 'UPDATE'
      }
      console.log(data)
      this.closeModal()
      this.$store.dispatch('logi/base/UPDATE_ITEM_GROUP',data)
          .then(this.$swal.fire(
              '수정 완료!',
              '품목 수정이 완료되었습니다.',
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
