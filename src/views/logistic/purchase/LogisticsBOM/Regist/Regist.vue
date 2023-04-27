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
          variant="outline-primary"
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
          cancel-variant="outline-secondary"
      >
        <b-card
            class="scrollStyle"
            style="margin:auto; overflow-y: scroll; height: 50vh; padding-left: 50px"
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
          variant="outline-primary"
          @click="searchRegistBomList"
      >
        BOM 조회
      </b-button>
    </div>
    <!--추가, 삭제, 일괄저장 버튼-->
    <div  style="margin: 30px 0 0 -14px; width: 550px; display: flex">
      <b-button-group style="height: 80%">
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="info"
            @click="addRow"
        >
          새로운 항목 추가
        </b-button>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="info"
        >
          삭제
        </b-button>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="info"
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
    <!--    수정하기-->
  </div>
</template>

<script>
import {BButton, BButtonGroup, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Regist',
  components: {
    BTable,
    BButton,
    BButtonGroup,
  },
  computed: { /*템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성*/
    ...mapState('logi/bom', ['itemCodeList']),
    ...mapState('logi/bom', ['bomRegistList']),
  },
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
  },
  data() {
    return {
      itemCode:'', /*초기값 정의*/
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
    }
  },
}
</script>