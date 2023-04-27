var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import { searchOrderList } from '@/api/logi/purchase';
const actions = {
    // 재고처리/발주필요 목록조회
    SEARCH_ORDER_LIST({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield searchOrderList(payload);
                console.log(data);
                commit('SET_ORDER_LIST', data.gridRowJson);
                return data;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                return null;
            }
        });
    },
    async SEARCH_WORK_ORDER_LIST({ commit }){
        try {
            //const { data } = await searchWorkOrderList()
            console.log("좀찍혀라;;;");
            //commit('SET_WORK_ORDER_LIST', data)
            return null
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message)
            }
            return null
        }
    }
};
export default actions;
