import axios from "axios";
import { CLEAR_ACQUIRE_STATE, SET_ACQUIRE_DATA } from "./AcquireReducer";
import { SetError } from "../ErrorModal/ErrorModalAction";
import { SetButtonLoading } from "../MainAction";

export const GetAcquireData = (requestSettings) => {
    return async (dispatch, getState) => {
        dispatch(SetButtonLoading(true));
        const requestParameters = SetRequestParameters(requestSettings);
        requestParameters.apikey = getState().Main.apiKey;
        requestParameters.organizationId = getState().Main.organizationId;
        let result = await axios.get(`api/acquire`, {params: {
            requestParameters: JSON.stringify(requestParameters)
        }});
        if(result.data.success === true)
            dispatch({type: SET_ACQUIRE_DATA, value: result.data.data});
        else if(result.data.success === false)
            dispatch(SetError("Error", result.data.message));
        dispatch(SetButtonLoading(false));
    }
}

export const ClearAcquireData = () => {
    return (dispatch) => {
        dispatch({type: CLEAR_ACQUIRE_STATE});
    }
}

export const SetRequestParameters = (requestSettings) => {
    let splitByUsed = true;
    let fieldsUsed = true;
    let storesPlatformsUsed = true;
    if(Object.values(requestSettings.splitBy).every(element => element === false))
        splitByUsed = false;
    if(Object.values(requestSettings.fields).every(element => element === false))
        fieldsUsed = false;
    if(Object.values(requestSettings.stores).every(element => element === false))
        storesPlatformsUsed = false;
    const requestParameters = {
        startTime: requestSettings.startTime, 
        endTime: requestSettings.endTime, 
        scale: requestSettings.scale.toLowerCase(),
        splitByUsed: splitByUsed, 
        fieldsUsed: fieldsUsed, 
        storesPlatformsUsed: storesPlatformsUsed,
        splitBy: requestSettings.splitBy, 
        fields: requestSettings.fields,
        campaignSets: requestSettings.campaignSets, 
        campaigns: requestSettings.campaigns, 
        targets: requestSettings.targets, 
        adTypes: requestSettings.adTypes, 
        stores: requestSettings.stores,
        platforms: requestSettings.platforms,
        countries: requestSettings.countries, 
        osVersions: requestSettings.osVersions, 
        creativePacks: requestSettings.creativePacks, 
        sourceAppIds: requestSettings.sourceAppIds, 
        skadConversionValues: requestSettings.skadConversionValues 
    };
    return requestParameters;
}