import {
    insertOutsource,
    searchOutsource,
    searchOutsourceInfo,
    searchFowardInfo,
    updateFowardChange,
    searchInspecionInfo,
    updateInspecionInfo,

} from '@/api/logi/outsourcing'

export default {
    async searchOutsourcList({ commit }, payload) {

        console.log(payload)
        try {
            const res = await searchOutsource(payload)
            console.log("데이터확인")
            console.log(res)
            const gridRow = res.data.gridRowJson
            commit('setGrid', gridRow)

            return res
        } catch (err) {
            throw new Error(err)
        }
    },
    async insertOutsourcList({ commit }, payload) {

        console.log(payload)
        try {
            const res = await insertOutsource(payload)
        } catch (err) {
            throw new Error(err)
        }
    },
    async searchOutsourcInfoList({ commit }, payload) {

        console.log(payload)
        try {
            const res = await searchOutsourceInfo(payload)
            console.log("데이터확인")
            console.log(res)
            const gridRow = res.data.gridRowJson
            commit('setOutsourcInfo', gridRow)

            return res
        } catch (err) {
            throw new Error(err)
        }
    },
    async searchFowardInfoList({ commit }, payload) {

        console.log(payload)
        try {
            const res = await searchFowardInfo(payload)
            console.log("데이터확인")
            console.log(res)
            const gridRow = res.data.gridRowJson
            commit('setFowardInfo', gridRow)

            return res
        } catch (err) {
            throw new Error(err)
        }
    },
    async updateFowardStatus({ commit }, payload) {

        console.log("확인용")
        console.log(payload)
         try {
            const res = await updateFowardChange(payload)
        } catch (err) {
            throw new Error(err)
        }
    },
    async searchInspecion({ commit }) {
        try {
            const res = await searchInspecionInfo();
            console.log("데이터확인")
            console.log(res)
            const gridRow = res.data.gridRowJson
            commit('setInspectionInfo', gridRow)
            return res
        } catch (err) {
            throw new Error(err)
        }
    },
    async completeInspection({ commit }, payload) {
        console.log("여기여기")
        console.log(payload)
        try {
            const res = await updateInspecionInfo(payload);
        } catch (err) {
            throw new Error(err)
        }
    },
}
