const SELECT_TRANSPORT_LIST_SUCCESS = "src/erp/account/Saga/Saga/SELECT_TRANSPORT_SUCCESS";
const SELECT_TRANSPORT_LIST_FAILURE = "src/erp/account/Saga/Saga/SELECT_TRANSPORT_FAILURE";


const initialState = {
    transportList : []
};

const transportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TRANSPORT_LIST_SUCCESS:
            console.log("SELECT_TRANSPORT_SUCCESS");
            console.log(action)
            return {
                ...state,
                payload: action.payload
            };
        case SELECT_TRANSPORT_LIST_FAILURE: 
            console.log("SELECT_TRANSPORT_FAILURE");
            console.log(action)
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default transportReducer;