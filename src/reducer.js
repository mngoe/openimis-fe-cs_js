import {
    formatServerError, formatGraphQLError, parseData, pageInfo,
    dispatchMutationReq, dispatchMutationErr, dispatchMutationResp
} from '@openimis/fe-core';

function reducer(
    state = {
        fetchingCheques: false,
        errorCheques: null,
        fetchedMyCheque: false,
        myCheques: [],
        myChequesPageInfo: { totalCount: 0 },

        fetchingChequesImport: false,
        errorChequesImport: null,
        fetchedMyChequeImport: false,
        myChequesImport: [],
        myChequesImportPageInfo: { totalCount: 0 },

        submittingMutation: false,
        mutation: {},    
    },
    action,
) {
    switch (action.type) {
        case 'LOCATION_USER_DISTRICTS_RESP':
            console.log(`Hé, I'm My Module... are you in ${action.payload.data.userDistricts[0].name}?`);
            return state;                                  
        case 'CMS_CS_CHECKLIST_REQ':
            return {
                ...state,
                fetchingCheques: true,
                fetchedMyCheques: false,
                myCheques: [],
                myChequesPageInfo: { totalCount: 0 },
                errorCheques: null,
            };
        case 'CMS_CS_CHECKLIST_RESP':
            return {
                ...state,
                fetchingCheques: false,
                fetchedMyCheques: true,
                myCheques: parseData(action.payload.data.healthFacilities),
                myChequesPageInfo: pageInfo(action.payload.data.healthFacilities),
                errorCheques: formatGraphQLError(action.payload)
            };
        case 'CMS_CS_CHECKLIST_ERR':
            return {
                ...state,
                fetchedMyCheques: false,
                errorCheques: formatServerError(action.payload)
            };
        case 'CMS_CS_CHECKLIST_REQ':
            return {
                ...state,
                fetchingCheques: true,
                fetchedMyCheques: false,
                myCheques: [],
                myChequesPageInfo: { totalCount: 0 },
                errorCheques: null,
            };
        case 'CMS_CS_CHECKLIST_RESP':
            return {
                ...state,
                fetchingCheques: false,
                fetchedMyCheques: true,
                myCheques: parseData(action.payload.data.healthFacilities),
                myChequesPageInfo: pageInfo(action.payload.data.healthFacilities),
                errorCheques: formatGraphQLError(action.payload)
            };
        case 'CMS_CS_CHECKLIST_ERR':
            return {
                ...state,
                fetchedMyCheques: false,
                errorCheques: formatServerError(action.payload)
            };
        case 'CMS_CS_CHECKIMPORT_REQ':
            return {
                ...state,
                fetchingChequesImport: true,
                fetchedMyChequesImport: false,
                myChequesImport: [],
                myChequesImportPageInfo: { totalCount: 0 },
                errorChequesImport: null,
            };
        case 'CMS_CS_CHECKIMPORT_RESP':
            return {
                ...state,
                fetchingChequesImport: false,
                fetchedMyChequesImport: true,
                myChequesImport: parseData(action.payload.data.healthFacilities),
                myChequesImportPageInfo: pageInfo(action.payload.data.healthFacilities),
                errorChequesImport: formatGraphQLError(action.payload)
            };
        case 'CMS_CS_CHECKIMPORT_ERR':
            return {
                ...state,
                fetchedMyChequesImport: false,
                errorChequesImport: formatServerError(action.payload)
            };
        case 'MY_MODULE_CREATE_ENTITY_REQ':
            return dispatchMutationReq(state, action)
        case 'MY_MODULE_CREATE_ENTITY_ERR':
            return dispatchMutationErr(state, action);
        case 'MY_MODULE_CREATE_ENTITY_RESP':
            return dispatchMutationResp(state, "createLocation", action);         
        default:
            return state;
    }
}

export default reducer;