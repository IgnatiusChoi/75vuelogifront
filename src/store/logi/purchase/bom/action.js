import { searchItemCodeList } from '@/api/logi/purchase'
import {searchBomList} from "@/api/logi/purchase";
import {searchRegistBomList} from "@/api/logi/purchase";

export default {
  async SEARCH_ITEM_CODE_LIST({ commit }, payload) {
    try {
      console.log('payload', payload)
      const res = await searchItemCodeList(payload)
      const itemCodeList = res.data
      console.log('res', res)
      commit('SEARCH_ITEM_CODE_LIST', itemCodeList)
      return res
    } catch (err) {
      throw new Error(err)
    }
  },

  async SEARCH_BOM_LIST({ commit }, payload) {
    try {
      console.log('payload', payload)
      const { data } = await searchBomList(payload)
      console.log('data', data)
      commit('SEARCH_BOM_LIST', data)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  async SEARCH_REGIST_BOM_LIST({ commit }, payload) {
    try {
      console.log('payload', payload)
      const { data } = await searchRegistBomList(payload)
      console.log('data', data)
      commit('SEARCH_REGIST_BOM_LIST', data)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

}
