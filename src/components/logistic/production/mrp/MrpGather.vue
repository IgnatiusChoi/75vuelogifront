<template>
  <div>
    <div
      style="margin: 30px 0 0 -14px; width: 550px; display: flex"
    >
      <b-button-group style="height: 80%">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          v-b-modal.mrpGatherResultList
          style="margin-bottom: 15px; margin-left: 15px;"
          variant="outline-primary"
          @click="searchMrpGatherResultList"
        >
          소요량 취합 결과 조회
        </b-button>
        <b-modal
          id="mrpGatherResultList"
          size="xl"
          hide-backdrop
          ok-only
          no-close-on-backdrop
          title="MRP Simulation"
          cancel-variant="outline-secondary"
          ok-title="취합 결과 등록"
          ok-variant="outline-primary"
          @ok="gatherRegist"
        >
          <b-col>
            <b-form-group>
              <flat-pickr
                v-model="registDate"
                style="margin-bottom: 15px; float:right; width: 200px;"
                placeholder="소요량취합 등록일자"
                class="form-control"
              />
            </b-form-group>
          </b-col>
          <template>
            <b-table
              hover
              :fields="mrpGatherResultList"
              :items="this.mrpResultList"
            /></template>
        </b-modal>
      </b-button-group>
    </div>
    <div>
      <b-table
        class="editable-table"
        hover
        :fields="mrpGatherListFields"
        :items="this.getMrpGatherList"
      />
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
      mrpGatherListFields: mrpGatherList,
      mrpRegisterDate: null,
    }
  },
  computed: {
    ...mapState('logi/mrp', ['getMrpGatherList', 'mrpResultList', 'mrpNoAndItemCodeList']),
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
    searchMrpGatherList() {
      const mrpGatheringStatusCondition = ''
      this.SEARCH_MRP_GATHER_LIST_REQUEST({ mrpGatheringStatusCondition })
    },
    searchMrpGatherResultList() {
      const size = this.getMrpGatherList.length
      const mpsNoList = []
      for (let mpsNumber = 0; mpsNumber < size; mpsNumber++) {
        mpsNoList.push(this.getMrpGatherList[mpsNumber].mrpNo)
      }
      this.SEARCH_MRP_GATHER_RESULT_LIST(mpsNoList.toString())
    },
    gatherRegist() {
      const { registDate } = this
      const batchList = this.mrpResultList
      const { mrpNoAndItemCodeList } = this

      const payload = {
        mrpGatheringRegisterDate: registDate,
        batchList,
        mrpNoAndItemCodeList,
      }

      this.GATHER_RESULT_REGIST(payload)

      this.alert('등록 성공')
    },
  },
}
</script>
<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
