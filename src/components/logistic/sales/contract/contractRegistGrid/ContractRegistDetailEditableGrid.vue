<template>

  <!-- Table Container Card -->
  <b-card
    id="scrollStyle"
    no-body
    style="font-family: '배달의민족 도현'; overflow-x: scroll; max-height: 500px"
  >

    <div class="m-2">

      <b-row>
        <!-- Table Top -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <slot name="header" />

        </b-col>
      </b-row>

      <b-row /></div>

    <b-table
      hover
      :items="detailGrid"
      :fields="detailTableColumns"
      style="width: 1700px; overflow-y: scroll;"
      show-empty
      empty-text="No matching records found"
      selectable
      select-mode="single"
      @row-selected="onRowSelected"
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
            class="d-flex justify-content-start mb-3"
          >
            <div style="width: 110px; ">
              <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 납기일 : &nbsp</label>
            </div>
            <b-col>
              <b-input-group
                style="width: 200px;"
              >
                <b-form-input
                  v-model="selectedDueDateOfEstimate"
                  type="text"
                  placeholder="납기일"
                  autocomplete="off"
                  show-decade-nav
                  style="width: 140px"
                  :state="selectedDueDateOfEstimateStatus"
                />
                <B-form-valid-feedback
                  tooltip
                  class="mb-3"
                  style="margin-left:-5px"
                >
                  {{ dueDateOfEstimateCheckMsg }}
                </B-form-valid-feedback>
                <b-form-invalid-feedback
                  tooltip
                  class="mb-3"
                  style="margin-left:-5px"
                >
                  {{ dueDateOfEstimateCheckMsg }}
                </b-form-invalid-feedback>
                <b-input-group-append style="height: 37px;">
                  <b-form-datepicker
                    v-model="selectedDueDateOfEstimate"
                    show-decade-nav
                    button-only
                    button-variant="outline-primary"
                    right
                    size="sm"
                    locale="en-US"
                    aria-controls="example-input"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
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
            @click="editdueDateOfEstimate"
          >
            입력
          </b-button>
        </template>
      </CommonModal>
    </transition>

  </b-card>

</template>
<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip, BInputGroupAppend,
  BTableLite, BFormValidFeedback, BFormInvalidFeedback, BFormDatepicker, BInputGroup,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import CommonModal from '@/components/common/modal/CommonModal'

export default {
  components: {
    BCardCode,
    BTableLite,
    vSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormInvalidFeedback,
    BFormValidFeedback,
    BFormDatepicker,
    BInputGroupAppend,
    BInputGroup,

    CommonModal,
  },
  computed: {
    // ...mapActions('logi/sales', ['searchContract']), 메소드에 선언해야함
    ...mapState({
      detailGrid: state => state.logi.sales.detailGrid,
      detailTableColumns: state => state.logi.sales.detailTableColumns,
    }),
  },
  watch: {
    selectedDueDateOfEstimate() {
      console.log(this.selectedDueDateOfEstimate)
      console.log(this.selectedOriginDueDateOfEstimate)
      console.log(this.selectedDueDateOfEstimate === this.selectedOriginDueDateOfEstimate)
      if (this.selectedDueDateOfEstimate.length > 10) {
        this.selectedDueDateOfEstimateStatus = false
        this.dueDateOfEstimateCheckMsg = '날짜 범위를 넘어섰습니다. 제대로 기제해 주십시오.'
        return
      }
      if (this.selectedDueDateOfEstimate.length < 11 && this.selectedDueDateOfEstimate.length > 9) {
        if (this.selectedDueDateOfEstimate === this.selectedOriginDueDateOfEstimate) {
          this.selectedDueDateOfEstimateStatus = null
        } else if (this.selectedDueDateOfEstimate < this.selectedOriginDueDateOfEstimate) {
          this.selectedDueDateOfEstimateStatus = false
          this.dueDateOfEstimateCheckMsg = '만기일보다 작을 수 없습니다.'
        } else {
          const isValid = this.isValidDate(this.selectedDueDateOfEstimate)

          if (isValid) {
            this.selectedDueDateOfEstimateStatus = true
            this.dueDateOfEstimateCheckMsg = '값이 올바릅니다.'
          } else {
            this.selectedDueDateOfEstimateStatus = false
            this.dueDateOfEstimateCheckMsg = '날짜가 유효하지 않습니다. 제대로 기제해 주십시오.'
          }
        }
      } else {
        this.selectedDueDateOfEstimateStatus = null
      }
    },
  },
  methods: {
    onRowSelected(items) {
      console.log(items[0])
      this.selected = items[0]
      this.selectedDueDateOfEstimate = items[0].dueDateOfEstimate
      this.selectedOriginDueDateOfEstimate = items[0].dueDateOfEstimate
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    editdueDateOfEstimate() {
      console.log(this.selectedDueDateOfEstimate.length)
      if (this.selectedDueDateOfEstimate === this.selectedOriginDueDateOfEstimate) {
        this.selectedDueDateOfEstimateStatus = false
        this.dueDateOfEstimateCheckMsg = '값 변경이 없습니다. 다시 확인해 주십시오.'
        return
      } if (this.selectedDueDateOfEstimate.length < 10 || this.selectedDueDateOfEstimate.length > 10) {
        this.selectedDueDateOfEstimateStatus = false
        this.dueDateOfEstimateCheckMsg = '값 형식이 잘못되었습니다. 다시 확인해 주십시오.'
        return
      }
      this.selected.dueDateOfEstimate = this.selectedDueDateOfEstimate
      this.selected.status = 'update'

      this.modal = false
    },
    isValidDate(value) {
      let result = true
      try {
        const date = value.split('-')
        const y = parseInt(date[0], 10)
        const m = parseInt(date[1], 10)
        const d = parseInt(date[2], 10)

        const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/
        result = dateRegex.test(`${d}-${m}-${y}`)
      } catch (err) {
        result = false
      }
      return result
    },
  },
  data() {
    return {
      contractDetailRow: [],
      selected: [],
      modal: false,
      selectedDueDateOfEstimate: '',
      selectedOriginDueDateOfEstimate: '',
      selectedDueDateOfEstimateStatus: null,
      dueDateOfEstimateCheckMsg: '값 변경이 없습니다. 다시 확인해 주십시오',
    }
  },
}
</script>

    <style
      lang="scss"
      scoped
    >
      .per-page-selector {
      width: 90px;
      }

      .invoice-filter-select {
      min-width: 190px;

      ::v-deep .vs__selected-options {
      flex-wrap: nowrap;
      }

      ::v-deep .vs__selected {
      width: 100px;
      }
      }
    </style>

    <style lang="scss">
      @import 'src/@core/scss/vue/libs/vue-select';

      #scrollStyle::-webkit-scrollbar-track
      {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: rgba(50,60,150,1);
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px rgba(50,50,150,1);
      }

      #scrollStyle::-webkit-scrollbar
      {
      width: 10px;
      background-color: rgba(50,50,150,0);
      }

      #scrollStyle::-webkit-scrollbar-thumb
      {
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 10px;
      /*    background-image: -webkit-gradient(linear,
      left bottom,
      left top,
      color-stop(0.44, rgb(122,153,217)),
      color-stop(0.72, rgb(73,125,189)),
      color-stop(0.86, rgb(28,58,148)));*/
      background-color: #7367f0;
      }

      .fade-enter{
          opacity:0.5
      }
      .fade-enter-active,
      .fade-leave-active{
          transition:opacity 0.3s ease-out;
      }
      .fade-leave-to{
          opacity: 0;
      }
    </style>
