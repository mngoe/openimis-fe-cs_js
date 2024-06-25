import {
    graphql, formatPageQueryWithCount, formatMutation
} from "@openimis/fe-core";
import ChequeStatusPage from "./pages/ChequeStatusPage";

export function fetchCheques(mm, filters) {
    const payload = formatPageQueryWithCount(
        "chequeimportline",
        filters,
        ["idChequeImportLine", "chequeImportLineCode" ,"chequeImportLineDate", "chequeImportLineStatus"]
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
        ["idChequeImport","importDate", "storedFile"]
    );
    return graphql(payload, 'CMS_CS_CHECKIMPORT');
}

export function updateChequeStatus(mm, chequeStatus, clientMutationLabel,idChequeImportLine,chequeImportLineStatus) {
    let mutation = formatMutation("updateChequeStatus", formatChequeStatusGQL(mm, chequeStatus), clientMutationLabel,idChequeImportLine,chequeImportLineStatus);
    var requestedDateTime = new Date();
    chequeStatus.clientMutationId = mutation.clientMutationId;
    console.log("mutation",mutation.payload)
    return graphql(mutation.payload, ["CMS_CS_CHECKIMPORT_REQ","CMS_CS_UPDATE_CHECKIMPORT_RESP", "CMS_CS_CHECKIMPORT_ERR"], {
        clientMutationId: mutation.clientMutationId,
        clientMutationLabel,idChequeImportLine,
        requestedDateTime
    });
    
  }
  
  export function formatChequeStatusGQL(mm, chequeStatus) {
    // let id = chequeStatus.chequeImportLineCode
    console.log("mon idChequeImportLine",chequeStatus)
    return `
      ${!!chequeStatus.chequeImportLineStatus ? `chequeImportLineStatus: "${chequeStatus.chequeImportLineStatus}"` : ""}
      ${!!chequeStatus.idChequeImportLine ? `idChequeImportLine: ${chequeStatus.idChequeImportLine}` : ""}
    `;
  }
//   ${!!chequeStatus.chequeImportLineCode ? `chequeImportLineCode: "${chequeStatus.chequeImportLineCode}"` : ""}
//   ${!!chequeStatus.chequeImportLineDate ? `chequeImportLineDate: "${chequeStatus.chequeImportLineDate}"` : ""}
  