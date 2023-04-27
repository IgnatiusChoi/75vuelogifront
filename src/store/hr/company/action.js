import { searchCustomerList } from '@/api/hr/company'

export default {
  async searchCustomerList({ commit }, searchOption) {
    try {
      const res = await searchCustomerList(searchOption)
      const companyCodeList = res.data.gridRowJson
      console.log(res)
      commit('searchCustomerList', companyCodeList)

      // return res
    } catch (err) {
      throw new Error(err)
    }
  },
}
