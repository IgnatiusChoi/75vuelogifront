<template>
  <div style="font-family: '배달의민족 도현'; display: flex; ">
    <div style="width: 70%; overflow-y: auto;">
      <div style="margin-top: 0px;">
        <b-card no-body>
          <div style="margin: 10px 0 0 20px;">
            <h3 style="font-weight: bold">조달 구분</h3>
          </div>
          <b-tabs pills card v-model="selectedTab">
            <b-tab title="구매" active style="margin: -20px 0 0 0;">

              <p style="font-weight: bold">
                품목구분이 <span :class="{ 'text-danger': true }">원재료</span>인 경우
                필요수량은 <span :class="{ 'text-danger': true }">구매(발주)</span>하여야 합니다.
              </p>
              <b-table
                  class="editable-table"
                  hover
                  :fields="mrpGatherList"
                  :items="this.filteredMrpOrderList"
              >
              <!--  요청일 popover -->
              <template #head(orderDate)="scope">
                <div>
                  <b-icon-question-circle v-b-popover.hover.top="'구매의 경우 발주요청일'"/>
                  {{ scope.label }}
                </div>
              </template>
              <!--  요청일 popover -->

              <!--  소요일자 popover -->
              <template #head(requiredDate)="scope">
                <div>
                  <b-icon-question-circle v-b-popover.hover.top="'구매의 경우 구매한 품목 도착예정일'"/>
                  {{ scope.label }}
                </div>
              </template>
              <!--  소요일자 popover -->
              </b-table>
            </b-tab>
            <b-tab title="생산" style="margin: -20px 0 0 0;">
              <p style="font-weight: bold">
                품목구분이 <span :class="{ 'text-danger': true }">반제품,완제품</span>인 경우
                필요수량은 <span :class="{ 'text-danger': true }">생산</span>하여야 합니다.
              </p>
              <b-table
                  class="editable-table"
                  hover
                  :fields="mrpGatherList"
                  :items="this.filteredMrpProductList"
              >
                <!--  요청일 popover -->
                <template #head(orderDate)="scope">
                  <div>
                    <b-icon-question-circle v-b-popover.hover.top="'생산의 경우 생산시작 요청일'"/>
                    {{ scope.label }}
                  </div>
                </template>
                <!--  요청일 popover -->

                <!--  소요일자 popover -->
                <template #head(requiredDate)="scope">
                  <div>
                    <b-icon-question-circle v-b-popover.hover.top="'생산의 경우 구매한 작업완료일'"/>
                    {{ scope.label }}
                  </div>
                </template>
                <!--  소요일자 popover -->
              </b-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>

    <div style="width: 30%; position: fixed; top: 40%; right: -25%; transform: translate(-50%, -50%);">
      <div >
        <b-button-group>
          <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              v-b-modal.mrpGatherResultList
              style="margin-bottom: 15px; margin-left: 15px; margin-top: 15px;"
              variant="outline-primary"
              @click="searchMrpGatherResultList"
          >
            <span v-if="selectedTab == 0">구매 소요량 취합 실행</span>
            <span v-if="selectedTab == 1">생산 소요량 취합 실행</span>

          </b-button>
          <b-modal
              id="mrpGatherResultList"
              size="xl"
              hide-backdrop
              no-close-on-backdrop
              title="MRP Simulation"
              cancel-variant="outline-secondary"
              ok-title="취합 결과 등록"
              cancel-title="cancel"
              ok-variant="outline-primary"
              @ok="gatherRegist"
              @cancel="cancel"
          >
            <template>
              <b-table
                  style="font-family: '배달의민족 도현'"
                  hover
                  :fields="mrpGatherResultList"
                  :items="this.mrpResultList"
              />
            </template>
            <b-col>
              <b-form-group>
                <flat-pickr
                    v-model="registDate"
                    style="margin-bottom: 15px; float:right; width: 200px;"
                    placeholder="소요량취합 등록일자"
                    class="form-control custom-placeholder"
                />
              </b-form-group>
            </b-col>
          </b-modal>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import {
  BButtonGroup, BFormGroup,
  BButton, BTable, BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mrpGatherList, mrpGatherResultList } from '@/components/logistic/production/fields'
