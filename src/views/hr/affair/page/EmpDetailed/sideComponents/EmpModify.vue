<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
            ref="previewEl"
            :src="require(`@/assets/images/avatars/${userData.empCode}.png`)"
            :text="userData.empName"
            size="90px"
            rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.empName }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
            variant="primary"
            @click="abc"
        >
          <input
              ref="refInputEl"
              type="file"
              class="d-none"
              @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
              icon="EditIcon"
              class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
            variant="outline-danger"
            class="ml-1"
            @click="deleteConfirmButton"
        >
          Delete
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: Username -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="직원 아이디"
              label-for="username"
          >
            <b-form-input
                id="username"
                v-model="userData.userId"
            />
          </b-form-group>

        </b-col>
        <!-- Field: UserPw -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="직원 비밀번호"
              label-for="username"
          >
            <b-form-input
                id="userPw"
                v-model="userPw"
            />
          </b-form-group>
        </b-col>

        <div>&nbsp;</div>

        <!-- Field: 이름 -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="이름"
              label-for="full-name"
          >
            <b-form-input
                id="full-name"
                v-model="userData.empName"
                placeholder="ex]피콜로"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="이메일"
              label-for="email"
          >
            <b-form-input
                id="email"
                v-model="userData.email"
                type="email"
                placeholder="ex] abc@def.com"
            />
          </b-form-group>
        </b-col>

        <div>&nbsp;</div>

        <!-- Field: Status -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="재직 상태"
              label-for="user-status"
          >
            <v-select
                v-model="userData.status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-status"
            />
          </b-form-group>
        </b-col>

        <!-- Field: 직급 -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="직급"
              label-for="user-role"
          >
            <v-select
                v-model="positionCode"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="positionOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-role"
                placeholder="직급 선택"
            />
          </b-form-group>
        </b-col>

        <!-- Field: 부서명 -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="부서명"
              label-for="company"
          >
            <v-select
                v-model="detailCode"
                :options="departments"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-role"
                placeholder="부서 선택"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
    <p>{{'  '}}</p>

    <!--!!!!!!!!!!! USER DETAIL INFORMATION !!!!!!!!!!-->
    <div>
      <!-- Header: Personal Info -->
      <div class="d-flex">
        <feather-icon
            icon="UserIcon"
            size="19"
        />
        <h4 class="mb-0 ml-50">
          개인 정보
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-form class="mt-1">
        <b-row>

          <!-- Field: Birth Date -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="생년월일"
                label-for="birth-date"
            >
              <flat-pickr
                  v-model="userData.birthDate"
                  class="form-control"
                  :config="{ dateFormat: 'Y-m-d'}"
                  placeholder="YYYY-MM-DD"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Mobile -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="휴대폰 번호"
                label-for="mobile"
            >
              <b-form-input
                  id="mobile"
                  v-model="userData.phoneNumber"
                  placeholder="ex] 010-2482-5882"
              />
            </b-form-group>
          </b-col>


          <!-- Field: 근무지 -->
          <b-col
              cols="12"
              md="6"
          >
            <b-form-group
                label="근무지"
                label-for="company"
            >
              <v-select
                  v-model="userData.workplaceCode"
                  :options="workPlace"
                  :reduce="val => val.value"
                  :clearable="false"
                  input-id="user-role"
                  placeholder="근무지 선택"
              />
            </b-form-group>
          </b-col>

          <!-- Field: 최종학력 -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="최종학력"
                label-for="language"
            >
              <v-select
                  v-model="userData.levelOfEducation"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="levelOfEducation"
                  :clearable="false"
                  input-id="language"
              />
            </b-form-group>
          </b-col>

          <!-- Field: 성별 -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="성별"
                label-for="gender"
                label-class="mb-1"
            >
              <b-form-radio-group
                  id="gender"
                  v-model="userData.gender"
                  :options="genderOptions"
                  value="male"
              />
            </b-form-group>
          </b-col>
          <!-- Field: 수신 가능 연락처 -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="수신 가능 연락처"
                label-for="contact-options"
                label-class="mb-1"
            >
              <b-form-checkbox-group
                  id="contact-options"
                  v-model="userData.contactOptions"
                  :options="contactOptionsOptions"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Header: Personal Info -->
        <div class="d-flex mt-2">
          <feather-icon
              icon="MapPinIcon"
              size="19"
          />
          <h4 class="mb-0 ml-50">
            상세주소
          </h4>
        </div>

        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">

          <!-- Field: 기본 주소-->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="기본 주소"
                label-for="address-line-1"
            >
              <b-form-input
                  id="address-line-1"
                  v-model="userData.basicAddress"
              />
            </b-form-group>
          </b-col>

          <!-- Field: 상세 주소 -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="상세 주소"
                label-for="address-line-2"
            >
              <b-form-input
                  id="address-line-2"
                  v-model="userData.detailAddress"
                  placeholder="상세주소를 입력해주세요"
              />
            </b-form-group>
          </b-col>

          <!-- Field: 우편번호 -->
          <b-col
              cols="12"
              md="6"
              lg="4"
          >
            <b-form-group
                label="우편번호"
                label-for="postcode"
            >
              <b-form-input
                  id="postcode"
                  v-model="userData.zipCode"
                  type="number"
                  placeholder="우편번호를 입력해 주세요"
              />
            </b-form-group>
          </b-col>


        </b-row>
      </b-form>
    </div>

    <!-- PERMISSION TABLE -->
    <b-card
        no-body
        class="border mt-1"
    >
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon
              icon="LockIcon"
              size="18"
          />
          <span class="align-middle ml-50">권한 설정</span>
        </b-card-title>
      </b-card-header>
      <b-table
          striped
          responsive
          class="mb-0"
          :items="permissionsData"
      >
        <template #cell(auth)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox
              :checked="data.value"
              @change="changePermission(data)"
          />
        </template>
      </b-table>
    </b-card>


    <!-- Action Buttons -->
    <b-button
        variant="primary"
        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        @click="saveChangeConfirmButton"
    >
      Save Changes
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormCheckboxGroup, BFormInput, BForm, BTable, BCard, BCardHeader, BCardTitle, BFormCheckbox, BFormRadioGroup,
} from 'bootstrap-vue'
import flatPickr from "vue-flatpickr-component";
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import sweetfire from '@/api/sweetFire'
/*import useUsersList from '../users-list/useUsersList'*/

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
    flatPickr,
    BFormRadioGroup,
    BFormCheckboxGroup,
  },

  props: {
    userData: {
      type: Object,
    },

  },

  mounted() {
    this.positionCode = this.userData.position;
    this.detailCode = this.userData.detailCodeName;
    this.workPlaceCode = this.userData.workplaceCode;

    this.permissionCode = this.userData.authorityCodeNumber;
    let permissionName;

    switch(this.permissionCode){
      case 'MA0001' : permissionName = '관리자 및 전체권한'; break
      case 'HR0001' : permissionName = '인사 권한'; break
      case 'AC0001' : permissionName = '회계 권한'; break
      case 'LOGI0001' : permissionName = '물류 권한'; break
      default : permissionName = undefined;
    }

    if(this.positionCode!==null){
      const position = this.positionOptions.filter(e=>this.userData.position === e.label);
      this.positionCode = position[0].value
    }

    if(this.detailCode!==null){
      const detail = this.departments.filter(e=>this.userData.detailCodeName === e.label);
      this.detailCode = detail[0].value
    }

    if(this.workPlaceCode!==null) {
      const workPlace = this.workPlace.filter(e => this.userData.workplaceCode === e.value);
      this.workPlaceCode = workPlace[0].label
    }

    if(this.permissionCode!==null){
      const find = this.permissionsData.findIndex(e => permissionName === e.auth);
      this.permissionsData[find].master = true;
    }

  },

  methods: {

    abc(){

      const find = this.permissionsData.findIndex(e => e.master === true);
      const authName = this.permissionsData[find].auth;

      let permissionCode;

      switch(authName){
        case '관리자 및 전체권한' : permissionCode = 'MA0001'; break
        case '인사 권한' : permissionCode = 'HR0001'; break
        case '회계 권한' : permissionCode = 'AC0001'; break
        case '물류 권한' : permissionCode = 'LOGI0001'; break
        default : permissionCode = undefined;
      }

      const empBasic = {
        empCode : this.userData.empCode,
        empName : this.userData.empName,
        gender : this.userData.gender,
        deptCode : this.detailCode,
        birthDate : this.userData.birthDate,
      }

      const empDetail = {
        deptCode : this.detailCode,
        positionCode : this.positionCode,
        userId : this.userData.userId,
        phoneNumber : this.userData.phoneNumber,
        email : this.userData.email,
        zipCode : this.userData.zipCode,
        basicAddress : this.userData.basicAddress,
        detailAddress : this.userData.detailAddress,
        levelOfEducation : this.userData.levelOfEducation,
        workplaceCode : this.userData.workplaceCode,
        AuthorityCodeNumber : permissionCode,
      }

      this.userPw !==undefined ? empDetail.userPw = this.userPw : null;

      console.log("empBasic");
      console.log(empBasic);
      console.log("empDetail");
      console.log(empDetail);

    },

    changePermission(e){
      let auth = e.item.auth;
      let boolean = event.target.checked;
      let find = this.permissionsData.findIndex(e => e.auth === auth );

      if(find===0 && boolean!==true){
        this.permissionsData.map(e=> e.master=false);
        return;
      }

      this.permissionsData.map(e=>e.master=true)

      if(find>0){
        this.permissionsData.map(e=>e.master=false)
        this.permissionsData[find].master = true;
      }
    },

    deleteConfirmButton(){
      const text = {
        mainTitle : '정말 삭제하시겠습니까?',
        mainText : '삭제요청이 완료되면 더 이상 복구가 안됩니다.',
        okTitle : '삭제완료',
        okText : '해당 사원의 정보가 삭제되었습니다.',
        cancelTitle : '취소됨',
        cancelText : '사원정보가 안전하게 보관되었습니다.',
        okRoute : '/hr/emp-page',
      }
      sweetfire(text);
    },

    saveChangeConfirmButton(){
      sweetfire(
          {
            mainTitle : '정말 수정하시겠습니까?',
            mainText : '수정 요청이 완료되면 복구불가능합니다.',
            okTitle : '수정완료',
            okText : '해당 사원의 정보가 안전하게 수정되었습니다.',
            cancelTitle : '취소됨',
            cancelText : '정보수정이 취소되었습니다.',
            okRoute : '/hr/emp-page'
          })
          },
    },

  setup(props) {

    let positionCode;
    let detailCode;
    let userPw;
    let workPlaceCode;
    let permissionCode;

    const positionOptions = [
      { label: '사장', value: 'POS-01' },
      { label: '이사', value: 'POS-02' },
      { label: '부장', value: 'POS-03' },
      { label: '차장', value: 'POS-04' },
      { label: '과장', value: 'POS-05' },
      { label: '대리', value: 'POS-06' },
      { label: '사원', value: 'POS-07' },
      { label: '인턴', value: 'POS-08' },
      { label: '계약직', value: 'POS-09' },
    ]

    const statusOptions = [
      { label: 'Normal', value: 'normal' },
      { label: 'AbNormal', value: 'abNormal' },
    ]

    // EMP_BASIC . DEPT_CODE 에 들어가야되는 값
    const departments = [
      { label: '총무부', value: 'DPT-01' },
      { label: '영업부', value: 'DPT-02' },
      { label: '생산부', value: 'DPT-03' },
      { label: '구매부', value: 'DPT-04' },
      { label: '인사부', value: 'DPT-05' },
      { label: '홍보부', value: 'DPT-06' },
    ]

    const workPlace = [
      { label: '(주)대원전자본사', value: 'BRC-01' },
      { label: '(주)대원전자울산지점', value: 'BRC-02' },
      { label: '(주)대원아이티', value: 'BRC-03' },
    ]

    const permissionsData = [
      {
        auth : '관리자 및 전체권한',
        master: false,
      },
      {
        auth : '인사 권한',
        master: false,
      },
      {
        auth : '물류 권한',
        master: false,
      },
      {
        auth : '회계 권한',
        master: false,
      },
    ]

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })

    /** User Detail Information State **/
    const levelOfEducation = [
      '산후조리원졸',
      '어린이집졸',
      '유졸',
      '초졸',
      '중졸',
      '고졸',
      '학사',
      '석사',
      '박사',
    ]

    const genderOptions = [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ]

    const contactOptionsOptions = ['Email', 'Message', 'Phone']


    return {
      positionOptions,
      statusOptions,
      permissionsData,
      levelOfEducation,
      genderOptions,
      contactOptionsOptions,
      departments,
      positionCode,
      detailCode,
      userPw,
      workPlace,
      workPlaceCode,
      permissionCode,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
