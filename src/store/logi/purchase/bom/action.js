import {batchBomList, searchBomDataList, searchItemCodeList} from '@/api/logi/purchase'
import {searchBomList} from "@/api/logi/purchase";
import {searchRegistBomList} from "@/api/logi/purchase";
import {batchClientList} from "@/api/logi/compinfo";
import {batchBom} from "@/components/logistic/purchase/api";

export default {
  async SEARCH_ITEM_CODE_LIST({ commit }, payload) {
    try {
      const res = await searchItemCodeList(payload)
      const itemCodeList = res.data
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

  //dbs
  async SEARCH_BOM_DATA_LIST({commit}, payload) {
    try {
      const {data} = await searchBomDataList(payload)
      commit('SEARCH_BOM_DATA_LIST', data)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  async BATCH_BOM_LIST({commit}, payload) {
    try{
      const {data} = await batchBomList(payload);
    } catch (err){
      throw new Error(err)
    }
  },

}