import { mapActions, mapState } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent'


export default {
  name: 'MrpRegister',
  components: {
    BCol,
    BButtonGroup,
    BButton,
    BTable,
    BFormGroup,
    flatPickr,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      registDate: null,
      mrpGatherResultList,
      mrpGatherList,
      mrpRegisterDate: null,
      orderTable : [],
      productTable: [],
      selectedTab : '',
      orderGatherResult : [],
      productGatherResult : [],
      mrpGatheringStatus : '',
      orderMrpNoAndItemCodeList  : '',
      productMrpNoAndItemCodeList : '',

    }
  },
  computed: {
    ...mapState('logi/mrp', ['getMrpGatherList', 'mrpResultList', 'mrpNoAndItemCodeList', ]),
    filteredMrpOrderList() {
      this.orderTable = this.getMrpGatherList.filter(item => item.itemClassification === '원재료');
      this.orderMrpNoAndItemCodeList
          = this.orderTable.map(item => ({ itemCode: item.itemCode, mrpNo: item.mrpNo }));
      return this.orderTable
    },
    filteredMrpProductList() {
      this.productTable = this.getMrpGatherList.filter(item => item.itemClassification === '반제품' || item.itemClassification === '완제품' );
      this.productMrpNoAndItemCodeList
          = this.productTable.map(item => ({ itemCode: item.itemCode, mrpNo: item.mrpNo }));
      return this.productTable
    },
  },

  methods: {
    ...mapActions('logi/mrp', ['SEARCH_MRP_GATHER_LIST_REQUEST', 'SEARCH_MRP_GATHER_RESULT_LIST', 'GATHER_RESULT_REGIST']),
    alert(msg) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: msg,
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },

    // 화면 디폴트 테이블
    searchMrpGatherList() {
      const mrpGatheringStatusCondition = ''
      this.SEARCH_MRP_GATHER_LIST_REQUEST({ mrpGatheringStatusCondition })
    },

    //모달창 테이블
    async searchMrpGatherResultList() {
      const mpsNoList = []
      //구매탭 일때
      if(this.selectedTab == 0){
        const size = this.orderTable.length
        for (let mpsNumber = 0; mpsNumber < size; mpsNumber++) {
          mpsNoList.push(this.orderTable[mpsNumber].mrpNo)
        }
       this.orderGatherResult = await this.SEARCH_MRP_GATHER_RESULT_LIST(mpsNoList.toString())
      }

      //생산탭 일때
      else if(this.selectedTab == 1){
        const size = this.productTable.length
        for (let mpsNumber = 0; mpsNumber < size; mpsNumber++) {
          mpsNoList.push(this.productTable[mpsNumber].mrpNo)
        }
        this.productGatherResult = await this.SEARCH_MRP_GATHER_RESULT_LIST(mpsNoList.toString())
      }
    },

    //모달창 취합 결과 등록
    gatherRegist() {

      //구매탭 일때
      if(this.selectedTab == 0){
        const batchList = this.orderGatherResult.gridRowJson
        const registDate  = this.registDate

        const payload = {
          batchList,
          mrpGatheringRegisterDate: registDate,
          mrpNoAndItemCode: this.orderMrpNoAndItemCodeList,
        }

        this.GATHER_RESULT_REGIST(payload)
        this.alert('등록 성공')
      }

      //생산탭 일때
      else if(this.selectedTab == 1){
        const batchList = this.productGatherResult.gridRowJson
        const registDate = this.registDate

        const payload = {
          batchList,
          mrpGatheringRegisterDate: registDate,
          mrpNoAndItemCode: this.productMrpNoAndItemCodeList,
        }

        this.GATHER_RESULT_REGIST(payload)
        this.alert('등록 성공')
      }
    },
  },
}
</script>
<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.custom-placeholder::placeholder {
  color: #ed5017;
  text-align: center;
}


</style>
