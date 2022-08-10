import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import reducer from "./reducer";
import CmrCsModuleMainMenu from "./menus/CmrCsModuleMainMenu";

import ChequeListPage from "./pages/ChequeListPage";
import ChequeImportPage from "./pages/ChequeImportPage";

import ChequeSanteActivitiesReport from "./reports/ChequeSanteActivitiesReport";

const ROUTE_CMR_CS_LIST = "cheque/list"
const ROUTE_CMR_CS_IMPORT = "cheque/import"

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr },
  ],
  "reducers": [{ key: 'cmr_cs', reducer }],
  "reports":[
    {
      key: "cpn1_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo
        })
    },
    {
      key: "cpn4_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "assisted_birth_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "CPON_under_check_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "newborn_CPoN_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "complicated_birth_with_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "cesarian_cs_rate",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "pregnant_woman_reference_rate",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "paid_invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "rejected_invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "check_in_use_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "closed_check_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    },
    {
      key: "severe_malaria_cost_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      //isValid: (values)=> true,
      getParams: (values) =>({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
        })
    }
  ],
  "core.MainMenu" : [CmrCsModuleMainMenu],
  "core.Router": [
    { path: ROUTE_CMR_CS_LIST, component: ChequeListPage },
    { path: ROUTE_CMR_CS_IMPORT, component: ChequeImportPage },
  ],
}

export const CmrCsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}