import axios from "axios";
import { CLEAR_MONETIZATION_STATE, SET_MONETIZATION_DATA } from "./MonetizationReducer";
import { SetError } from "../ErrorModal/ErrorModalAction";
import { SetButtonLoading } from "../MainAction";

export const GetMonetizationData = (requestSettings) => {
    return async (dispatch, getState) => {
        dispatch(SetButtonLoading(true));
        const requestParameters = SetRequestParameters(requestSettings);
        if(requestParameters.startTime === "")
        {
            dispatch(SetError("Error", "Start time cannot be empty"));
            dispatch(SetButtonLoading(false));
            return;
        } 
        if(requestParameters.endTime === "")
        {
            dispatch(SetError("Error", "End time cannot be empty"));
            dispatch(SetButtonLoading(false));
            return;
        }
        if(requestParameters.startTime === requestParameters.endTime)
        {
            dispatch(SetError("Error", "Start time and End time cannot be the same value"));
            dispatch(SetButtonLoading(false));
            return;
        }
        if(Object.values(requestParameters.fields).every(element => element === false))
        {
            dispatch(SetError("Error", "At least one field needs to be used"));
            dispatch(SetButtonLoading(false));
            return;
        }
        requestParameters.apiKey = getState().Main.apiKey;
        requestParameters.organizationId = getState().Main.organizationId;
        let result = await axios.get(`api/monetization`, {params: {
            requestParameters: JSON.stringify(requestParameters)
        }});
        if(result.data.success === true)
            dispatch({type: SET_MONETIZATION_DATA, value: result.data.data});
        else if(result.data.success === false)
            dispatch(SetError("Error", result.data.message));
        dispatch(SetButtonLoading(false));
    }
}

export const ClearMonetizationData = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_MONETIZATION_STATE});
    }
}

export const SetRequestParameters = (requestSettings) => {
    let groupByUsed = true;
    const groupBy = requestSettings.groupBy;
    if(Object.values(groupBy).every(element => element === false))
        groupByUsed = false;
    const requestParameters = {
        groupBy: groupBy,
        groupByUsed: groupByUsed,
        fields: requestSettings.fields,
        scale: requestSettings.scale,
        startTime: requestSettings.startTime,
        endTime: requestSettings.endTime,
        gameIds: requestSettings.gameIds
    };
    return requestParameters;
}