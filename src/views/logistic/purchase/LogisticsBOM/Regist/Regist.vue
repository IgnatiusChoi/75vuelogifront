<template>

  <div>
    <div>
      <!--품목 분류 선택 버튼-->
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
    </div>

    <div style="display: flex; margin: 30px 0 0 -14px;  justify-content: space-between;">
      <b-button-group class="mr-2">
        <!--품목코드검색 버튼-->
        <b-button
            v-b-modal.itemCodeRegistModal
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="md"
            class="mb.md-1 ml-1"

            @click="searchItemCode"
        >
          검색
        </b-button>

        <!--BOM 조회 버튼-->
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="md"
            @click="searchRegistBomList"
        >
          BOM 조회
        </b-button>
      </b-button-group>

      <!--추가, 삭제, 일괄저장 버튼-->
      <b-button-group>
        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            size="md"
            class="mb.md-1 ml-1"
            @click="onAddBomClick"
        >
          새로운 항목 추가
        </b-button>

        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="onDeleteClick"
        >
          삭제
        </b-button>

        <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="allSaveClick"
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
        :select-mode="'single'"
        @row-selected="onRowSelected"
        @row-dblclicked="onRowDoubleClicked"
    />

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

    <!--Bom추가 모달-->
    <b-modal
        id="addBom" title="Bom 추가"
        cancel-variant="outline-secondary"
        @ok="addRow"
    >
      <BomRegform
          ref="AddRegistModal"
      />
    </b-modal>

    <!--Bom netAmount 수정 모달-->
    <b-modal
        id="editBomModal"
        title="Bom 수정"
        cancel-variant="outline-secondary"
        @ok="onEditBomModalOk"
    >
      <div class="form-group">
        <label for="editNetAmount">정미수량</label>
        <input type="number" class="form-control" id="editNetAmount" v-model="editedNetAmount"/>
      </div>
    </b-modal>
  </div>

</template>

