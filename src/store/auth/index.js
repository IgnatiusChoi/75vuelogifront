import { $themeConfig } from '@themeConfig'
import axios from 'axios'
import {hrApi, sys} from '@/api'

export default {
  namespaced: true,
  state: {
    companyInfo: '',
    workplaceInfo: '',
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
  },
  getters: {},
  mutations: {
    getCompanyCode(state, response) {
      const { companyCode, companyName } = response.data.gridRowJson[0]
      const companyInfo = [{ companyCode, companyName }]
      state.companyInfo = companyInfo
    },
    getWorkplaceCode(state, response) {
      const simpleWorkplaceInfo = []
      const workplaceInfo = response.data.gridRowJson
      workplaceInfo.map(res => simpleWorkplaceInfo.push({ workplaceCode: res.workplaceCode, workplaceName: res.workplaceName }))
      state.workplaceInfo = simpleWorkplaceInfo
    },
  },
  actions: {
    async GET_COMPANY_CODE({ commit }) {
      console.log(123213213)
      const response = await hrApi.get('/company/searchCompany')
      console.log(response)
      commit('getCompanyCode', response)
    },

    async GET_WORKPLACE_CODE({ commit }, payload) {
      console.log(payload)
      if (payload !== '') {
        const response = await hrApi.get('/company/searchWorkplace', {
          params: {
            companyCode: payload,
          },
        })
        commit('getWorkplaceCode', response)
      }
    },
    async AUTHORITY_REQUEST(_, payload) {
      const {
        companyCode, workplaceCode, empCode, password,
      } = payload
      const { data } = await sys.post('/login', {
        empCode,
        companyCode,
        workplaceCode,
        password,
      })
      console.log(data)
      return data
    },
  },
}
