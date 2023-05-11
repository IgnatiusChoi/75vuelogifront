<template>
  <div>
    <h1>부서 정보</h1>
      <b-button
          variant="primary"
          size="md"
          class="mb-md-1"
          @click="addNewDept"
      >
          수정
      </b-button>

      &nbsp

      <b-button
          variant="primary"
          size="md"
          class="mb-md-1"
      >
          추가
      </b-button>
    <b-table
        style="max-height: 300px; overflow: auto; width: 100%;"
        responsive
        :items="DeptInfo"
        :fields="fields"
        class="mb-0 scrollStyle"
    />
<!--      <CommonModal
          v-if="modal"
          @close="closeModal"
        >
          <template v-slot:header>
              <b-col>수정해주십시오</b-col>
          </template>
          <template v-slot:body>
              <div style="width: 110px; ">
                  <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 사업장코드 : &nbsp</label>
              </div>
              <b-col>
                  <b-form-select
                          v-model="contractTypeName"
                          :options="contractTypeNameOption"
                          style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                          :state="contractTypeNameStatus"
                  />
                  <b-form-invalid-feedback
                          tooltip
                          class="mb-3"
                          style="margin-left:-5px"
                  >
                      값이 비었습니다. 값을 선택해 주십시오.
                  </b-form-invalid-feedback>
              </b-col>
              <b-col
                      cols="12"
                      md="10"
                      class="d-flex justify-content-start mb-3"
              >
                  <div style="width: 110px; ">
                      <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 부서코드 : &nbsp</label>
                  </div>
                  <b-col>
                      <b-form-select
                              v-model="contractTypeName"
                              :options="contractTypeNameOption"
                              style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                              :state="contractTypeNameStatus"
                      />
                      <b-form-invalid-feedback
                              tooltip
                              class="mb-3"
                              style="margin-left:-5px"
                      >
                          값이 비었습니다. 값을 선택해 주십시오.
                      </b-form-invalid-feedback>
                  </b-col>
              <b-col
                      cols="12"
                      md="10"
                      class="d-flex justify-content-start mb-3"
              >
                  <div style="width: 110px; ">
                      <label style="font-size: 15px;float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 부서명 : &nbsp</label>
                  </div>

                  <b-col>

                      <b-form-input
                              v-model="contractRequester"
                              :state="contractRequesterStatus"
                              placeholder="부서명"
                              style="width: 200px; margin: 0 0 5px -14px"
                      />
                      <b-form-invalid-feedback
                              tooltip
                              class="mb-3"
                              style="margin-left:-5px"
                      >
                          값이 비었습니다. 값을 입력해 주십시오.
                      </b-form-invalid-feedback>
                  </b-col>

              </b-col>

              <b-col
                      cols="12"
                      md="10"
                      class="d-flex align-items-center justify-content-start mb-1 mb-md-1"
              >
                  <div style="width: 110px; ">

                      <label style="font-size: 15px; float:right">부서명 : &nbsp</label>
                  </div>
                  <b-form-input
                          v-model="estimateDate"
                          disabled
                          placeholder="부서명"
                          style="width: 200px;"
                  />
              </b-col>
                  <div style="width: 110px; ">
                      <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 회사코드 : &nbsp</label>
                  </div>
                  <b-col>
                      <b-form-select
                              v-model="contractTypeName"
                              :options="contractTypeNameOption"
                              style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                              :state="contractTypeNameStatus"
                      />
                      <b-form-invalid-feedback
                              tooltip
                              class="mb-3"
                              style="margin-left:-5px"
                      >
                          값이 비었습니다. 값을 선택해 주십시오.
                      </b-form-invalid-feedback>
                  </b-col>
                  <div style="width: 110px; ">
                      <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 부서신설일 : &nbsp</label>
                  </div>
                  <b-col>
                      <b-form-select
                          v-model="contractTypeName"
                          :options="contractTypeNameOption"
                          style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                          :state="contractTypeNameStatus"
                      />
                      <b-form-invalid-feedback
                          tooltip
                          class="mb-3"
                          style="margin-left:-5px"
                      >
                          값이 비었습니다. 값을 선택해 주십시오.
                      </b-form-invalid-feedback>
                  </b-col>
                  <div style="width: 110px; ">
                      <label style="font-size: 15px; float:right; margin-top:8px"><span style="color:hotpink">*</span>&nbsp 부서해체일 : &nbsp</label>
                  </div>
                  <b-col>
                      <b-form-select
                          v-model="contractTypeName"
                          :options="contractTypeNameOption"
                          style="width: 200px; font-size: 15px; font-family: 'Yu Gothic'; margin-left:-14px"
                          :state="contractTypeNameStatus"
                      />
                      <b-form-invalid-feedback
                          tooltip
                          class="mb-3"
                          style="margin-left:-5px"
                      >
                          값이 비었습니다. 값을 선택해 주십시오.
                      </b-form-invalid-feedback>
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
                      @click="editEstimate('get')"
              >
                  입력
              </b-button>
          </template>
      </CommonModal>-->
  </div>
</template>

<script>
import {BButton, BCol, BFormInput, BFormInvalidFeedback, BFormSelect, BTable} from 'bootstrap-vue'
import {mapActions, mapState} from 'vuex'
import CommonModal from "@/components/common/modal/CommonModal"

export default {
  components: {
      BFormSelect, BFormInput, BCol, BFormInvalidFeedback,
      CommonModal,
      BButton,
    BTable,
  },
  computed: {

    ...mapState('logi/base', ['deptList','DeptInfo']),

  },

  created() {
    this.FETCH_ALL_DepartmentCode()
  },

  methods: {
    // 액션을 가져옴
    ...mapActions('logi/base', ['FETCH_ALL_DepartmentCode']),
    // 검색
      closeModal(){
        this.modal = false
      },
  },

  data() {
    return {
      modal: false,
      fields: [
        {
          key: 'workplaceCode',
          label: '사업장코드',
        },
        {
          key: 'deptCode',
          label: '부서코드',
        },
        {
          key: 'deptName',
          label: '부서명',
        },
        {
          key: 'deptName',
          label: '사업장명',
        },
        {
          key: 'companyCode',
          label: '회사코드',
        },
        {
          key: 'deptStartDate',
          label: '부서신설일',
        },
        {
          key: 'deptEndDate',
          label: '부서해체일',
        },
      ],
    }
  },
}

</script>
