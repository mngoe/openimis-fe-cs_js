import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import reducer from "./reducer";
import CmrCsModuleMainMenu from "./menus/CmrCsModuleMainMenu";

import ChequeListPage from "./pages/ChequeListPage";
import ChequeImportPage from "./pages/ChequeImportPage";

import ChequeStatusPicker from "./pickers/ChequeStatusPicker";
import ChequeSanteActivitiesReport from "./reports/ChequeSanteActivitiesReport";
import ChequeSanteActivitiesFullLocationReport from "./reports/ChequeSanteActivitiesFullLocationReport";

const ROUTE_CMR_CS_LIST = "cheque/list"
const ROUTE_CMR_CS_IMPORT = "cheque/import"

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr },
    { key: "fr_cs", messages: messages_fr },
  ],
  "reducers": [{ key: 'cmr_cs', reducer }],
  "refs": [
    { key: "cmr_cs.ChequeStatusPicker", ref: ChequeStatusPicker }
  ],
  "reports":[
    {
      key: "invoice_fosa_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0
        })
    },
    {
      key: "cpn1_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "cpn4_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "assisted_birth_under_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "CPON_under_check_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "newborn_CPoN_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "complicated_birth_with_cs",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "cesarian_cs_rate",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "pregnant_woman_reference_rate",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "paid_invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "rejected_invoice_per_period_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "check_in_use_report",
      component: ChequeSanteActivitiesFullLocationReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "closed_check_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
        })
    },
    {
      key: "severe_malaria_cost_report",
      component: ChequeSanteActivitiesReport,
      isValid: (values)=> values.dateFrom && values.dateTo,
      getParams: (values) =>({
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0?.code ? values.location0.code : 0,
        location1: values.location1?.code ? values.location1.code : 0,
        location2: values.location2?.code ? values.location2.code : 0,
        hflocation: values.hflocation?.code ? values.hflocation.code : 0,
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