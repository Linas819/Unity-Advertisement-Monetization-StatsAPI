import { SET_LOGIN, SET_ORGANIZATION_ID, SET_BUTTON_LOADING, CLEAR_MAIN_STATE, SET_API_KEY } from './MainReducer';
import { CLEAR_ERROR_STATE } from './ErrorModal/ErrorModalReducer';

export const Login = (logIn, history, link) => {
    return (dispatch) => {
        dispatch(SetButtonLoading(true));
        sessionStorage.user = logIn.organizationId;
        sessionStorage.setItem('apiKey', logIn.apiKey);
        dispatch(SetLogin(true));
        dispatch(SetOrganizationId(logIn.organizationId));
        dispatch(SetApiKey(logIn.apiKey));
        dispatch(SetButtonLoading(false));
        history.push("/" + link);
    }
}

export const CheckSession = (history) => {
    return (dispatch) => {
        const apiKey = sessionStorage.getItem('apiKey');
        if(sessionStorage.user === undefined && apiKey === null)
        {
            history.push("/");
        }
        else 
        {
            dispatch(SetLogin(true));
            dispatch(SetOrganizationId(sessionStorage.user));
            dispatch(SetApiKey(apiKey));  
            return;     
        }
    }
}

export const SetLogin = (state) => {
    return (dispatch) => {
        dispatch({type: SET_LOGIN, value: state});
    }
}

export const SetOrganizationId = (organizationId) => {
    return (dispatch) => {
        dispatch({type: SET_ORGANIZATION_ID, value: organizationId});
    }
}

export const SetApiKey = (apiKey) => {
    return(dispatch) => {
        dispatch({type: SET_API_KEY, value: apiKey});
    }
}

export const SetButtonLoading = (state) => {
    return (dispatch) => {
        dispatch({type: SET_BUTTON_LOADING, value: state});
    }
}

export const Logout = (history) => {
    return (dispatch) => {
        dispatch({type: CLEAR_MAIN_STATE});
        dispatch({type: CLEAR_ERROR_STATE});
        sessionStorage.clear();
        history.push("/");
    }
}