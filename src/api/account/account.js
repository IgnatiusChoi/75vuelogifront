/* eslint-disable import/prefer-default-export */

import { accountApi } from '@/api'

// Api
const SLIP_URL = '/account/slips'
const JOURNAL_URL = '/account/journal'

/**
 * 전표 ㅇㅇㅇㅇㅇ
 */
/**
 * 전체조회
 * @returns {*}
 */
function selectSlips() {
  return accountApi.get(`${SLIP_URL}`)
}

/**
 * 한개조회
 * @param slipNo
 * @returns {*}
 */
function selectSlip(slipNo) {
  return accountApi.get(`${SLIP_URL}/${slipNo}`)
}

/**
 *
 *  삭제
 *  data속성을 추가안해주면 404오류뜬다!!! 주의
 *    map 구조로 날라간다. slipList : [{},{}]
 * @param slipList
 * @returns {*}
 */
function deleteSlip(slipList) {
  return accountApi.delete(`${SLIP_URL}`, {
    data: {
      slipList,
    },
  })
}

/**
 * 전표추가
 * @param slip
 * @returns {*}
 */
function registerSlip(slip) {
  return accountApi.post(`${SLIP_URL}`, slip)
}

/**
 * 전표수정
 * @param slip
 * @returns {*}
 */
function editSlip(slip) {
  return accountApi.put(`${SLIP_URL}`, slip)
}

/**
 * 전표승인
 * @param slip
 * @returns {*}
 */
function approvalSlip(slip) {
  return accountApi.put(`${SLIP_URL}/${slip.slipNo}`, slip)
}

/**
 * 분개장검색
 * @param date 1
 */
function selectJournals({ startDate, endDate }) {
  return accountApi.get(`${JOURNAL_URL}`, {
    params: {
      startDate,
      endDate,
    },
  })
}

export {
  selectSlips, selectSlip, deleteSlip, registerSlip, editSlip, approvalSlip,
  selectJournals,
}
