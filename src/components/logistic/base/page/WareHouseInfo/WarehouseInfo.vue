<template>
  <div>
    <h1>창고관리</h1>
<!--    <h1>{{rowData}}</h1>-->
    <div>
      <b-button variant="primary" size="md" class="mb-md-1" @click="searchWarehouse()">
        창고조회
      </b-button>
      <b-button
          variant="primary" size="md"
          class="mb-md-1 ml-1"
          @click="removeWarehouse()">
        창고삭제
      </b-button>
      <b-button variant="primary" size="md" class="mb-md-1 ml-1" @click="saveWarehouse()">
        창고저장
      </b-button>

      <b-button v-b-modal.addWarehouse variant="primary" size="md" class="mb-md-1 ml-1">
        창고 추가(모달)
      </b-button>


      <b-modal
          id="addWarehouse" title="Scrollable Content"
          cancel-variant="outline-secondary"
          @ok="completeForm"
      >
        <b-card class="scrollStyle" style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px">

          <p class="my-5">
            <warehouse-regform
                ref="addWarehouseForm1"
                modal-status="addWarehouse"
            >
            </warehouse-regform>
          </p>
          <!--        <b-form-radio-group
                        v-model="searchCompanyCodeOption"
                        :options="options"
                        class="demo-inline-spacing mb-1"
                        value-field="value"
                        text-field="text"
                        disabled-field="disabled"
                    />-->
          <!--           <b-table
                       hover
                       selectable
                       :select-mode="'single'"
                       :fields="fields"
                       :items="customerCodeList"
                       @row-clicked="companyCodeClick"
                   />-->
        </b-card>
      </b-modal>

    </div>
    <!--창고 목록 div-->
    <div>
      <!--      <contract-info-grid>
              <template v-slot:header>
                <h2 class="mb-md-1" style="width: 50px">수주</h2>
                <b-input-group class="mb-md-1" style="width: 170px; margin: 0 10px 0 10px;">
                  <b-form-input
                      v-model="startDate"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      autocomplete="off"
                      show-decade-nav
                  />
                  <b-input-group-append style="height: 37px;">
                    <b-form-datepicker
                        v-model="startDate"
                        show-decade-nav
                        button-only
                        button-variant="outline-primary"
                        right
                        size="sm"
                        locale="en-US"
                        aria-controls="example-input"
                    />
                  </b-input-group-append>
                </b-input-group>

                <h2 style="color:#7367f0">~</h2>

                <b-input-group class="mb-md-1" style="width: 170px; margin: 0 10px 0 10px;">
                  <b-form-input
                      v-model="endDate"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      autocomplete="off"
                      show-decade-nav
                  />
                  <b-input-group-append style="height: 37px;">
                    <b-form-datepicker
                        v-model="endDate"
                        show-decade-nav
                        button-only
                        button-variant="outline-primary"
                        right
                        size="sm"
                        locale="en-US"
                        aria-controls="example-input"
                    />
                  </b-input-group-append>
                </b-input-group>
                <b-button
                    variant="primary"
                    size="md"
                    class="mb-md-1"
                    @click="searchContract('searchByDate')"
                >
                  검색
                </b-button>

                <b-form-input
                    id="company-code"
                    v-model="companyCode"
                    disabled
                    name="companyCode"
                    placeholder="companyCode"
                    style="width: 150px"
                    class="mb-md-1 ml-1"
                />
                <b-button
                    v-b-modal.companyCode
                    variant="primary"
                    size="md"
                    class="mb-md-1 ml-1"
                >
                  회사코드로 검색
                </b-button>

                <b-modal
                    id="companyCode"
                    title="Scrollable Content"
                    cancel-variant="outline-secondary"
                >
                  <b-card
                      class="scrollStyle"
                      style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px"
                  >
                    <b-form-radio-group
                        v-model="searchCompanyCodeOption"
                        :options="options"
                        class="demo-inline-spacing mb-1"
                        value-field="value"
                        text-field="text"
                        disabled-field="disabled"
                    />
                    <b-table
                        hover
                        selectable
                        :select-mode="'single'"
                        :fields="fields"
                        :items="customerCodeList"
                        @row-clicked="companyCodeClick"
                    />
                  </b-card>
                </b-modal>

              </template>
            </contract-info-grid>-->

    </div>
    <div>
      <warehouse-info-grid @setValue2="setValue" ref="list">
        <template v-slot:header>
          <h2>창고 목록</h2>
        </template>
      </warehouse-info-grid>
    </div>

    <!--    창고별 자재조회-->

    <div>
      <warehouse-info-detail-grid>
        <template v-slot:header>
          <h2>창고별 자재조회2</h2>
        </template>
      </warehouse-info-detail-grid>
    </div>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BFormRadioGroup, BCardText,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import BEditableTable from 'bootstrap-vue-editable-table'
import {mapActions, mapState} from 'vuex'

import warehouseInfoGrid from "@/components/logistic/base/page/WareHouseInfo/WarehouseInfoGrid";
import warehouseInfoDetailGrid from "@/components/logistic/base/page/WareHouseInfo/WarehouseInfoDetailGrid";
import warehouseRegform from "@/components/logistic/base/page/WareHouseInfo/WarehouseRegform";
import {logiApi} from "@/api";


