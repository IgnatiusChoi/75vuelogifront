<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">

    </div>
    <SearchSalesplan
    @add="addSalePlan"
    @update="updatemodal"
    />

    <b-modal title="판매 계획 추가"
             v-model="modalOpen"
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


    <b-modal title="판매 계획 수정"
             v-model="UpdatemodalOpen"
             @ok.click="UpdateSalePlan"
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

<!--    <SearchSalesplan :data="select" />-->
    <b-table
        style="max-height: 300px; overflow: auto; width: 100%;"
        responsive
        :items="salesplan"
        :fields="fields"
        @row-clicked ="selectRow1"
        class="mb-0 scrollStyle"
    />
  </div>



</template>

<script>
import { BTable } from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import SearchSalesplan from "@/components/logistic/sales/Salesplan/SearchSalesplan.vue";
import modal from "@/components/logistic/info/BasicInfo/Modal.vue";
export default {


  components: {
    BTable,
    SearchSalesplan,
  },
  computed: {
    ...mapState('logi/sales', ['salesplan']),

  },

  created() {
    this.FETCH_ALL_SalesPlane()

  },

  methods: {
    modal() {
      return modal
    },
    // 액션을 가져옴
    ...mapActions('logi/sales', ['FETCH_ALL_SalesPlane','INSERT_SALES_PLAN','UPDATE_SALES_PLAN']),
    // 검색
    selectRow1(fields){
      console.log("??",fields)
      this.formData=fields
      console.log("11111",this.select)
    },

    addSalePlan(){
      this.formData.salesPlanNo = '';
      this.formData.itemCode = '';
      this.formData.itemName = '';
      this.formData.unitOfSales = '';
      this.formData.salesPlanDate = '';
      this.formData.dueDateOfSales = '';
      this.formData.salesAmount = '';
      this.formData.unitPriceOfSales = '';
      this.formData.sumPriceOfSales = '';
      this.formData.mpsApplyStatus = '';
      this.formData.description = '';
      console.log("????")
      this.modalOpen=true
    },

    editModal() {
      console.log(this.selectedRow)
      console.log(this.select)
      this.modalOpen = true;
    },


    selectRow(item) {

      this.selectedRow = item;
      this.loadFormData();
    },


    openModal() {
      this.modalOpen = true;

    },

    closeModal() {
      this.modalOpen = false;
      this.resetFields();
    },

    resetFields() {
      this.formData.salesPlanNo = '';
      this.formData.itemCode = '';
      this.formData.itemName = '';
      this.formData.unitOfSales = '';
      this.formData.salesPlanDate = '';
      this.formData.dueDateOfSales = '';
      this.formData.salesAmount = '';
      this.formData.unitPriceOfSales = '';
      this.formData.sumPriceOfSales = '';
      this.formData.mpsApplyStatus = '';
      this.formData.description = '';
    },

    saveSalesplan() {
      console.log("saveSalesplan")
      this.INSERT_SALES_PLAN(this.formData);
      this.closeModal();
    },

    updatemodal(){
      this.UpdatemodalOpen=true;
    },

    UpdateSalePlan(){
      this.UPDATE_SALES_PLAN(this.formData);
      this.closeModal();
    },

    },




  data() {
    return {
      modalOpen: false,
      UpdatemodalOpen:false,
      fields: [
        {
          key: 'salesPlanNo',
          label: '판매계획일련번호',
        },
        {
          key: 'itemCode',
          label: '품목코드',
        },
        {
          key: 'itemName',
          label: '품목명',
        },
        {
          key: 'unitOfSales',
          label: '단위',
        },
        {
          key: 'salesPlanDate',
          label: '판매계획일',
        },
        {
          key: 'dueDateOfSales',
          label: '계획마감일',
        },
        {
          key: 'salesAmount',
          label: '계획수량',
        },
        {
          key: 'unitPriceOfSales',
          label: '계획단가',
        },
        {
          key: 'sumPriceOfSales',
          label: '합계액',
        },
        {
          key: 'mpsApplyStatus',
          label: 'MPS적용상태'
        },
        {
          key: 'description',
          label: '설명',
        },
      ],
      select : [],
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
      selectedRow: null,
    }
    }

}

</script>
