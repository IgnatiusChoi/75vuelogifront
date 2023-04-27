import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import router from '@/router'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import account from './account'
import hr from './hr'
import logi from './logi'
import common from './common'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: [],
    detailGrid: [],
    tableColumns: [],
    detailTableColumns: [],
  },
  modules: {
    app,
    appConfig,
    verticalMenu,
    account,
    hr,
    logi,
    auth,
    common,
  },
  mutations: {
    changeTab(state, payload) {
      console.log(payload)
      if (payload === 'hr') {
        state.account.connect = false
        state.logi.connect = false
        state.hr.connect = true
        router.push({ name: 'hrHome' })
      } else if (payload === 'account') {
        state.account.connect = true
        state.logi.connect = false
        state.hr.connect = false
        router.push({ name: 'accountHome' })
      } else if (payload === 'logi') {
        state.account.connect = false
        state.logi.connect = true
        state.hr.connect = false
        router.push({ name: 'logiHome' })
      }
    },
    SET_TABLE(state, tableColumns) {
      state.tableColumns = tableColumns[0].tableColumns
      state.detailTableColumns = tableColumns[0].detailTableColumns
    },
    RESET_GRID(state) {
      state.grid = []
      state.detailGrid = []
    },
    ADD_ROW(state, row) {
      const { gridType } = row
      console.log(row)
      if (gridType === 'grid') state.grid = state.grid.concat(row.rowData)
      if (gridType === 'detailGrid') state.detailGrid = state.detailGrid.concat(row.rowData)
    },
    ADD_ROW_ONLY_ONE(state, row) {
      const { gridType } = row
      if (gridType === 'grid') {
        console.log(row)

        state.grid = []
        state.grid = state.grid.concat(row.rowData)
      }
      if (gridType === 'detailGrid') {
        state.detailGrid = []
        state.detailGrid = state.detailGrid.concat(row.rowData)
      }
    },
  },
  strict: process.env.DEV,
})
