<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->

    <div>

      <b-alert
        v-if="isOkay"
        variant="danger"
        :show="userData === undefined"
      >
        <h4 class="alert-heading">
          직원관리 페이지를 불러오는데 실패했습니다.
        </h4>
        <div class="alert-body">
          직원등록을 하시거나,
          <b-link
            class="alert-link"
            :to="{ name: 'emp-page'}"
          >
            직원목록조회
          </b-link>
          에서 직원을 선택후 수정해주세요
          <button
            class="w-btn w-btn-gra1 w-btn-gra-anim"
            type="button"
            @click="ok"
          >
            닫기
          </button>
        </div>
      </b-alert>
    </div>

    <b-tabs
      v-if="true"
      pills
    >

      <!-- Tab: Account -->
<!--      <b-tab
        v-if="userData!==undefined"
        active
      >
        <button @click="abc">
          abc
        </button>-->
      <b-tab active v-if="userData!==undefined">
        <template #title>
          <feather-icon
            icon="UserCheckIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">직원수정</span>
        </template>
        <user-edit-tab-account
          :user-data="userData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab>
        <h1>직원등록 메뉴입니다.</h1>
        <template #title>
          <feather-icon
            icon="UserPlusIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">직원등록</span>
        </template>
        <!--        <user-edit-tab-information class="mt-2 pt-75" />-->
      </b-tab>

      <!-- Tab: Social -->
      <!--      <b-tab>
        <template #title>
          <feather-icon
              icon="Share2Icon"
              size="16"
              class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Social</span>
        </template>
        <user-edit-tab-social class="mt-2 pt-75" />
      </b-tab>-->
    </b-tabs>
  </component>
</template>

<script>
import {
  BAlert, BCard, BLink, BTab, BTabs,
} from 'bootstrap-vue'
/* import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router' */
/* import userStoreModule from '../userStoreModule' */
import { mapState } from 'vuex'
import UserEditTabAccount from './sideComponents/EmpModify'
/* import UserEditTabInformation from './UserEditTabInformation.vue'
import UserEditTabSocial from './UserEditTabSocial.vue' */


export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserEditTabAccount, /*
    UserEditTabInformation,
    UserEditTabSocial, */
  },
  data() {
    return {
      userData: undefined,
      isOkay: true,
    }
  },
  computed: {
    ...mapState({
      empBasicInfo: state => state.hr.emp.allEmpList.empList,
      empDetail: state => state.hr.emp.empDetail.empDetailInfo,
    }),
  },
  created() {
    const emp = this.empBasicInfo.filter(e => e.empCode === 'EMP-01')
    this.userData = { ...emp[0], ...this.empDetail[0] }
  },
  methods: {
    abc() {
      const emp = this.empBasicInfo.filter(e => e.empCode === 'EMP-01')
      this.userData = { ...emp[0], ...this.empDetail[0] }
      console.log('spread')
      console.log(this.userData)
    },
    ok() {
      this.isOkay = false
    },
  },

  /* setup() {
     const userData = ref(null)

     const USER_APP_STORE_MODULE_NAME = 'app-user'

     // Register module
     if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

     // UnRegister on leave
     onUnmounted(() => {
       if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
     })

     store.dispatch('app-user/fetchUser', { id: router.currentRoute.params.id })
         .then(response => { userData.value = response.data })
         .catch(error => {
           if (error.response.status === 404) {
             userData.value = undefined
           }
         })
     return {
       userData,
     }
   }, *//* setup() {
    const userData = ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUser', { id: router.currentRoute.params.id })
        .then(response => { userData.value = response.data })
        .catch(error => {
          if (error.response.status === 404) {
            userData.value = undefined
          }
        })

    return {
      userData,
    }
  }, */
}
</script>

<style lang="scss">
@import "/src/assets/scss/cutypretyButton.scss";
</style>
