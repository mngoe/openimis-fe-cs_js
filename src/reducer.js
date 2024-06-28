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
        authError: null,
        fetchingChequesImport: false,
        errorChequesImport: null,
        fetchedMyChequeImport: false,
        myChequesImport: [],
        myChequesImportPageInfo: { totalCount: 0 },
        submittingMutation: false,
        mutation: {},
        duplicatesCheque: [],
    },
    action,
) {
    switch (action.type) {
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
                myCheques: parseData(action.payload.data.chequeimportline),
                myChequesPageInfo: pageInfo(action.payload.data.chequeimportline),
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
                myChequesImport: parseData(action.payload.data.chequeimport),
                myChequesImportPageInfo: pageInfo(action.payload.data.chequeimport),
                errorChequesImport: formatGraphQLError(action.payload)
            };
        case 'CMS_CS_CHECKIMPORT_ERR':
            return {
                ...state,
                fetchedMyChequesImport: false,
                errorChequesImport: formatServerError(action.payload)
            };
        // AUTH
        case "CORE_AUTH_LOGIN_RESP": {
            console.log(' core auth resp ', action.payload)
            if (action.payload?.errors) {
                return {
                    ...state,
                    authError: formatGraphQLError(action.payload),
                };
            }
            return {
                ...state,
                authError: null,
            };
        }
        case "CORE_AUTH_ERR": {
            action.payload = {...action.payload, sources:"AuthChequeDialog"}
            console.log('core called', action)

            return {
                ...state,
                user: null,
                authError: formatServerError(action.payload),
            };
        }
        case 'DUPLICATED_CHEQUE':
            return{
                ...state,
                duplicatesCheque: action.payload
            }
        default:
            return state;
    }
}

export default reducer;