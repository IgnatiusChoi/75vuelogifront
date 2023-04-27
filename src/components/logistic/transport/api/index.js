import axios from 'api/logiApi'; //'http://localhost:8282/logi'

export const searchTransportList = (action) =>
axios.get("/account/findRangedSlipList", {
    params: {
      startDate: action.params.startDate,
      endDate: action.params.endDate,
    },
});


export const updateSlip = (action) => 
  axios.get("/account/updateSlip", {
    params: {
      slipType: action.payload.slipType,
      expenseReport: action.payload.expenseReport,
      slipNo: action.payload.slipNo,
    },
});