<script>
import {BButton, BButtonGroup, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import BomRegform from "/src/components/logistic/purchase/page/LogisticsBOM/Regist/AddRegistModal.vue";
import Ripple from "vue-ripple-directive";

export default {
  name: 'Regist',
  components: {
    BomRegform,
    BTable,
    BButton,
    BButtonGroup,
  },

  directives: {
    Ripple,
  },

  computed: { /*템플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성*/
    ...mapState('logi/bom', ['itemCodeList']),
    ...mapState('logi/bom', ['bomRegistList']),

    //dbs
    ...mapState({
      bomRegistList: state => state.logi.bom.bomRegistList,
    })
  },

  methods: { /*vue 인스턴스가 사용할 함수를 저장하고있는 속성*/
    ...mapActions('logi/bom', ['SEARCH_ITEM_CODE_LIST']),

    /*품목코드 검색 버튼 이벤트*/
    searchItemCode() {
      this.SEARCH_ITEM_CODE_LIST(this.itemClassificationCondition)
    },

    /*품목코드 모달 row 클릭 이벤트*/
    itemCodeClick(item, index, e) {
      const newObject = item.detailCode
      this.itemCode = newObject
    },

    /*BOM 조회 버튼 이벤트 - 정전개/역전개 tap과 달리 itemCode만 파라미터로 보냄*/
    searchRegistBomList() {
      const payload = {
        parentItemCode: this.$data.itemCode,
      }
      this.$store.dispatch('logi/bom/SEARCH_REGIST_BOM_LIST', payload)
    },
    setValue(value) {
      this.rowData = value
    },

    /*삭제 버튼 클릭 이벤트*/
    onRowSelected(selectedRows, index) {
      this.selectedRows = selectedRows;
    },

    //dbs
    //새로운 항목 추가 버튼 이벤트
    onAddBomClick() {
      if (this.bomRegistList.length === 0) {
        alert("Bom 조회를 해주세요.")
      } else {
        this.$bvModal.show('addBom');
      }
    },
    addRow() {
      const newItemCode = this.$refs.AddRegistModal.itemCode;
      const duplItemCode = this.bomRegistList.some(row => row.itemCode === newItemCode);
      if (duplItemCode) {
        alert("중복된 값입니다.");
      } else {
        const newRowData = {
          itemClassificationName: this.$refs.AddRegistModal.divisionText,
          itemCode: newItemCode,
          itemName: this.$refs.AddRegistModal.itemName,
          netAmount: this.$refs.AddRegistModal.netAmount,
          description: this.$refs.AddRegistModal.description,
          status: 'INSERT',
          parentItemCode: this.itemCode
        };
        console.log(this.itemCode)
        this.bomRegistList.push(newRowData);
      }
    },

    //삭제 버튼 이벤트
    onDeleteClick() {
      if (this.selectedRows.length === 0) {
        alert("삭제할 항목을 선택해주세요.")

      } else if (this.selectedRows.length >= 1) {
        if (!window.confirm(
            "선택한 항목을 삭제하시겠습니까?"
        )) {

        } else {
          this.selectedRows.forEach(row => {
            row.status = "DELETE";
          })
        }
      }
    },

    //Bom netAmount 수정 더블클릭 이벤트
    onRowDoubleClicked(row, index, event) {
      this.selectedRow = row;
      this.editedNetAmount = row.netAmount;
      this.$bvModal.show('editBomModal');
    },
    onEditBomModalOk() {
      if (this.selectedRow.netAmount !== this.editedNetAmount) {
        this.selectedRow.netAmount = this.editedNetAmount;
        this.selectedRow.status = "UPDATE";
      }
      this.selectedRow = null;
      this.editedNetAmount = 0;
    },

    //일괄 저장 버튼 이벤트
    allSaveClick() {
      const insertCount = this.bomRegistList.filter(selectedRows => selectedRows.status === 'INSERT').length;
      const deleteCount = this.bomRegistList.filter(selectedRows => selectedRows.status === 'DELETE').length;
      const updateCount = this.bomRegistList.filter(selectedRows => selectedRows.status === 'UPDATE').length;
      if (insertCount > 0 || deleteCount > 0 || updateCount > 0) {
        if (!confirm(`추가: ${insertCount}건, 삭제:${deleteCount}건, 수정:${updateCount} 진행하시겠습니까?`)) {
        } else {
          const bomRegistList = this.bomRegistList;
          this.$store.dispatch("logi/bom/BATCH_BOM_LIST", bomRegistList);
          this.$store.dispatch("logi/bom/SEARCH_BOM_LIST");

          location.reload();
        }
      } else {
        alert("변경사항이 없습니다.")
      }
    },
  },


  data() {
    return {
      itemCode: '',

      /*초기값 정의*/
      fields_bom: [
        {key: 'NO', label: 'NO', sortable: 'true', valueGetter: "node.rowIndex + 1"},
        {key: 'itemClassificationName', label: '품목구분',},
        {key: 'itemCode', label: '품목코드',},
        {key: 'itemName', label: '품목명',},
        {key: 'netAmount', label: '정미수량', editable: true},
        {key: 'description', label: '설명',},
        {key: 'status', label: 'status',},
        {key: 'itemClassification', label: 'itemClassification', thClass: 'd-none', tdClass: 'd-none'},
        {key: 'parentItemCode', label: 'parentItemCode', thClass: 'd-none', tdClass: 'd-none'},
        {key: 'beforeStatus', label: 'beforeStatus', thClass: 'd-none', tdClass: 'd-none'},
        {key: 'deleteStatus', label: 'deleteStatus', thClass: 'd-none', tdClass: 'd-none'},
      ],


      fields_itemCode: [
        {key: 'detailCode', label: '상세코드번호'},
        {key: 'detailCodeName', label: '상세코드이름'},
      ],

      /*radio 버튼 옵션*/
      itemClassificationCondition: 'IT-CI',
      divisionOptions: [
        {item: 'IT-CI', name: '완제품'},
        {item: 'IT-SI', name: '반제품'},
      ],

      selectedRows: [],
      editedNetAmount: 0,
    }
  },
}
</script>


<style lang="scss">
@import 'src/assets/scss/scrollStyle';

body {
  font-family: "배달의민족 도현";
}
</style>
