export const SET_ACQUIRE_DATA = "SET_ACQUIRE_DATA";
export const CLEAR_ACQUIRE_STATE = "CLEAR_ACQUIRE_STATE";
export const SET_ACQUIRE_REQUEST_PARAMETERS = "SET_ACQUIRE_REQUEST_PARAMETERS"

const initialState = {
    acquireData: []
}

export const AcquireReducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SET_ACQUIRE_DATA:
            state = {
                ...state,
                acquireData: action.value
            };
            break;
        case CLEAR_ACQUIRE_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
}