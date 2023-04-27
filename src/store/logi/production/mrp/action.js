var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { searchMpsList, searchMrpList, registerMrp, mrpGatherList, mrpGatherResultList, gatherResultRegist, searchMrpGathering,
// @ts-ignore
 } from '@/api/logi/production';
const actions = {
    // MRP에서 MPS조회
    SEARCH_MPS_LIST({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield searchMpsList(payload);
                commit('SET_SEARCH_MPS_LIST', data.result.data.gridRowJson);
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
    // MRP모의전개
    SEARCH_MRP_LIST({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield searchMrpList(payload);
                commit('SET_SEARCH_MRP_LIST', data.gridRowJson);
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
    // 전개결과 MRP 등록
    REGISTER_MRP(_, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield registerMrp(payload);
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
    // 소요량취합 Tab TableList
    SEARCH_MRP_GATHER_LIST_REQUEST({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield mrpGatherList(payload);
                commit('SET_MRP_GATHER_LIST', data.gridRowJson);
                return null;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                return null;
            }
        });
    },
    // MrpGather 결과 조회
    SEARCH_MRP_GATHER_RESULT_LIST({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield mrpGatherResultList(payload);
                commit('SET_MRP_RESULT_LIST', data.gridRowJson);
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
    // 취합 결과 등록
    GATHER_RESULT_REGIST(_, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield gatherResultRegist(payload);
                return null;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                return null;
            }
        });
    },
    // 소요량취합 조회
    SEARCH_MRP_GATHERING({ commit }, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield searchMrpGathering(payload);
                commit('SET_SEARCH_MRP_GATHERING', data.gridRowJson);
                return null;
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                return null;
            }
        });
    },
};
export default actions;
