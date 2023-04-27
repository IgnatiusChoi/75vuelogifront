export default {

    GET_WAREHOUSE_DETAIL_LIST(state, gridRow) {
        state.stockAmountDetailList = gridRow
    },

    SEARCH_STOCK_LIST(state, gridRow) {
        state.stockList = gridRow
    },
}