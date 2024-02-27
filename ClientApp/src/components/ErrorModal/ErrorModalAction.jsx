import { SET_ERROR_MESSAGE, SET_ERROR_TYPE, SET_MODAL_STATE } from "./ErrorModalReducer";

export const SetModal = (state) => {
    return (dispatch) => {
        dispatch({type: SET_MODAL_STATE, value: state});
    }
}

export const SetErrorMessage = (message) => {
    return (dispatch) => {
        dispatch({type: SET_ERROR_MESSAGE, value: message});
    }
}

export const SetErrorType = (type) => {
    return (dispatch) => {
        dispatch({type: SET_ERROR_TYPE, value: type});
    }
}

export const SetError = (type, message) => {
    return (dispatch) => {
        dispatch(SetModal(true));
        dispatch(SetErrorType(type));
        dispatch(SetErrorMessage(message));
    }
}