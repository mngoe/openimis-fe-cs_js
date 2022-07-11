import {
    graphql, formatPageQueryWithCount, formatMutation
} from "@openimis/fe-core";

export function fetchCheques() {
    const payload = formatPageQueryWithCount(
        "chequeimportline",
        null,
        ["idChequeImportLine", "chequeImportLineCode" ,"chequeImportLineDate", "chequeImportLineStatus"]
    );
    return graphql(payload, 'CMS_CS_CHECKLIST');
}

export function fetchChequesImport() {
    const payload = formatPageQueryWithCount(
        "healthFacilities",
        null,
        ["id","code", "name"]
    );
    return graphql(payload, 'CMS_CS_CHECKIMPORT');
}