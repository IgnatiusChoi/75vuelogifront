<template>
  <div>

    <h1>전표</h1>
    <b-button
      variant="relief-primary"
      class="bt"
      @click="saveEditedForm"
    >
      저장
    </b-button>
    <b-button
      variant="relief-primary"
      class="bt"
      @click="editJouranDetail"
    >
      분개상세수정
    </b-button>
    <b-button
      variant="relief-primary"
      class="bt"
      @click="editJouranl"
    >
      분개수정
    </b-button>
    <b-button
      variant="relief-primary"
      class="bt"
      @click="editSlip"
    >
      전표수정
    </b-button>
    <b-table
      :items="GET_SELETED_SLIP"
      :fields="slipFiled"
    />
    <h1>분개 </h1>

    <b-table
      :items="GET_SELETED_JOURNALlIST"
      :fields="journalFiled"
      striped
      responsive
      select-mode="single"
      selectable
      @row-selected="onRowSelected"
    >

      <template #cell(status)="data">
        <b-badge :variant="status[1][data.value]">
          {{ status[0][data.value] }}
        </b-badge>
      </template>
    </b-table>
    <h1>분개상세</h1>
    <b-table
      :items="journalDetailList"
      :fields="JournaldetailFiled"
    />

    <!-- 모달은 id 이용-->
    <!-- 전표추가 모달-->
    <!--하나의 inputForm 태그 사용 < 조건을 props로 내려줌>-->
    <b-modal
      id="openEditSlipModal"
      title="전표수정"
    >
      <p class="my-5">
        <InputForm
          ref="inputSlipForm"
          :edit-slip="GET_SELETED_SLIP"
          modal-status="editSlip"
        />
      </p>
    </b-modal>
    <!-- 분개추가 모달 -->
    <b-modal
      id="openEditJounalModal"
      title="분개수정"
    >
      <p class="my-5">
        <InputForm
          ref="inputJounalForm"
          :edit-journal="editableJournal"
          modal-status="editJournal"
        />
      </p>
    </b-modal>
    <!--분개상세 모달 -->
    <b-modal
      id="openEditJounalDetailModal"
      title="분개상세수정"
    >
      <p class="my-5">
        <InputForm
          ref="inputJounalDetailForm"
          modal-status="addJounalDetail"
        />
      </p>
    </b-modal>
  </div>
</template>

<script>
import {BBadge, BButton, BTable,} from 'bootstrap-vue'
import {mapActions, mapGetters} from 'vuex'
import Vue from 'vue'
import {JournaldetailFiled, journalFiled, slipFiled} from '../fields'
import InputForm from '../Slip/InputForm.vue'

export default {
  components: {
    BButton,
    BTable,
    BBadge,
    InputForm,

  },

  data() {
    return {
      /*  필드
       */
      slipFiled,
      journalFiled,
      JournaldetailFiled,
      seletedSlip: [],
      journalDetailList: [],

      // 수정분개
      editableJournal: {},

    }
  },
  computed: {
    ...mapGetters('account/account', ['GET_SELETED_SLIP', 'GET_SELETED_JOURNALlIST']),
  },
  getters: {},
  methods: {

    ...mapActions('account/account', ['EDIT_SLIP']),
    /**
     *  분개선택시 해당분개상세 볼수있는 기능
     */
    onRowSelected(selectedJournal) {
      // eslint-disable-next-line prefer-destructuring
      this.editableJournal = selectedJournal[0]
      if (selectedJournal[0].journalDetailList.length === 0) {
        Vue.$toast.info('해당분개의 분개상세는 존재하지않습니다')
      }
      this.journalDetailList = selectedJournal[0].journalDetailList
    },
    /**
     *전표수정 버튼 클릭시 함수실행
     */
    editSlip() {
      this.$root.$emit('bv::show::modal', 'openEditSlipModal')
    },
    /**
     * 분개수정
     */
    editJouranl() {
      console.log(this.editableJournal)
      this.$root.$emit('bv::show::modal', 'openEditJounalModal')
    },
    /**
     * 분개상세수정
     */
    editJouranDetail() {
      if (this.editableJournal.journalDetailList.length !== 0) {
        this.$root.$emit('bv::show::modal', 'openEditJounalDetailModal', '#focusThisOnClose')
      } else {
        Vue.$toast.info('해당분개의 분개상세는 존재하지않습니다')
      }
    },
    /**
     * 수정 후 저장
     */
    async saveEditedForm() {
      const editedSlip = this.GET_SELETED_SLIP[0]
      const updateSlipNo = await this.EDIT_SLIP(editedSlip)
      alert(`${updateSlipNo} 전표의 모든 사항이 업데이트되었습니다`)
    },
  },

}
</script>
<style scoped>
h1 {
  font-size: 45px;
  font-weight: 600;
  color: #456155;
  padding: 30px 5px 15px;
}

.bt {
  float: right;
}
</style>
