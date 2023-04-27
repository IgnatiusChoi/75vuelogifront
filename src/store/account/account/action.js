import {
  deleteSlip, registerSlip, selectSlip, selectSlips, editSlip, approvalSlip, selectJournals,
} from '@/api/account/account'

export default {
  /**
   * 전표전체조회
   * @param commit
   * @returns {Promise<*>}
   * @constructor
   */
  async FETCH_ALL_SLIP({ commit }) { // 객체로 넘어오면 {}
    try {
      const response = await selectSlips()

      commit('SET_SILP_LIST', response.data.SlipList)
      // eslint-disable-next-line no-undef
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표한개조회
   * @param commit
   * @param slipNo
   * @returns {Promise<{slipNo: string, reportingEmpName: string, approvalDate: string, reportingEmpCode: string, slipStatus: string, accountPeriodNo: string, expenseReport: string, reportingDate: string, slipType: string, deptCode: string, status: string}|{}|*>}
   * @constructor
   */
  async FETCH_SLIP({ commit }, slipNo) { // 객체로 넘어오면 {}
    try {
      const { data } = await selectSlip(slipNo)
      commit('SET_SILP', data.slipForm)
      return data.slipForm
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표삭제
   * @param _
   * @param slipList
   * @returns {Promise<*>}
   * @constructor
   */
  async DELETE_SLIP(_, slipList) {
    try {
      return await deleteSlip(slipList)
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 전표등록
   * @param _
   * @param slip
   * @returns {Promise<*>}
   * @constructor
   */
  async CREATE_SLIP(_, slip) { // 객체로 넘어오면 {}
    try {
      const response = await registerSlip(slip)
      return response.data.newSlipNo
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표수정
   * @param _
   * @param slip
   * @returns {Promise<*>}
   * @constructor
   */
  async EDIT_SLIP(_, slip) { // 객체로 넘어오면 {}
    try {
      const response = await editSlip(slip)
      return response.data.updateSlipNo
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * restApi 사용하기위해 api를 여러번 호출한다.
   * 비동기로 처리하기위해 reduce함수와 Promise.resolve()를 사용하여 기존 pendding상태의 promise 반환값을 이행후 반환값으로 바꿈
   * 업데이트된 전표번호를 서버단에서 받고 리턴하여 화면에 업데이트된 번호를 볼수있다.
   * Promise.resolve 덕분에 빈 Promise객체로 초기화 가능
   */
  /**
   * 전표 승인 AND 전표 반려!!!
   * @param _
   * @param slipList
   * @returns {Promise<*[]>}
   * @constructor
   */
  async APPROVAL_SLIP(_, slipList) {
    try {
      const updateList = []
      await slipList.reduce((pre, slip) => pre.then(async () => {
        const response = await approvalSlip(slip)
        updateList.push(response.data.updateSlipNo)
      }), Promise.resolve())
      return updateList
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 분개장
   * @param commit
   * @param date
   * @returns {Promise<*>}
   * @constructor
   */
  async SEARCH_JOURNAL({ commit }, date = {}) {
    try {
      const response = await selectJournals(date)
      commit('SET_JOURNAL_LIST', response.data)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

}
