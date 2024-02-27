export const SET_MODAL_STATE = "SET_MODAL_STATE";
export const SET_ERROR_TYPE = "SET_ERROR_TYPE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const CLEAR_ERROR_STATE = "CLEAR_ERROR_STATE";

const initialState = {
    modalState: false,
    errorType: "",
    errorMessage: ""
}

export const ErrorModalReducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SET_MODAL_STATE:
            state = {
                ...state,
                modalState: action.value
            };
            break;
        case SET_ERROR_TYPE:
            state = {
                ...state,
                errorType: action.value
            };
            break;
        case SET_ERROR_MESSAGE:
            state = {
                ...state,
                errorMessage: action.value
            };
            break;
        case CLEAR_ERROR_STATE:
            state = initialState;
        default:
            break;
    }
    return state;
}