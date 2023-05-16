<template>
  <div>
    <div>
      <!--라디오 버튼-->
      <legend>품목분류</legend>
      <b-form-radio-group
          v-model="itemClassificationCondition"
          :options="divisionOptions"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
      >
      </b-form-radio-group>
    </div>
    <!--input 칸-->
    <div style="float: left; display: inline-flex">
      <b-form-input
          id="item-Regist-Code"
          v-model="itemCode"
          placeholder="품목코드를 검색하세요."
          name="itemCode"
          class="mb-md-1 ml-1"
      />
      <!--품목코드검색 버튼-->
      <b-button
          variant="primary"
          v-b-modal.itemCodeRegistModal
          class="mb-md-1 ml-1"
          @click="searchItemCode"
      >
        검색
      </b-button>

      <!--품목코드 모달창-->
      <b-modal
          id="itemCodeRegistModal"
          title="품목코드"
          cancel-variant="secondary"
      >
        <b-card
            class="scrollStyle"
            style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px; font-family: '배달의민족 도현'"
        >
          <b-table
              hover
              selectable
              :select-mode="'single'"
              :fields="fields_itemCode"
              :items="itemCodeList"
              @row-clicked="itemCodeClick"
          />
        </b-card>
      </b-modal>


      <!--BOM 조회 버튼-->
      <b-button
          variant="primary"
          @click="searchRegistBomList"
          class="mb-md-1 ml-1"
      >
        BOM 조회
      </b-button>


    </div>
    <!--추가, 삭제, 일괄저장 버튼-->
    <div  style="margin: 30px 0 -14px; width: 550px; display: flex">
      <b-button-group style="height: 80%">
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            class="mb-md-1 ml-1"
            @click="editBom('set')"
        >
          새로운 항목 추가(모달)
        </b-button>


          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            class="mb-md-1 ml-1"
        >
          삭제
        </b-button>


          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            class="mb-md-1 ml-1"
            @click="addNewBom"
        >
          일괄저장
        </b-button>
      </b-button-group>
    </div>

    <b-table
        style="max-height: 300px; overflow: auto; width: 100%"
        responsive
        :items="bomRegistList"
        :fields="fields_bom"
        class="mb-0 scrollStyle"
        selectable
        :select-mode="'multiple'"
    />

      <transition
              name="fade"
              mode="out-in"
      >
          <CommonModal
                  v-if="modal"
                  @close="closeModal"
          >
              <template v-slot:header>
                  <b-col>수정해주십시오</b-col>
              </template>
              <template v-slot:body>
                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                      <div style="width: 110px; ">
                          <label style="font-size: 15px; float:right">NO : &nbsp</label>
                      </div>
                      <b-form-input
                              v-model="NO"
                              disabled
                              placeholder="NO"
                              style="width: 200px;"
                      />
                  </b-col>
                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex justify-content-start mb-3"
                  >
                      <div style="width: 110px; ">
                          <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 품목구분 : &nbsp</label>
                      </div>
                      <b-col>
                          <b-form-select
                                  v-model="itemClassificationName"
                                  :options="divisonOptions"
                                  style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                                  :state="divisionTypeStatus"
                          />
                          <b-form-invalid-feedback
                                  tooltip
                                  class="mb-3"
                                  style="margin-left:-5px"
                          >
                              값이 비었습니다. 값을 선택해 주십시오.
                          </b-form-invalid-feedback>
                      </b-col>
                  </b-col>
                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                      <div style="width: 110px; ">

                          <label style="font-size: 15px; float:right">품목코드 : &nbsp</label>
                      </div>
                      <b-form-input
                              v-model="itemCode"
                              disabled
                              placeholder="품목코드"
                              style="width: 200px;"
                      />

                  </b-col>
                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex justify-content-start mb-3"
                  >
                      <div style="width: 110px; ">
                          <label style="font-size: 15px;float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 품목명 : &nbsp</label>
                      </div>

                      <b-col>

                          <b-form-input
                                  v-model="itemName"
                                  placeholder="품목명"
                                  style="width: 200px; margin: 0 0 5px -14px"
                          />
                          <b-form-invalid-feedback
                                  tooltip
                                  class="mb-3"
                                  style="margin-left:-5px"
                          >
                              값이 비었습니다. 값을 입력해 주십시오.
                          </b-form-invalid-feedback>
                      </b-col>

                  </b-col>

                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                      <div style="width: 110px; ">

                          <label style="font-size: 15px; float:right">정미수량 : &nbsp</label>
                      </div>
                      <b-form-input
                              v-model="netAmount"
                              placeholder="정미수량"
                              style="width: 200px;"
                      />
                  </b-col>
                  <b-col
                          cols="12"
                          md="10"
                          class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                      <div style="width: 110px; ">

                          <label style="font-size: 15px; float:right">설명 : &nbsp</label>
                      </div>
                      <b-form-input
                              v-model="description"
                              placeholder="설명"
                              style="width: 200px;"
                      />
                  </b-col>

              </template>

              <template v-slot:footer>
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
                          @click="editBom('get')"
                  >
                      입력
                  </b-button>
              </template>
          </CommonModal>
      </transition>

    <!--    수정하기-->
  </div>
