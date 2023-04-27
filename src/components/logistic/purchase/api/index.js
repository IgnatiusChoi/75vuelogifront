import axios from 'api/logiApi';

export const inspection = (param) =>
    axios.put("/purchase/inspection", 
    { sendData: param },
    {  headers: {  "Content-Type": "application/json" }},
    );


    export const getBomDeploy =
    async (param) => {
    const result = await axios.get(
        '/purchase/searchBomDeploy', {
            params : {
                deployCondition: param.deployCondition,
                itemCode: param.itemCode,
                itemClassificationCondition: param.divisionCode,
            }
        }
    )
    return result.data;
    }


    export const getBomDeployRegist =
async (param) => {
const result = await axios.get("/purchase/searchBomInfo", {
    params: {
        parentItemCode: param
    },
})
return result.data;
}

export const getDetailCode =
async (param) => {
const result = await axios.get(
    '/base/codeList', {
        params: {
            divisionCode: param
        }
    }
)
return result.data;
}

export const batchBom =
async (param) => {
const result = await axios.post(
    "/purchase/batchBomListProcess",
    {
        batchList: JSON.stringify(param)
    }
)
return result.data;
}

export const optionOrderDialog =
async () => {
const result = await axios.get('/base/getOptionItemList')
return result.data;
}

export const onClickOptionOrder =
async (params) => {
const result = await axios.get('/purchase/optionOrder', {
    params: {
        itemCode: params.itemCode,
        itemAmount: params.itemAmount
    }
})
return result.data;
}

export const onClickGetOrderList =
async (params) => {
const result = await axios
.get('/purchase/getOrderList', {
    params: {
        startDate: params.startDate,
        endDate: params.endDate
    }
})
return result.data;
}

export const onClickOrderOpen =
async (param) => {
const result = await axios
.get('/purchase/showOrderDialog', {
    params: {
        mrpGatheringNoList: param.mrpGatheringNoList
    }
})
return result.data;
}



