import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    accountCodeList: [],
    accoundCodeList: [],
    accountCustomerList: [],
    accountControllCodeList: [],
    accountLederList: [],
    generalAccountLedgerList: [],
    customerList: [],
    customerCode:'',
  },
  getters: {
    /**
     *  기존 배열에서  차변 대변 누계를 포함한 객체를 만들어 추가하는 겟터!
     *  slice = 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
     *   slice(-2) 뒤에서 부터 2개를 뽑아온다.
     * @param state
     */
    GET_ACCOUNT_LEDER_LIST(state) {
      if (state.accountLederList?.length > 0) {
        const lastAccount = state.accountLederList.slice(-2)
        const object = {
          reportingDate: '누계',
          leftDebtorPrice: lastAccount[0].totalPrice,
          rightCreditsPrice: lastAccount[1].totalPrice,
        }
        return [...state.accountLederList, object]
      }
      return state.accountLederList
    },
    /**
     *  필터를 이용하여 제일 상단 애들을 뽑은 후 select를 이용하기위해 각각의 객체에 text라는 속성을 부여했다!!!.
     *  shift를 통해 계정이라는 선택항목을 없애고
     * unshift를 통해 안내문구가 나오도록 표시
     * @param state
     * @returns {(*&{text: *})[]}
     * @constructor
     */
    GET_ACCOUNT_LEDER_TREE_LIST(state) {
      const rootList = state.accountCodeList.filter(value => value.leaf === '0').map(v => ({ value: v, text: v.accountName }))
      rootList.shift()
      rootList.unshift({ value: null, text: '계정과목을 선택해주세요' })
      return rootList
    },

  },

  mutations,

  actions,

}
