import {
    graphql, formatPageQueryWithCount, formatMutation, graphqlMutation,
} from "@openimis/fe-core";
import { RSAA } from "redux-api-middleware";



function getApiUrl() {
    let _baseApiUrl = process.env.REACT_APP_API_URL ?? "/api";
    if (_baseApiUrl.indexOf("/") !== 0) {
        _baseApiUrl = `/${_baseApiUrl}`;
    }
    return _baseApiUrl;
}

export const baseApiUrl = getApiUrl();
export function fetchCheques(mm, filters) {
    const payload = formatPageQueryWithCount(
        "chequeimportline",
        filters,
        ["idChequeImportLine", "chequeImportLineCode", "chequeImportLineDate", "chequeImportLineStatus"]
    );
    return graphql(payload, 'CMS_CS_CHECKLIST');
}


export function fetchChequeSummaries(mm, filters) {
    var projections = [
        "idChequeImportLine",
        "chequeImportLineCode",
        "chequeImportLineDate",
        "chequeImportLineStatus"
    ];
    const payload = formatPageQueryWithCount("chequeimportline", filters, projections);
    return graphql(payload, "CMS_CS_CHECKLIST");
}

export function fetchChequesImport() {
    const payload = formatPageQueryWithCount(
        "chequeimport",
        null,
        ["idChequeImport", "importDate", "storedFile"]
    );
    return graphql(payload, 'CMS_CS_CHECKIMPORT');
}

export function updateChequeStatus(mm, chequeStatus, clientMutationLabel, idChequeImportLine, chequeImportLineStatus) {
    let mutation = formatMutation("updateChequeStatus", formatChequeStatusGQL(mm, chequeStatus), clientMutationLabel, idChequeImportLine, chequeImportLineStatus);
    var requestedDateTime = new Date();
    chequeStatus.clientMutationId = mutation.clientMutationId;
    return graphql(mutation.payload, ["CMS_CS_CHECKIMPORT_REQ", "CMS_CS_UPDATE_CHECKIMPORT_RESP", "CMS_CS_CHECKIMPORT_ERR"], {
        clientMutationId: mutation.clientMutationId,
        clientMutationLabel, idChequeImportLine,
        requestedDateTime
    });

}

export function formatChequeStatusGQL(mm, chequeStatus) {
    return `
      ${!!chequeStatus.chequeImportLineStatus ? `chequeImportLineStatus: "${chequeStatus.chequeImportLineStatus}"` : ""}
      ${!!chequeStatus.idChequeImportLine ? `idChequeImportLine: ${chequeStatus.idChequeImportLine}` : ""}
    `;
}

function getCsrfToken() {
    const CSRF_TOKEN_NAME = 'csrftoken';
    const CSRF_NOT_FOUND = null;

    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');

    const csrfCookie = cookieArray.find(cookie => cookie.startsWith(CSRF_TOKEN_NAME));
    return csrfCookie?.split('=')[1] ?? CSRF_NOT_FOUND;
}

export function fetch(config) {
    return async (dispatch) => {
        return dispatch({
            [RSAA]: {
                ...config,
                headers: {
                    "Content-Type": "application/json",
                    ...config.headers,
                },
            },
        });
    };
}
export function initialize() {
    return async (dispatch) => {
        await dispatch(login());
        return dispatch({ type: "CORE_INITIALIZED" });
    };
}

export function loadUser() {
    return fetch({
        endpoint: `${baseApiUrl}/core/users/current_user/`,
        method: "GET",
        types: ["CORE_USERS_CURRENT_USER_REQ", "CORE_USERS_CURRENT_USER_RESP", "CORE_USERS_CURRENT_USER_ERR"],
    });
}

export function login(credentials, source = null) {
    return async (dispatch) => {
        if (credentials) {
            const mutation = `mutation authenticate($username: String!, $password: String!) {
                tokenAuth(username: $username, password: $password) {
                    refreshExpiresIn
                }
            }`;

            const csrfToken = getCsrfToken();

            try {
                const response = await dispatch(
                    graphqlMutation(mutation, credentials, ["CORE_AUTH_LOGIN_REQ", "CORE_AUTH_LOGIN_RESP", "CORE_AUTH_ERR"], {}, false, {
                        "X-CSRFToken": csrfToken
                    }),
                );
                if (response.payload?.errors?.length > 0) {
                    const errorMessage = response.payload.errors[0].message;
                    dispatch(authError({ message: errorMessage, name: "ApiError", status: 401 }, source));
                    return { loginStatus: "CORE_AUTH_ERR", message: "Unauthorized" };
                }
                const action = await dispatch(loadUser());
                return { loginStatus: action.type, message: action?.payload?.response?.detail ?? "" };
            } catch (error) {
                dispatch(authError({ message: error.message, name: "ApiError", status: 401 }, source));
                return { loginStatus: "CORE_AUTH_ERR", message: "Unauthorized" };
            }
        }
    };
}

export function authError(error, source = null) {
    return {
        type: "CORE_AUTH_ERR",
        payload: { ...error, source },
    };
}

export function fetchCheckModificationHistory() {
    const payload =
        `query {
        ChequeUpdatedHistories {
        edges {
        node {
        id
        idChequeUpdated
        chequeImportLine{
        id
        idChequeImportLine
        chequeImportLineCode
        }
        user{
        loginName
        }
        updatedDate
        description
        }
        }
        }
        }`

    return graphql(payload, 'HISTORY_CHEQUE')
}

  

