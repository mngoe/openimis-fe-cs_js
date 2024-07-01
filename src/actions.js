import {
  graphql, formatPageQueryWithCount, formatMutation
} from "@openimis/fe-core";

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
function transformChequeData(data) {
  const storedData = localStorage.getItem('duplicatesCheque');
  const parsedData = storedData ? JSON.parse(storedData) : [];

  const newData = data.map(item => {
    return {
      chequeImportLineCode: item[1],
      chequeImportLineDate: item[3],
      chequeImportLineStatus: item[2],
    };
  });

  const combinedData = parsedData.concat(newData);

  const uniqueData = combinedData.reduce((acc, current) => {
    const x = acc.find(item => item.chequeImportLineCode === current.chequeImportLineCode);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  localStorage.setItem('duplicatesCheque', JSON.stringify(uniqueData));
  return uniqueData;
}


export const fetchDuplicatesCheque = (duplicatesCheque, canParse) => ({
  type: 'DUPLICATED_CHEQUE',
  payload: (!!canParse && canParse == true) ? transformChequeData(duplicatesCheque) : duplicatesCheque
});
