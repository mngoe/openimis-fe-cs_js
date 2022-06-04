'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var feCore = require('@openimis/fe-core');
var flatten = require('flat');
var _extends = require('@babel/runtime/helpers/extends');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var React = require('react');
var reactIntl = require('react-intl');
var reactRedux = require('react-redux');
var icons = require('@material-ui/icons');
var styles$9 = require('@material-ui/core/styles');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var redux = require('redux');
var core = require('@material-ui/core');
var _debounce = require('lodash/debounce');
var _pick = require('lodash/pick');
var EditIcon = require('@material-ui/icons/Edit');
var DeleteIcon = require('@material-ui/icons/Delete');
var Button = require('@material-ui/core/Button');
var Dialog = require('@material-ui/core/Dialog');
var DialogActions = require('@material-ui/core/DialogActions');
var DialogContent = require('@material-ui/core/DialogContent');
var DialogTitle = require('@material-ui/core/DialogTitle');
var AddIcon = require('@material-ui/icons/Add');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var flatten__default = /*#__PURE__*/_interopDefaultLegacy(flatten);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _debounce__default = /*#__PURE__*/_interopDefaultLegacy(_debounce);
var _pick__default = /*#__PURE__*/_interopDefaultLegacy(_pick);
var EditIcon__default = /*#__PURE__*/_interopDefaultLegacy(EditIcon);
var DeleteIcon__default = /*#__PURE__*/_interopDefaultLegacy(DeleteIcon);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var DialogActions__default = /*#__PURE__*/_interopDefaultLegacy(DialogActions);
var DialogContent__default = /*#__PURE__*/_interopDefaultLegacy(DialogContent);
var DialogTitle__default = /*#__PURE__*/_interopDefaultLegacy(DialogTitle);
var AddIcon__default = /*#__PURE__*/_interopDefaultLegacy(AddIcon);

var mainMenu = "Legal and Finance";
var menu = {
	invoices: "Invoices",
	bills: "Bills"
};

var messages_en = {
	mainMenu: mainMenu,
	menu: menu,
};

var REQUEST = function REQUEST(actionTypeName) {
  return actionTypeName + "_REQ";
};
var SUCCESS = function SUCCESS(actionTypeName) {
  return actionTypeName + "_RESP";
};
var ERROR = function ERROR(actionTypeName) {
  return actionTypeName + "_ERR";
};


var LEGAL_AND_FINANCE_MAIN_MENU_CONTRIBUTION_KEY = "invoice.MainMenu";

var LegalAndFinanceMainMenu = function LegalAndFinanceMainMenu(props) {
  var entries = [{
    text: feCore.formatMessage(props.intl, "invoice", "menu.invoices"),
    icon: /*#__PURE__*/React__default["default"].createElement(icons.DoubleArrow, null),
    route: "/invoices"
  }];
  entries.push.apply(entries, _toConsumableArray__default["default"](props.modulesManager.getContribs(LEGAL_AND_FINANCE_MAIN_MENU_CONTRIBUTION_KEY).filter(function (c) {
    return !c.filter || c.filter(props.rights);
  })));
  return /*#__PURE__*/React__default["default"].createElement(feCore.MainMenuContribution, _extends__default["default"]({}, props, {
    header: feCore.formatMessage(props.intl, "invoice", "mainMenu"),
    entries: entries
  }));
};

var LegalAndFinanceMainMenu$1 = reactIntl.injectIntl(feCore.withModulesManager(reactRedux.connect(mapStateToProps$c)(LegalAndFinanceMainMenu)));

var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: flatten__default["default"](messages_en)
  }],
  "core.MainMenu": [LegalAndFinanceMainMenu$1],
};
var InvoiceModule = function InvoiceModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

exports.InvoiceModule = InvoiceModule;
//# sourceMappingURL=index.js.map
