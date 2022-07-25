import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import reducer from "./reducer";
import CmrCsModuleMainMenu from "./menus/CmrCsModuleMainMenu";

import ChequeListPage from "./pages/ChequeListPage";
import ChequeImportPage from "./pages/ChequeImportPage";

import UserActivitiesReport from "./reports/UserActivitiesReport";

const ROUTE_CMR_CS_LIST = "cheque/list"
const ROUTE_CMR_CS_IMPORT = "cheque/import"

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr },
  ],
  "reducers": [{ key: 'cmr_cs', reducer }],
  "reports":[{
     key: "user_log_report",
     component: UserActivitiesReport,
     isValid: (values)=> values.dateFrom && values.dateTo,
     //isValid: (values)=> true,
     getParams: (values) =>({
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      usrAction: values.usrAction
     })
  }],
  "core.MainMenu" : [CmrCsModuleMainMenu],
  "core.Router": [
    { path: ROUTE_CMR_CS_LIST, component: ChequeListPage },
    { path: ROUTE_CMR_CS_IMPORT, component: ChequeImportPage },
  ],
}

export const CmrCsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}