export default {
  name: "WarehouseInfo",
  components: {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BFormDatepicker, BInputGroup, BInputGroupAppend, BEditableTable, BFormRadioGroup, BCardText,

    warehouseInfoGrid,
    warehouseInfoDetailGrid,

    warehouseRegform, // 모달

  },
  data() {
    return {
      rowData:[],
    }
  },
  state: {
  },
  computed: {
    ...mapState({
      grid: state => state.logi.sales.grid,
      customerCodeList: state => state.hr.company.companyCodeList,
      warehouseList: state => state.logi.base.warehouseList,

    }),
  },

/*  watch: {
    searchCompanyCodeOption(newValue) {
      if (newValue !== '') {
        const searchOption = {searchCondition: newValue, workplaceCode: this.companyCode}
        console.log(`watchDispatch${searchOption.searchCondition}`)
        this.$store.dispatch('hr/company/searchCustomerList', searchOption)
      }
    },
  },*/
  mounted() {
    // eslint-disable-next-line new-cap
    const tableColumns = [{
      tableColumns: [
        {headerCheckboxSelection: true, checkboxSelection: true, width: 50, resizable: true, sortable: true},
        {label: '창고 코드', key: 'warehouseCode', resizable: true, sortable: true},
        {label: '창고 명', key: 'warehouseName', editable: true, resizable: true, sortable: true},
        {
          label: '창고 사용여부',
          key: 'warehouseUseOrNot',
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {values: ['Y', 'N']},
          resizable: true,
          sortable: true
        },
        {label: '설명', key: 'description', editable: true, sortable: true, resizable: true},
        {label: 'status', key: 'status', sortable: true, resizable: true}
      ],
      detailTableColumns: [
        {key: 'warehouseCode', label: '창고코드', sortable: true},
        {key: 'itemCode', label: '자재코드', sortable: true},
        {key: 'itemName', label: '자재명', sortable: true},
        {key: 'unitOfStock', label: '단위', sortable: true},
        {key: 'safetyAllowanceAmount', label: '안전재고량', sortable: true},
        {key: 'stockAmount', label: '가용재고량', sortable: true},
        {key: 'totalStockAmount', label: '전체재고량', sortable: true},
      ],
    },
    ]
    this.$store.dispatch('logi/base/setTable', tableColumns)
    // this.$store.dispatch('logi/sales/setTable', tableColumns)
    // this.searchContract('searchByDate')
    this.searchWarehouse()
  },
  methods: {
    // ...mapActions('logi/sales', ['searchCustomerList']),
    ...mapActions('auth', ['GET_COMPANY_CODE', 'GET_WORKPLACE_CODE', 'AUTHORITY_REQUEST']),
    /*    searchContract() {
          // const searchCondition = searchType
          this.$store.dispatch('logi/sales/searchContract')
        },
        companyCodeClick(payload) {
          console.log('companyClick')
          this.customerCode = payload.customerCode
          this.searchContract('searchByCustomer')
        },
        searchCompanyCode() {
          this.$store.dispatch('searchCustomerList')
        },
    */
    setValue(value) {
      this.rowData=value
    },
    //창고 조회, 삭제, 저장 버튼
    searchWarehouse() {
      console.log('조회 searchWarehouse')
      this.$store.dispatch('logi/base/GET_WAREHOUSE_LIST')
    },
    removeWarehouse(){
      console.log("삭제")
      console.log(this.rowData)
      //const result = this.rowData.filter(word => word != __ob__);
      delete this.rowData.__ob__;
      this.rowData.status = 'DELETE'
/*      const selectedRowElement = this.rowData.getRowEl();
      if (selectedRowElement) {
        selectedRowElement.classList.add("deleted-row");
      }*/
      console.log(this.rowData)
      console.log(this.warehouseList)
      this.$store.dispatch('logi/base/DELETE_WAREHOUSE_LIST', this.rowData)
    },
    async saveWarehouse() {

      const deleteCount = this.warehouseList.filter(item => item.status === 'DELETE').length
      const insertCount = this.warehouseList.filter(item => item.status === 'INSERT').length
      console.log(deleteCount)
      console.log(insertCount)

      if (deleteCount > 0 || insertCount>0) {
        if (!confirm(`삭제: ${deleteCount}건, 저장:${insertCount}건 진행하시겠습니까?`)) {
          return;
        }
        try {
          console.log("진행")
          console.log("저장")
          const warehouseList= this.warehouseList
          console.log(warehouseList)
          await logiApi.post('/base/warehousebatchListProcess', warehouseList)
          await this.$store.dispatch('logi/base/GET_WAREHOUSE_LIST')
        } catch (error) {
          console.error(error);
        }
      }
    },

    /**
     * 모달 ok버튼 클릭시 실행되는 함수
     */
    completeForm() {
      this.warehouseList.push(this.$refs.addWarehouseForm1.WarehouseForm)
      // this.resultSlipForm = { ...this.$refs.addWarehouseForm1.WarehouseForm, ...this.resultSlipForm }
      // this.addBtStatus = true
    },

  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.scrollStyle::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(50, 60, 150, 1);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px rgba(50, 50, 150, 1);
}

.scrollStyle::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(50, 50, 150, 0);
}

.scrollStyle::-webkit-scrollbar-thumb {
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
