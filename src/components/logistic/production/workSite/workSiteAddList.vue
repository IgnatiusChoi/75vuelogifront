<template>
  <transition
      name="fade"
      mode="out-in"
  >
    <component>
      <template v-slot:header>
        <b-col>작업장 추가</b-col>
      </template>

      <template v-slot:body>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1, scrollable"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right"><span style="color:red">*</span>생산 주문 번호 : &nbsp</label>
          </div>
          <b-form-input
              v-model="workOrderNo"
              placeholder="생산주문번호"
              style="width: 200px;"
              :state="workOrderNoStatus"
          />
          <b-form-invalid-feedback
              tooltip
              class="mb-3"
              style="margin-left:-5px"
          >
            생산주문번호는 반드시 입력해야 합니다.
          </b-form-invalid-feedback>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px; float:right; margin-top:8px">아이템 코드 : </label>
          </div>
          <b-col>
            <b-form-input
                v-model="itemCode"
                placeholder="아이템 코드"
                style="width: 200px;"
                :state="itemCodeStatus"
            />
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              아이템 코드는 반드시 입력해야 합니다.
            </b-form-invalid-feedback>
          </b-col>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">아이템 이름 : &nbsp</label>
          </div>
          <b-form-input
              v-model="itemName"
              placeholder="아이템 이름"
              style="width: 200px;"
              :state="itemNameStatus"
          />
          <b-form-invalid-feedback
              tooltip
              class="mb-3"
              style="margin-left:-5px"
          >
            아이템 이름는 반드시 입력해야 합니다.
          </b-form-invalid-feedback>
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex justify-content-start mb-3"
        >
          <div style="width: 110px; ">
            <label style="font-size: 15px;float:right; margin-top:8px"> 과정 : &nbsp</label>
          </div>
          <b-col>
            <b-form-input
                v-model="progress"
                placeholder="과정"
                style="width: 200px;"
            />
            <b-form-invalid-feedback
                tooltip
                class="mb-3"
                style="margin-left:-5px"
            >
              과정을 선택해주십시오.
            </b-form-invalid-feedback>
          </b-col>
        </b-col>

        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">작업장명 : &nbsp</label>
          </div>
          <b-form-select
              v-model="workSiteName"
              placeholder="과정"
              :options="workSiteNameTypeOption"
              style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
              :state="customerTypeStatus"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">생산 날짜:</label>
          </div>
          <b-form-input
              v-model="workDate"
              placeholder="생산 날짜"
              style="width: 200px;"
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">생산 과정 코드 : &nbsp</label>
          </div>
          <b-form-input
              v-model="productionProcessCode"
              placeholder="생산 과정 코드"
              style="width: 200px;"
              disabled
          />
        </b-col>
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
        >
          <div style="width: 110px; ">

            <label style="font-size: 15px; float:right">생산 과정 이름 : &nbsp</label>
          </div>
          <b-form-input
              v-model="productionProcessName"
              placeholder="생산 과정 이름"
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
            @click="addworkSiteList"
        >
          입력
        </b-button>
      </template>

    </component>
  </transition>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BInputGroupAppend,
  BTableLite, BFormValidFeedback, BFormInvalidFeedback, BFormDatepicker, BInputGroup,
} from 'bootstrap-vue'
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import vSelect from "vue-select";
import CommonModal from '@/components/common/modal/CommonModal.vue'

export default{
  name:'WorkSiteAddList',
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
  data(){
    return{
      workOrderNo: '',
      workOrderNoStatus: '',
      itemCode: '',
      itemCodeStatus: '',
      itemName: '',
      itemNameStatus: '',
      progress: '',
      workSiteName: '',
      workDate: '',
      productionProcessCode: 'PP001',
      productionProcessName: '',
      workSiteNameTypeOption: [
        { text: '반제품작업장', value: '반제품작업장', disabled: false },
        { text: '완제품작업장', value: '완제품작업장', disabled: false },
      ],
    }
  },
  methods: {
    addworkSiteList () {
      console.log('addworkPlaceList')
      if(this.workOrderNo===undefined||this.workOrderNo.length==0){
        this.workOrderNo=false
        return
      } if(this.itemCode===undefined||this.itemCode.length==0){
        this.itemCode=false
        return
      } if(this.itemName===undefined||this.itemName.length==0){
        this.itemName=false
        return
      }

      const data={
        workOrderNo: this.workOrderNo,
        itemCode: this.itemCode,
        itemName: this.itemName,
        progress: this.progress,
        workSiteName: this.workSiteName,
        workDate: this.workDate,
        productionProcessCode: this.productionProcessCode,
        productionProcessName: this.productionProcessName
      }
      console.log(data)
      console.log(data.workOrderNo)
      this.$store.dispatch('logi/workInstruction/INSERT_WORK_PLACE_LIST', data).then(()=>{
        this.$emit('modalClose')})
          .then(this.$swal.fire(
              '작업장 추가 완로',
              '작업장 추가가 완료되었습니다.',
              'success'
          )).catch(()=>{this.$swal.fire({
            icon:'error',
            title: '에러 발생',
            text: '입력사항을 다시 확인해보세요'
          })}
      )
    },
  },
}
</script>

<style>
.modal-clientAdd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
}
</style>
