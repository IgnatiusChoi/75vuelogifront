<template>
  <div>
    <b-button
        variant="primary"
        size="md"
        class="mr-1"
        @click="openModal"
    >
      추가
    </b-button>

    <b-button variant="primary" size="md" @click="editModal">
      수정
    </b-button>


    <b-modal v-model="modalOpen"
              @ok.click="saveSalesplan"
    >

      <div>
        <label for="salesPlanNo">판매계획일련번호:</label>
        <b-form-input id="asalesPlanNo" v-model="formData.salesPlanNo"></b-form-input>
      </div>
      <div>
        <label for="itemCode">품목코드:</label>
        <b-form-input id="itemCode" v-model="formData.itemCode"></b-form-input>
      </div>
      <div>
        <label for="itemName">품목명:</label>
        <b-form-input id="itemName" v-model="formData.itemName"></b-form-input>
      </div>
      <div>
        <label for="unitOfSales">단위:</label>
        <b-form-input id="unitOfSales" v-model="formData.unitOfSales" placeholder=" ex) EA " ></b-form-input>
      </div>
      <div>
        <label for="salesPlanDate">판매계획일:</label>
        <b-form-input id="salesPlanDate" v-model="formData.salesPlanDate"></b-form-input>
      </div>
      <div>
        <label for="dueDateOfSales">계획마감일:</label>
        <b-form-input id="dueDateOfSales" v-model="formData.dueDateOfSales"></b-form-input>
      </div>
      <div>
        <label for="salesAmount">계획수량:</label>
        <b-form-input id="salesAmount" v-model="formData.salesAmount"></b-form-input>
      </div>
      <div>
        <label for="unitPriceOfSales">계획단가:</label>
        <b-form-input id="unitPriceOfSales" v-model="formData.unitPriceOfSales"></b-form-input>
      </div>
      <div>
        <label for="sumPriceOfSales">합계액:</label>
        <b-form-input id="sumPriceOfSales" v-model="formData.sumPriceOfSales" ></b-form-input>
      </div>
      <div>
        <label for="mpsApplyStatus">MPS적용상태:</label>
        <b-form-input id="mpsApplyStatus" v-model="formData.mpsApplyStatus"></b-form-input>
      </div>
      <div>
        <label for="description">설명:</label>
        <b-form-input id="description" v-model="formData.description"></b-form-input>
      </div>


    </b-modal>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      selectedRow: null,
      formData: {
        salesPlanNo: '',
        itemCode: '',
        itemName: '',
        unitOfSales: '',
        salesPlanDate: '',
        dueDateOfSales: '',
        salesAmount: '',
        unitPriceOfSales: '',
        sumPriceOfSales: '',
        mpsApplyStatus: '',
        description: '',
      },
      modalOpen: false,
    };
  },

  methods: {
    ...mapActions('logi/sales', ['INSERT_SALES_PLAN']),

    editModal() {
      this.modalOpen = true;
      this.loadFormData();
    },

    selectRow(item) {
      console.log(item)
      this.selectedRow = item;
      this.loadFormData();
    },

    loadFormData() {
      this.formData = {
        salesPlanNo: this.selectedRow.salesPlanNo,
        itemCode: this.selectedRow.itemCode,
        itemName: this.selectedRow.itemName,
        unitOfSales: this.selectedRow.unitOfSales,
        salesPlanDate: this.selectedRow.salesPlanDate,
        dueDateOfSales: this.selectedRow.dueDateOfSales,
        salesAmount: this.selectedRow.salesAmount,
        unitPriceOfSales: this.selectedRow.unitPriceOfSales,
        sumPriceOfSales: this.selectedRow.sumPriceOfSales,
        mpsApplyStatus: this.selectedRow.mpsApplyStatus,
        description: this.selectedRow.description,
      };
    },
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.resetFields();
    },



    resetFields() {
      this.salesPlanNo = '';
      this.itemCode = '';
      this.itemName = '';
      this.unitOfSales = '';
      this.salesPlanDate = '';
      this.dueDateOfSales = '';
      this.salesAmount = '';
      this.unitPriceOfSales = '';
      this.sumPriceOfSales = '';
      this.mpsApplyStatus = '';
      this.description = '';
    },

    saveSalesplan() {
      console.log('Save sales plan:', this.formData)
      this.INSERT_SALES_PLAN(this.formData);
      this.closeModal();

    }

  },
};
</script>
