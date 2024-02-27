export const SET_MONETIZATION_DATA = "SET_MONETIZATION_DATA";
export const CLEAR_MONETIZATION_STATE = "CLEAR_MONETIZATION_STATE";

const initialState = {
    monetizationData: []
}

export const MonetizationReducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SET_MONETIZATION_DATA:
            state = {
                ...state,
                monetizationData: action.value
            };
            break;
        case CLEAR_MONETIZATION_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
}