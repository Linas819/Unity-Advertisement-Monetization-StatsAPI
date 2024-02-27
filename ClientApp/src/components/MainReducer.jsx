export const SET_LOGIN = "SET_LOGIN";
export const SET_BUTTON_LOADING = "SET_BUTTON_LOADING";
export const SET_ORGANIZATION_ID = "SET_ORGANIZATION_ID";
export const CLEAR_MAIN_STATE = "CLEAR_MAIN_STATE";
export const SET_API_KEY = "SET_API_KEY";

const initialState = {
    isLoggedIn: false,
    isButtonLoading: false,
    organizationId: "",
    apiKey: ""
}

export const MainReducer = (state, action) => {
    state = state || initialState;
    switch(action.type){
        case SET_BUTTON_LOADING:
            state = {
                ...state,
                isButtonLoading: action.value
            };
            break;
        case SET_LOGIN:
            state = {
                ...state,
                isLoggedIn: action.value
            };
            break;
        case SET_ORGANIZATION_ID:
            state = {
                ...state,
                organizationId: action.value
            };
            break;
        case SET_API_KEY:
            state = {
                ...state,
                apiKey: action.value
            };
            break;
        case CLEAR_MAIN_STATE:
            state = initialState;
            break;
        default:
            break;
    };
    return state;
}