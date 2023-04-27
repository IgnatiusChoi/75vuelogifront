<template>
  <div>
    <div>
      <MenuSlipForm
        style="justify-content: end"
        :active-button="activeButton"
        :add-bt-status="addBtStatus"
        :add-journal-bt="addJournalBt"
        @submitResult="submit"
      />

      <h1>전표</h1>
      <b-table
        :items="newSlipForm"
        :fields="slipFiled"
      />
      <h1>분개 </h1>
      <b-table
        :items="newJournalForm"
        :fields="journalFiled"
        striped
        responsive
        select-mode="single"
        selectable
        @row-selected="onRowSelected"
      />

      <h1>분개상세 </h1>
      <b-table
        :fields="JournaldetailFiled"
        :items="newJournalDetailForm"
        striped
        responsive
      />
      <div />
    </div>
    <div>
      <!-- 모달은 id 이용-->
      <!-- 전표추가 모달-->
      <!--하나의 inputForm 태그 사용 < 조건을 props로 내려줌>-->
      <b-modal
        id="openAddSlipModal"
        title="전표추가"
        @ok="completeSilpForm"
      >
        <p class="my-5">
          <InputForm
            ref="inputSlipForm"
            modal-status="addSlip"
          />
        </p>
      </b-modal>
      <!-- 분개추가 모달 -->
      <b-modal
        id="openAddJounalModal"
        title="분개추가"
        @ok="completeJounalForm"
      >
        <p class="my-5">
          <InputForm
            ref="inputJounalForm"
            modal-status="addJounal"
          />
        </p>
      </b-modal>
      <!--분개상세 모달 -->
      <b-modal
        id="openAddJounalDetailModal"
        title="분개상세추가"
        @ok="completeJounalDetailForm"
      >
        <p class="my-5">
          <InputForm
            ref="inputJounalDetailForm"
            modal-status="addJounalDetail"
          />
        </p>
      </b-modal>
    </div>

  </div>
</template>
<script>
import { BTable } from 'bootstrap-vue'
import { mapActions } from 'vuex'
import MenuSlipForm from './MenuSlipForm.vue'
import InputForm from './InputForm.vue'
import { slipFiled, journalFiled, JournaldetailFiled } from '../fields'

export default {
  components: {
    BTable,
    MenuSlipForm,
    InputForm,
  },

  data() {
    return {
      /**
       * 그리드 필드
       */
      slipFiled,
      journalFiled,
      JournaldetailFiled,
      /**
       * 그리드에 보여지는 객체
       */
      newSlipForm: [],
      newJournalForm: [],
      newJournalDetailForm: [],
      /**
       * 모든 결과를 담는 객체
       */
      resultSlipForm: {
        journalList: [],
      },

      /**
     * 선택한 분개 구분위해 사용
     */
      id: 1,
      currentId: '',

      /**
     *  버튼 활성화
     */
      activeButton: 'addSlip',
      addBtStatus: false,
      addJournalBt: false,
    }
  },

  methods: {
    ...mapActions('account/account', ['CREATE_SLIP', 'FETCH_SLIP']),
    /**
     * 모달 ok버튼 클릭시 실행되는 함수
     * 전표
     */
    completeSilpForm() {
      this.newSlipForm.push(this.$refs.inputSlipForm.slipForm)
      this.resultSlipForm = { ...this.$refs.inputSlipForm.slipForm, ...this.resultSlipForm }
      this.addBtStatus = true
    },
    /**
     *  분개 모달완료시 실행
     */
    completeJounalForm() {
      this.newJournalForm.push({ ...this.$refs.inputJounalForm.journalForm, id: this.id })
      this.resultSlipForm.journalList.push({ ...this.$refs.inputJounalForm.journalForm, id: this.id, journalDetailList: [] })
      this.id += 1

      // 분개는 2개까지
      if (this.newJournalForm.length > 1) {
        this.addJournalBt = true
      }
    },
    /**
     *  분개상세 모달완료시 실행
     */
    completeJounalDetailForm() {
      // 그리드전용 변수에 넣기
      this.newJournalDetailForm.push(this.$refs.inputJounalDetailForm.journalDetailForm)

      // api로 날라간 결과값에 넣기
      this.resultSlipForm.journalList.forEach(v => {
        if (v.id === this.currentId) {
          v.journalDetailList.push(this.$refs.inputJounalDetailForm.journalDetailForm)
        }

        return v
      })

      console.log(this.resultSlipForm)
    },

    /**
     *   분개테이블의 행 클릭시 실행되는함수(해당 분개의 상세를 만들기위한 목적)
     *    this.$root.$emit(모달오픈  , 모달 아이디)
     */
    onRowSelected(selectedJournal) {
      const { id } = selectedJournal[0]
      this.currentId = id
      if (window.confirm('해당 분개의 분개상세를 추가하시겠습니까?')) {
        this.$root.$emit('bv::show::modal', 'openAddJounalDetailModal', '#focusThisOnClose')
      }
    },
    /**
     * 저장
     */
    async submit() {
      /**
       * 차변 대변 입력값이 같지 않을경우 경고 및 재작성요구
       */
      const addLeftPrice = this.resultSlipForm.journalList.map(v => Number(v.leftDebtorPrice)).reduce((pre, curr) => pre + curr, 0)
      const addRightPrice = this.resultSlipForm.journalList.map(v => Number(v.rightCreditsPrice)).reduce((pre, curr) => pre + curr, 0)
      if (addLeftPrice !== addRightPrice) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('차대가 맞지 않습니다, 차변대변을 새로 입력해주세요')) {
          this.newJournalForm.splice(0)
          this.resultSlipForm.journalList.splice(0)
          return
        }
      }

      const newSlipNo = await this.CREATE_SLIP(this.resultSlipForm)
      console.log(newSlipNo)
      this.openAlert(newSlipNo)
    },

    /**
      * 성공시 호출되는 alert창
      * 새로 생긴 전표를 router를 이용하여 보냄
      */
    openAlert(newSlipNo) {
      this.$swal.fire({
        title: '전표작성 성공!',
        text: `전표번호${newSlipNo}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '해당 전표를 보시겠습니까?',
      }).then(result => {
        if (result.isConfirmed) {
          this.$router.push({ name: 'journalForm', params: { selectedSlip: newSlipNo } })
        }
      })
    },

  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}

</style>
