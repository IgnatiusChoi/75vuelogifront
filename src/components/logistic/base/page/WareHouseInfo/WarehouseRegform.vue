<template>
  <div>
    <!-- 전표 모달 내용
     and 연산자 or 연산자는 아래와 같이 한개씩 다 비교해줘야한다!!! -->
    <b-form
        v-if="//modalStatus==='addSlip' || modalStatus==='editSlip'||
        modalStatus==='addWarehouse'"
    >
      <b-row>
        <b-col md="12">
          <b-form-group
              label="창고코드"
              label-for="warehouseCode"
          >
            <b-form-input
                id="warehouseCode"
                v-model="WarehouseForm.warehouseCode"

                disabled
            />
          </b-form-group>
        </b-col>
<!--        <b-col md="12">
        <b-form-group
              label="창고사용여부"
              label-for="warehouseUseOrNot"
          >
            <b-form-select
                id="warehouseUseOrNot"
                v-model="WarehouseForm.warehouseUseOrNot"
                :options="options"
            />
        </b-col>-->
        <b-col md="12">
          <b-form-group label="창고사용여부" label-for="warehouseUseOrNot">
              <b-form-radio-group v-model="WarehouseForm.warehouseUseOrNot" :options="options" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group
              label="창고명"
              label-for="warehouseName"
          >
            <b-form-input
                id="warehouseName"
                v-model="WarehouseForm.warehouseName"

            />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group
              label="설명"
              label-for="description"
          >
            <b-form-input
                id="description"
                v-model="WarehouseForm.description"
            />

          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col>
          <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              disabled
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>

  </div>
</template>
<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormSelect,
  BFormRadioGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

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
  props: ['modalStatus', 'editSlip', 'editJournal','addWarehouse'],
  data() {
    return {
      selected: '',

      options: [
        { value: 'Y', text: '예' },
        { value: 'N', text: '아니오' },
      ],
      /**
       * 창고등록 정보
       */
      WarehouseForm: {
        warehouseCode: '',
        warehouseUseOrNot: '',
        warehouseName: '',
        description: '',
        status: 'INSERT',
      },
    }
  },
  methods: {

  }

}
</script>
