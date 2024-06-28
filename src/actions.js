import {
    graphql, formatPageQueryWithCount, formatMutation
} from "@openimis/fe-core";

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
function transformChequeData(data) {
    return data.map(item => {
      return {
        chequeImportLineCode: item[1],
        chequeImportLineDate: item[3],
        chequeImportLineStatus: item[2],
      };
    });
  }
export const fetchDuplicatesCheque = (duplicatesCheque) => ({
    type: 'DUPLICATED_CHEQUE',
    payload: transformChequeData(duplicatesCheque.updatedCheques)
});