</template>

<script>
import {BButton, BButtonGroup, BCol, BFormInput, BFormInvalidFeedback, BFormSelect, BRow, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import CommonModal from "@/components/common/modal/CommonModal"

export default {
  name: 'Regist',
  components: {
    BCol, BRow, BFormInvalidFeedback, CommonModal, BFormInput, BFormSelect,
    BTable,
    BButton,
    BButtonGroup,
  },
  computed: {
      /*템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성*/
    ...mapState('logi/bom', ['itemCodeList']),
    ...mapState('logi/bom', ['bomRegistList']),
  },
  watch: {
   itemClassificationName(){
      console.log(this.itemClassificationName)
      this.itemClassificationName = this.itemClassificationName !== undefined ? true : null
   },
  },
    data: () => ({

            NO:'',
            itemClassificationName: '',
            itemCode: '', /*초기값 정의*/
            itemName: '',
            netAmount: '',
            description: '',
            divisionTypeStatus: '',
            divisonOptions: '',
            modal: false,

            fields_bom: [
                {key: 'NO', label: 'NO', sortable: 'true', valueGetter: "node.rowIndex + 1"},
                {key: 'itemClassificationName', label: '품목구분',},
                {key: 'itemCode', label: '품목코드',},
                {key: 'itemName', label: '품목명',},
                {key: 'netAmount', label: '정미수량',},
                {key: 'description', label: '설명',},
                {key: 'status', label: 'status',},
                {key: 'itemClassification', label: 'itemClassification', thClass: 'd-none', tdClass: 'd-none' },
                {key: 'parentItemCode', label: 'parentItemCode', thClass: 'd-none', tdClass: 'd-none' },
                {key: 'beforeStatus', label: 'beforeStatus', thClass: 'd-none', tdClass: 'd-none' },
                {key: 'deleteStatus', label: 'deleteStatus', thClass: 'd-none', tdClass: 'd-none' },
            ],
            fields_itemCode: [
                { key: 'detailCode', label: '상세코드번호' },
                { key: 'detailCodeName', label: '상세코드이름' },
            ],
            /*라디오 버튼 옵션*/
            itemClassificationCondition: 'IT-CI',
            divisionOptions: [
                { item: 'IT-CI', name: '완제품' },
                { item: 'IT-SI', name: '반제품' },
            ],
    }),
  methods : { /*vue 인스턴스가 사용할 함수를 저장하고있는 속성*/
    ...mapActions('logi/bom', ['SEARCH_ITEM_CODE_LIST']),
    /*품목코드 검색 버튼 이벤트*/
    searchItemCode(){
      console.log("searchItemCode 실행")
      console.log("itemClassificationCondition", this.itemClassificationCondition)
      this.SEARCH_ITEM_CODE_LIST(this.itemClassificationCondition)
    },
    /*품목코드 모달 row 클릭 이벤트*/
    itemCodeClick(item, index, e) {
      console.log("itemCodeClick 실행")
      const newObject = item.detailCode
      this.itemCode = newObject
    },
    /*BOM 조회 버튼 이벤트 - 정전개/역전개 tap과 달리 itemCode만 파라미터로 보냄*/
    searchRegistBomList(){
      console.log("searchRegistBomList 실행")
      const payload = {
        parentItemCode: this.$data.itemCode,
      }
      this.$store.dispatch('logi/bom/SEARCH_REGIST_BOM_LIST', payload)
    },
    editBom(condition){
      console.log(this.itemClassificationName)
      if (condition === 'set') {
        this.NO = this.selected.NO
        this.itemClassificationName = this.selected.itemClassificationName
        this.itemCode = this.selected.itemCode
        this.itemName = this.selected.itemName
        this.netAmount = this.selected.netAmount
        this.description = this.selected.description
        this.modal = true
      } else if (condition === 'get') {
          if (this.itemClassificationName === undefined || this.itemClassificationName.length === 0) {
              this.selected.itemClassificationName = false
              return
          } if (this.itemName === undefined || this.itemName.length === 0) {
              this.itemName = false
          }
          this.selected.NO = this.NO
          this.selected.itemClassificationName = this.itemClassificationName
          this.selected.itemCode = this.itemCode
          this.selected.itemName = this.itemName
          this.selected.netAmount = this.netAmount
          this.selected.description = this.description
          this.modal = false
      }
    },
    closeModal(){
          this.modal = false
    },
    /*새로운 항목 추가 클릭 이벤트*/
    addNewBom(){
      const param = [{
        batchList: {
          NO: this.selected.NO,
          itemClassificationName: this.selected.itemClassificationName,
          itemCode: this.selected.itemCode,
          itemName: this.selected.itemName,
          netAmount: this.selected.netAmount,
          description: this.selected.description,
        },
      }]
        console.log(param)
        this.$store.dispatch('logi/purchase/addNewBom', param).then(
          this.$swal.fire(
             'BOM 등록 완료!',
             'BOM 등록이 완료되었습니다.',
             'success',
          ).then(this.$emit('page-refresh')),
        )
    },
  },
}
</script>
