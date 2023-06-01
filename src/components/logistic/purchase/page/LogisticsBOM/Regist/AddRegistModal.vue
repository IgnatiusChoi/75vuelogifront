<template>
  <div>
    <b-form>

      <!--품목구분-->
      <b-row>
        <b-col cols="9">
          <b-form-group
              label="품목구분"
          >
            <b-form-radio-group
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                :options="divisionOptions"
                v-model="itemClassificationCondition"
            >
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!--품목코드-->
      <b-row>
        <b-col cols="9">
          <b-form-group
              label="품목코드"
          >
            <b-form-input
                id="addBomData"
                placeholder="품목코드를 검색하세요."
                name="itemCode"
                v-model="itemCode"
            >
            </b-form-input>
            <!--품목코드 검색 버튼-->
            <b-button
                v-b-modal.itemCodeModal1
                variant="outline-primary"
                @click="searchItemCode"
            >
              검색
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>

      <!--품목명-->
      <b-row>
        <b-col cols="9">
          <b-form-group
              label="품목명"
          >
            <b-form-input
                id="item-Name"
                v-model="itemName"

                disabled
            >
            </b-form-input>
          </b-form-group>

        </b-col>
      </b-row>

      <!--정미수량-->
      <b-row>
        <b-col cols="9">
          <b-form-group
              label="정미수량"
          >
            <b-form-input
                type="number"
                placeholder="수량을 입력하세요"
                v-model="netAmount"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!--설명-->
      <b-row>
        <b-col cols="9">
          <b-form-group
              label="설명"
          >
            <b-form-input
                v-model="description"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!--품목코드 검색 modal-->
      <b-modal
          id="itemCodeModal1"
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
    </b-form>

  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormSelect,
  BFormRadioGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {mapActions, mapState} from "vuex";
import axios from "axios";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormSelect,
    BFormRadioGroup,

  },

  directives: {
    Ripple,
  },

  props: [],

  mounted: {},

  computed: {
    ...mapState('logi/bom', ['bomDataList']),
    ...mapState('logi/bom', ['itemCodeList']),
  },

  //품목코드를 품목명으로 변경해주기
  watch: {
    itemClassificationCondition(value) {
      const selectedOption = this.divisionOptions.find((option) => option.item === value);
      if (selectedOption) {
        this.divisionText = selectedOption.name;
      }
    }
  },

  methods: {
    //dbs
    ...mapActions('logi/bom', ['SEARCH_ITEM_CODE_LIST']),

    searchItemCode() {
      this.SEARCH_ITEM_CODE_LIST(this.itemClassificationCondition)
    },

    // searchBomDataList() {
    //   const payload = {
    //     itemClassificationCondition: this.$data.itemClassificationCondition,
    //     itemCode: this.$data.itemCode,
    //   }
    //   this.$store.dispatch('logi/bom/SEARCH_BOM_DATA_LIST', payload)
    // },

    itemCodeClick(item, index, e) {
      const newObject = item.detailCode
      const newObject1 = item.detailCodeName
      this.itemCode = newObject
      this.itemName = newObject1
    },
  },

  data() {
    return {
      visible: false,
      selected: '',
      selectedOption: null,

      bomData: '',
      itemCode: '',
      itemClassificationCondition: '',
      itemName: '',
      netAmount: '',
      description: '',

      divisionOptions: [
        {item: 'IT-CI', name: '완제품'},
        {item: 'IT-SI', name: '반제품'},
        {item: 'IT-MA', name: '원재료'},
      ],

      divisionText: '',

      fields_itemCode: [
        {key: 'detailCode', label: '상세코드번호'},
        {key: 'detailCodeName', label: '상세코드이름'},
      ],
    }
  },
}
</script>
