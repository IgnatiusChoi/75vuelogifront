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
    <div>
      <legend>BOM 검색조건</legend>
      <b-form-radio-group
          v-model="deployCondition"
          :options="conditionOptions"
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
          id="item-Code"
          v-model="itemCode"
          placeholder="품목코드를 검색하세요."
          name="itemCode"
          class="mb-md-1 ml-1"
      />
      <!--품목코드검색 버튼-->
      <b-button
          variant="outline-primary"
          v-b-modal.itemCodeModal
          class="mb-md-1 ml-1"
          @click="searchItemCode"
      >
        검색
      </b-button>
      <!--품목코드 모달창-->
      <b-modal
          id="itemCodeModal"
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
          @click="searchBomList"
      >
        BOM 조회
      </b-button>
    </div>
    <!--bom 조회 테이블-->
    <b-table
        style="max-height: 300px; overflow: auto; width: 100%"
        responsive
        :items="bomList"
        :fields="fields_bom"
        class="mb-0 scrollStyle"
    />
  </div>
</template>

<script>
import {BButton, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Deploy',
  components: {
    BTable,
    BButton,
  },
  computed: { /*템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성*/
    ...mapState('logi/bom', ['itemCodeList']),
    ...mapState('logi/bom', ['bomList']),
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
      this.itemCode = newObject /*메서드 내에서 this 사용하여 컴포넌트 인스턴스에 접근 가능*/
    },
    /*BOM 조회 버튼 이벤트*/
    searchBomList(){
      console.log("searchBomList 실행")
      const payload = {
        itemClassificationCondition: this.$data.itemClassificationCondition,
        deployCondition: this.$data.deployCondition,
        itemCode: this.$data.itemCode,
      }
      this.$store.dispatch('logi/bom/SEARCH_BOM_LIST', payload)
    },
  },
  data() { /*(여긴 함수 형태) 객체 or 함수 형태로 vue 인스턴스가 사용할 정보 가진 속성*/
    return {
      itemCode:'', /*초기값 선언*/
      /*필드 정의*/
      fields_bom: [
        {key: 'bomNo', label: 'BOM 번호', sortable: 'true',},
        {key: 'bomLevel', label: 'BOM 레벨',},
        {key: 'parentItemCode', label: '상위품목코드',},
        {key: 'itemCode', label: '품목코드',},
        {key: 'itemName', label: '품목명',},
        {key: 'unitOfStock', label: '단위',},
        {key: 'netAmount', label: '정미수량',},
        {key: 'lossRate', label: '손실율',},
        {key: 'necessaryAmount', label: '필요수량',},
        {key: 'leadTime', label: '리드타임',},
        {key: 'isLeaf', label: 'isLeaf',},
        {key: 'description', label: '비고',},
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
        { item: 'IT-MA', name: '원재료' }
      ],
      deployCondition: 'forward',
      conditionOptions: [
        { item: 'forward', name: '정전개' },
        { item: 'reverse', name: '역전개' },
      ],
    }
  },
}
/*watch는 vue 내부의 요소가 변경되었음을 감지해준다.
또한 뷰 안에서의 라우터가 변경음을 감지해준다.*/
</script>