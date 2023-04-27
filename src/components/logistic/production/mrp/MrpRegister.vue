<template>
  <div>
    <div
      style="margin: 30px 0 0 -14px; width: 550px; display: flex"
    >
      <b-col>
        <b-form-group>
          <flat-pickr
            v-model="rangeDate"
            placeholder="신청일자"
            class="form-control"
            :config="{ mode: 'range'}"
          />
        </b-form-group>
      </b-col>
      <b-button-group style="height: 80%">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchMps"
        >
          MPS조회
        </b-button>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="simulateMRP"
        >
          MRP모의전개
        </b-button>
        <b-modal
          id="MRPSimulation"
          :visible="this.isVisible"
          size="xl"
          hide-backdrop
          ok-only
          no-close-on-backdrop
          title="MRP Simulation"
          cancel-variant="outline-secondary"
          ok-title="전개결과 MRP 등록"
          ok-variant="outline-primary"
          @ok="MrpInsert"
          @change="closeModal"
        >
          <template>
            <flat-pickr
              v-model="mrpRegisterDate"
              style="margin-bottom: 10px; margin-right: 10px; width: 166px; float: right;"
              placeholder="소요량전개 일자"
              class="form-control"
            />
            <b-table
              hover
              :fields="openMrp"
              :items="this.mrpList"
            />
          </template>
        </b-modal>
      </b-button-group>
    </div>
    <div>
      <b-table
        class="editable-table"
        hover
        selectable
        :select-mode="'single'"
        :fields="searchMpsList"
        :items="this.mpsList"
        @row-selected="handleInput"
      />
    </div>
  </div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import {
  BCol, BButtonGroup,
  BButton, BFormGroup, BTable,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { openMrp, searchMpsList } from '@/components/logistic/production/fields'
import { mapActions, mapState } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'MrpRegister',
  components: {
    BCol,
    flatPickr,
    BFormGroup,
    BButtonGroup,
    BButton,
    BTable,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isVisible: false,
      mpsNo: null,
      searchMpsList,
      openMrp,
      mrpRegisterDate: null,
      rangeDate: null,
      startDate: null,
      endDate: null,
    }
  },
  computed: {
    ...mapState('logi/mrp', ['mpsList', 'mrpList']),
  },
  methods: {
    ...mapActions('logi/mrp', ['SEARCH_MPS_LIST', 'SEARCH_MRP_LIST', 'REGISTER_MRP']),
    extractDate() {
      this.startDate = this.rangeDate.split('to')[0].trim()
      this.endDate = this.rangeDate.split('to')[1].trim()
    },
    handleInput(payload) {
      this.mpsNo = payload
    },
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
    searchMps() {
      if (this.rangeDate === null) {
        throw new Error('신청일자 선택하셈.')
      } else {
        this.extractDate()
        const payload = { startDate: this.startDate, endDate: this.endDate }
        this.SEARCH_MPS_LIST(payload)
        this.alert('조회 성공')
      }
    },
    closeModal() {
      // 모달이 사라질 때만 작동... change라면서요...
      this.isVisible = false
    },
    simulateMRP() {
      if (this.mpsNo === null) {
        throw new Error('모의전개 할 MPS 선택하셈.')
      }
      if (this.mpsNo[0].mrpApplyStatus === 'Y') {
        throw new Error('MRP적용 완료된 상태임')
      }

      this.isVisible = true
      this.SEARCH_MRP_LIST(this.mpsNo)
    },
    async MrpInsert(e) {
      if (this.mrpRegisterDate === null) {
        e.preventDefault()
        throw new Error('소요량전개 일자 선택하셈.')
      } else {
        const payload = { mrpRegisterDate: this.mrpRegisterDate, batchList: this.mrpList }
        await this.REGISTER_MRP(payload)
        this.mrpRegisterDate = null
        this.alert('등록성공')

        const datePayload = { startDate: this.startDate, endDate: this.endDate }
        this.SEARCH_MPS_LIST(datePayload)
      }
    },
  },
}
</script>
<style  lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
