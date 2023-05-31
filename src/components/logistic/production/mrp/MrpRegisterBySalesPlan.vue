<template>
  <div style="font-family: '배달의민족 도현'">
    <div
      style="display: flex; margin: 0 0 20px 0;"
    >
        <b-form-group style="margin: 0 20px 0 150px; width: 250px;">
          <flat-pickr
            v-model="rangeDate"
            placeholder="MPS 계획일자 (기간)선택"
            class="form-control custom-placeholder"
            :config="{ mode: 'range'}"
          />
        </b-form-group>

      <b-button-group
          style="height: 80%; display: flex;"
          class="justify-content-md-center"
      >
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="searchMps"
        >
          MPS 조회
        </b-button>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="updateModal"
        >
          MPS 수정
        </b-button>
      </b-button-group>

      <b-modal
          :visible="this.mpsUpdateModal"
          size="lg"
          hide-backdrop
          ok-only
          no-close-on-backdrop
          title="MPS 수정"
          cancel-variant="outline-secondary"
          ok-title="수정 완료"
          ok-variant="outline-primary"
          @ok="updateMps"
          @change="closeUpdateModal"
      >
          <b-container>
            <b-row class="my-1" v-for="(field,index) in searchMpsListBySalesPlan" :key="index" style="font-family: '배달의민족 도현'">
              <b-col sm="4" >
                <label :for="`field-${field}`" class="label-font">{{ field.label }} &nbsp :</label>
              </b-col>
              <b-col sm="6">
                <template>
                <b-input-group class="mb-md-1" style="width: 270px; margin: 0 10px 0 10px;">
                  <b-form-input v-model="selectedMps[0][field.key]"
                                type="text"
                                autocomplete="off"
                                show-decade-nav />
                </b-input-group>
                </template>
              </b-col>
            </b-row>
          </b-container>

      </b-modal>
        <b-button
            style="margin: 0 0 0 600px;"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            @click="simulateMRP"
        >
          MRP 모의전개
        </b-button>
    </div >
        <b-modal
          id="MRPSimulation"
          :visible="this.isVisible"
          size="xl"
          hide-backdrop
          ok-only
          no-close-on-backdrop
          title="MRP Simulation"
          cancel-variant="outline-secondary"
          ok-title="MRP 등록"
          ok-variant="outline-primary"
          @ok="MrpInsert"
          @change="closeModal"
        >
          <template>
            <b-table
              hover
              style="font-family: '배달의민족 도현'"
              :fields="openMrp"
              :items="this.mrpList"
            />
            <flat-pickr
              v-model="mrpRegisterDate"
              style=" width: 166px; float: right; font-family: '배달의민족 도현'"
              placeholder="MRP 등록 일자"
              class="form-control custom-placeholder"
            />
          </template>
        </b-modal>

    <div>
      <b-table
        class="editable-table"
        hover
        selectable
        :select-mode="'single'"
        :fields="searchMpsListBySalesPlan"
        :items="this.mpsListBySalesPlan"
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
import {openMrp, searchMpsListBySalesPlan} from '@/components/logistic/production/fields'
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
      mpsUpdateModal: false,
      selectedMps: [{}],
      searchMpsListBySalesPlan,
      openMrp,
      mrpRegisterDate: null,
      rangeDate: null,
      startDate: null,
      endDate: null,
    }
  },
  computed: {
    ...mapState('logi/mrp', ['mpsListBySalesPlan', 'mrpList']),
  },
  methods: {
    ...mapActions('logi/mrp', ['SEARCH_MPS_LIST_BY_SALESPLAN', 'SEARCH_MRP_LIST', 'REGISTER_MRP', 'UPDATE_MPS']),
    extractDate() {
      this.startDate = this.rangeDate.split('to')[0].trim()
      this.endDate = this.rangeDate.split('to')[1].trim()
    },
    handleInput(payload) {
      this.selectedMps = payload

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
        this.SEARCH_MPS_LIST_BY_SALESPLAN(payload)
        this.alert('조회 성공')
      }
    },
    updateModal(){
      if (this.selectedMps === null) {
        throw new Error('수정할 MPS 선택해애애애')
      }
      this.mpsUpdateModal = true
    },
    updateMps(){
      this.UPDATE_MPS(this.selectedMps)
    },
    closeModal() {
      this.isVisible = false
    },
    closeUpdateModal(){
      this.mpsUpdateModal = false
    },
    simulateMRP() {
      if (this.selectedMps === null) {
        throw new Error('모의전개 할 MPS 선택하셈.')
      }
      if (this.selectedMps[0].mrpApplyStatus === 'Y') {
        throw new Error('MRP적용 완료된 상태임')
      }
      this.isVisible = true
      this.SEARCH_MRP_LIST(this.selectedMps)
    },

    async MrpInsert(e) {
      if (this.mrpRegisterDate === null) {
        e.preventDefault()
        throw new Error('MRP 등록 일자 선택하셈.')
      } else {
        const payload = { mrpRegisterDate: this.mrpRegisterDate, batchList: this.mrpList }
        await this.REGISTER_MRP(payload)
        this.mrpRegisterDate = null
        this.alert('등록성공')

        const datePayload = { startDate: this.startDate, endDate: this.endDate }
        this.SEARCH_MPS_LIST_BY_SALESPLAN(datePayload)
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

.label-font{
  font-size : 20px;
}

</style>
