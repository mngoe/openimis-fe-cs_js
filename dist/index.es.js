import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { formatServerError, formatGraphQLError, parseData, pageInfo, withModulesManager, formatMessage, MainMenuContribution, formatPageQueryWithCount, graphql, formatMutation, graphqlMutation, PublishedComponent, TextInput, Contributions, Searcher, formatMessageWithValues, formatDateFromISO, historyPush, Helmet, apiHeaders, ProgressOrError, Table, baseApiUrl as baseApiUrl$1, ConstantBasedPicker, NumberInput, FormPanel, FormattedMessage, withHistory, Form, journalize } from '@openimis/fe-core';
import _extends from '@babel/runtime/helpers/extends';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React, { Component, Fragment, useState, useRef, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect, useSelector, useDispatch } from 'react-redux';
import { ImportExport, ListAlt, ScreenShare } from '@material-ui/icons';
import _ from 'lodash';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { RSAA } from 'redux-api-middleware';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { Grid, Divider, Typography, Input, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Box, DialogActions } from '@material-ui/core';
import '@material-ui/icons/Tab';
import _debounce from 'lodash/debounce';
import ReplayIcon from '@material-ui/icons/Replay';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';

var currency$1 = "Fcfa";
var password$1 = "Password";
var incorrectPassword$1 = "Invalid Password";
var duplicateTable$1 = "Duplicate List";
var messages_en = {
	currency: currency$1,
	"cheque.mainMenu": "Check",
	"menu.chequeImport": "Import Check",
	"menu.chequeList": "Check List",
	"cmr_cs.ChequeListHeader": "Check List",
	"cmr_cs.table": "Table Check ({count})",
	"cmr_cs.duplicateTableList": "Duplicate Table Check ({count})",
	"cmr_cs-list.null": "All",
	"cmr_cs-list.New": "New",
	"cmr_cs-list.Used": "Used",
	"cmr_cs-list.Cancel": "Cancel",
	"cmr_cs.New": "New",
	"cmr_cs.Used": "Used",
	"cmr_cs.Cancel": "Cancel",
	"cmr_cs.checknum": "Check Number",
	"cmr_cs.checkstate": "Check Status",
	"cmr_cs.checkdate": "Check Creation Date",
	"cmr_cs.tableImport": "Table Import Check ({count})",
	"cmr_cs.importId": "Import Id",
	"cmr_cs.importDate": "Import Date",
	"cmr_cs.importUser": "Import User",
	"cmr_cs.storedFile": "Import File",
	"cmr_cs.uploadFile": "Upload File",
	"cmr_cs.importChecks": "Import Checks",
	"cmr_cs.importCheckFile": "Import Check File",
	"cmr_cs.currentlyImporting": "Currently Importing",
	"cmr_cs.checkImported": "Checks present in your file has been inserted in the database",
	"cmr_cs.dateFrom": "From",
	"cmr_cs.dateTo": "To",
	"cmr_cs.chequeNo": "Cheque Number",
	"chequeStatus.checknum": "Cheque number",
	password: password$1,
	"chequeStatus.checkdate": "date",
	"cmr_cs.passwordCheck": "Please enter your password",
	"cmr_cs.authchequedialog.login.button": "Checking",
	incorrectPassword: incorrectPassword$1,
	"edit.title": "Edit cheque",
	duplicateTable: duplicateTable$1
};

var currency = "Fcfa";
var password = "Mots de passe";
var incorrectPassword = "Mot de passe incorrect";
var duplicateTable = "Liste des Doublons";
var messages_fr = {
	currency: currency,
	"cheque.mainMenu": "Chèque",
	"menu.chequeImport": "Import Cheque",
	"menu.chequeList": "Liste Cheque",
	"cmr_cs.ChequeListHeader": "Liste des cheques",
	"cmr_cs.table": "Table Chèque ({count})",
	"cmr_cs.duplicateTableList": "Table Doublons  Chèque({count})",
	"cmr_cs.checknum": "Numéro Cheque",
	"cmr_cs.checkstate": "Statut Cheque",
	"cmr_cs.checkdate": "Date Creation Cheque",
	"cmr_cs.tableImport": "Table cheque Importé ({count})",
	"cmr_cs.importId": "Import Id",
	"cmr_cs.importDate": "Import Date",
	"cmr_cs.storedFile": "Fichier Importé",
	"cmr_cs.importUser": "Import User",
	"cmr_cs.uploadFile": "Envoyer fichier",
	"cmr_cs.importChecks": "Importer les cheques",
	"cmr_cs.importCheckFile": "Importer les fichiers de cheques",
	"cmr_cs.currentlyImporting": "Importation en cours",
	"cmr_cs.checkImported": "Les cheques present dans le fichier ont été importés",
	"cmr_cs.dateFrom": "De",
	"cmr_cs.dateTo": "A",
	"cmr_cs.New": "Nouveau",
	"cmr_cs.Used": "Utilisé",
	"cmr_cs.Cancel": "Annulé",
	"cmr_cs-list": "Statut cheque",
	"cmr_cs-list.New": "Nouveau",
	"cmr_cs-list.Used": "Utilisé",
	"cmr_cs-list.Cancel": "Annulé",
	"cmr_cs-list.null": "Tous",
	"cmr_cs.chequeNo": "Numéro Cheque",
	"chequeStatus.checknum": "Numéro de chèque",
	"chequeStatus.checkdate": "date",
	password: password,
	"cmr_cs.passwordCheck": "Veillez entrer votre mot de passe ",
	"cmr_cs.authchequedialog.login.button": "Vérification",
	incorrectPassword: incorrectPassword,
	"edit.title": "Modification du chèque",
	duplicateTable: duplicateTable
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    fetchingCheques: false,
    errorCheques: null,
    fetchedMyCheque: false,
    myCheques: [],
    myChequesPageInfo: {
      totalCount: 0
    },
    authError: null,
    fetchingChequesImport: false,
    errorChequesImport: null,
    fetchedMyChequeImport: false,
    myChequesImport: [],
    myChequesImportPageInfo: {
      totalCount: 0
    },
    submittingMutation: false,
    mutation: {},
    duplicatesCheque: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'CMS_CS_CHECKLIST_REQ':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchingCheques: true,
        fetchedMyCheques: false,
        myCheques: [],
        myChequesPageInfo: {
          totalCount: 0
        },
        errorCheques: null
      });
    case 'CMS_CS_CHECKLIST_RESP':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchingCheques: false,
        fetchedMyCheques: true,
        myCheques: parseData(action.payload.data.chequeimportline),
        myChequesPageInfo: pageInfo(action.payload.data.chequeimportline),
        errorCheques: formatGraphQLError(action.payload)
      });
    case 'CMS_CS_CHECKLIST_ERR':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchedMyCheques: false,
        errorCheques: formatServerError(action.payload)
      });
    case 'CMS_CS_CHECKIMPORT_REQ':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchingChequesImport: true,
        fetchedMyChequesImport: false,
        myChequesImport: [],
        myChequesImportPageInfo: {
          totalCount: 0
        },
        errorChequesImport: null
      });
    case 'CMS_CS_CHECKIMPORT_RESP':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchingChequesImport: false,
        fetchedMyChequesImport: true,
        myChequesImport: parseData(action.payload.data.chequeimport),
        myChequesImportPageInfo: pageInfo(action.payload.data.chequeimport),
        errorChequesImport: formatGraphQLError(action.payload)
      });
    case 'CMS_CS_CHECKIMPORT_ERR':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        fetchedMyChequesImport: false,
        errorChequesImport: formatServerError(action.payload)
      });
    // AUTH
    case "CORE_AUTH_LOGIN_RESP":
      {
        var _action$payload;
        console.log(' core auth resp ', action.payload);
        if ((_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.errors) {
          return _objectSpread$7(_objectSpread$7({}, state), {}, {
            authError: formatGraphQLError(action.payload)
          });
        }
        return _objectSpread$7(_objectSpread$7({}, state), {}, {
          authError: null
        });
      }
    case "CORE_AUTH_ERR":
      {
        action.payload = _objectSpread$7(_objectSpread$7({}, action.payload), {}, {
          sources: "AuthChequeDialog"
        });
        console.log('core called', action);
        return _objectSpread$7(_objectSpread$7({}, state), {}, {
          user: null,
          authError: formatServerError(action.payload)
        });
      }
    case 'DUPLICATED_CHEQUE':
      return _objectSpread$7(_objectSpread$7({}, state), {}, {
        duplicatesCheque: action.payload
      });
    default:
      return state;
  }
}

var CHEQUE_STATUS = ['New', 'Used', 'Cancel'];
var RIGHT_ADD = 131301;

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CmrCseMainMenu = /*#__PURE__*/function (_Component) {
  _inherits(CmrCseMainMenu, _Component);
  var _super = _createSuper$9(CmrCseMainMenu);
  function CmrCseMainMenu() {
    _classCallCheck(this, CmrCseMainMenu);
    return _super.apply(this, arguments);
  }
  _createClass(CmrCseMainMenu, [{
    key: "render",
    value: function render() {
      var rights = this.props.rights;
      var entries = [];
      if (!!rights.filter(function (r) {
        return r == RIGHT_ADD;
      }).length) {
        entries.push({
          text: formatMessage(this.props.intl, "cheque", "menu.chequeImport"),
          icon: /*#__PURE__*/React.createElement(ImportExport, null),
          route: "/cheque/import"
        });
        entries.push({
          text: formatMessage(this.props.intl, "cheque", "menu.chequeList"),
          icon: /*#__PURE__*/React.createElement(ListAlt, null),
          route: "/cheque/list"
        });
      }
      if (!entries.length) return null;
      return /*#__PURE__*/React.createElement(MainMenuContribution, _extends({}, this.props, {
        header: formatMessage(this.props.intl, "cheque management", "cheque.mainMenu"),
        icon: /*#__PURE__*/React.createElement(ScreenShare, null),
        entries: entries
      }));
    }
  }]);
  return CmrCseMainMenu;
}(Component);
var mapStateToProps$6 = function mapStateToProps(state) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : []
  };
};
var CmrCsModuleMainMenu = withModulesManager(injectIntl(connect(mapStateToProps$6)(CmrCseMainMenu)));

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function getApiUrl() {
  var _process$env$REACT_AP;
  var _baseApiUrl = (_process$env$REACT_AP = process.env.REACT_APP_API_URL) !== null && _process$env$REACT_AP !== void 0 ? _process$env$REACT_AP : "/api";
  if (_baseApiUrl.indexOf("/") !== 0) {
    _baseApiUrl = "/".concat(_baseApiUrl);
  }
  return _baseApiUrl;
}
var baseApiUrl = getApiUrl();
function fetchCheques(mm, filters) {
  var payload = formatPageQueryWithCount("chequeimportline", filters, ["idChequeImportLine", "chequeImportLineCode", "chequeImportLineDate", "chequeImportLineStatus"]);
  return graphql(payload, 'CMS_CS_CHECKLIST');
}
function fetchChequeSummaries(mm, filters) {
  var projections = ["idChequeImportLine", "chequeImportLineCode", "chequeImportLineDate", "chequeImportLineStatus"];
  var payload = formatPageQueryWithCount("chequeimportline", filters, projections);
  return graphql(payload, "CMS_CS_CHECKLIST");
}
function fetchChequesImport() {
  var payload = formatPageQueryWithCount("chequeimport", null, ["idChequeImport", "importDate", "storedFile"]);
  return graphql(payload, 'CMS_CS_CHECKIMPORT');
}
function updateChequeStatus(mm, chequeStatus, clientMutationLabel, idChequeImportLine, chequeImportLineStatus) {
  var mutation = formatMutation("updateChequeStatus", formatChequeStatusGQL(mm, chequeStatus), clientMutationLabel, idChequeImportLine, chequeImportLineStatus);
  var requestedDateTime = new Date();
  chequeStatus.clientMutationId = mutation.clientMutationId;
  return graphql(mutation.payload, ["CMS_CS_CHECKIMPORT_REQ", "CMS_CS_UPDATE_CHECKIMPORT_RESP", "CMS_CS_CHECKIMPORT_ERR"], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    idChequeImportLine: idChequeImportLine,
    requestedDateTime: requestedDateTime
  });
}
function formatChequeStatusGQL(mm, chequeStatus) {
  return "\n      ".concat(!!chequeStatus.chequeImportLineStatus ? "chequeImportLineStatus: \"".concat(chequeStatus.chequeImportLineStatus, "\"") : "", "\n      ").concat(!!chequeStatus.idChequeImportLine ? "idChequeImportLine: ".concat(chequeStatus.idChequeImportLine) : "", "\n    ");
}
function getCsrfToken() {
  var _csrfCookie$split$;
  var CSRF_TOKEN_NAME = 'csrftoken';
  var CSRF_NOT_FOUND = null;
  var cookies = document.cookie;
  var cookieArray = cookies.split('; ');
  var csrfCookie = cookieArray.find(function (cookie) {
    return cookie.startsWith(CSRF_TOKEN_NAME);
  });
  return (_csrfCookie$split$ = csrfCookie === null || csrfCookie === void 0 ? void 0 : csrfCookie.split('=')[1]) !== null && _csrfCookie$split$ !== void 0 ? _csrfCookie$split$ : CSRF_NOT_FOUND;
}
function fetch$1(config) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(dispatch) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", dispatch(_defineProperty({}, RSAA, _objectSpread$6(_objectSpread$6({}, config), {}, {
              headers: _objectSpread$6({
                "Content-Type": "application/json"
              }, config.headers)
            }))));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}
function initialize() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(dispatch) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dispatch(login());
          case 2:
            return _context2.abrupt("return", dispatch({
              type: "CORE_INITIALIZED"
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}
function loadUser() {
  return fetch$1({
    endpoint: "".concat(baseApiUrl, "/core/users/current_user/"),
    method: "GET",
    types: ["CORE_USERS_CURRENT_USER_REQ", "CORE_USERS_CURRENT_USER_RESP", "CORE_USERS_CURRENT_USER_ERR"]
  });
}
function login(credentials) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(dispatch) {
      var mutation, csrfToken, _response$payload, _response$payload$err, _action$payload$respo, _action$payload, _action$payload$respo2, response, errorMessage, action;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!credentials) {
              _context3.next = 21;
              break;
            }
            mutation = "mutation authenticate($username: String!, $password: String!) {\n                tokenAuth(username: $username, password: $password) {\n                    refreshExpiresIn\n                }\n            }";
            csrfToken = getCsrfToken();
            _context3.prev = 3;
            _context3.next = 6;
            return dispatch(graphqlMutation(mutation, credentials, ["CORE_AUTH_LOGIN_REQ", "CORE_AUTH_LOGIN_RESP", "CORE_AUTH_ERR"], {}, false, {
              "X-CSRFToken": csrfToken
            }));
          case 6:
            response = _context3.sent;
            if (!(((_response$payload = response.payload) === null || _response$payload === void 0 ? void 0 : (_response$payload$err = _response$payload.errors) === null || _response$payload$err === void 0 ? void 0 : _response$payload$err.length) > 0)) {
              _context3.next = 11;
              break;
            }
            errorMessage = response.payload.errors[0].message;
            dispatch(authError({
              message: errorMessage,
              name: "ApiError",
              status: 401
            }, source));
            return _context3.abrupt("return", {
              loginStatus: "CORE_AUTH_ERR",
              message: "Unauthorized"
            });
          case 11:
            _context3.next = 13;
            return dispatch(loadUser());
          case 13:
            action = _context3.sent;
            return _context3.abrupt("return", {
              loginStatus: action.type,
              message: (_action$payload$respo = action === null || action === void 0 ? void 0 : (_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : (_action$payload$respo2 = _action$payload.response) === null || _action$payload$respo2 === void 0 ? void 0 : _action$payload$respo2.detail) !== null && _action$payload$respo !== void 0 ? _action$payload$respo : ""
            });
          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](3);
            dispatch(authError({
              message: _context3.t0.message,
              name: "ApiError",
              status: 401
            }, source));
            return _context3.abrupt("return", {
              loginStatus: "CORE_AUTH_ERR",
              message: "Unauthorized"
            });
          case 21:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[3, 17]]);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
}
function authError(error) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: "CORE_AUTH_ERR",
    payload: _objectSpread$6(_objectSpread$6({}, error), {}, {
      source: source
    })
  };
}
function transformChequeData(data) {
  return data.map(function (item) {
    return {
      chequeImportLineCode: item[1],
      chequeImportLineDate: item[3],
      chequeImportLineStatus: item[2]
    };
  });
}
var fetchDuplicatesCheque = function fetchDuplicatesCheque(duplicatesCheque) {
  return {
    type: 'DUPLICATED_CHEQUE',
    payload: transformChequeData(duplicatesCheque.updatedCheques)
  };
};

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CHEQUE_FILTER_CONTRIBUTION_KEY = "cheque.Filter";
var styles$8 = function styles(theme) {
  return {
    dialogTitle: theme.dialog.title,
    dialogContent: theme.dialog.content,
    form: {
      padding: 0
    },
    item: {
      padding: theme.spacing(1)
    },
    paperDivider: theme.paper.divider
  };
};
var Details = /*#__PURE__*/function (_Component) {
  _inherits(Details, _Component);
  var _super = _createSuper$8(Details);
  function Details() {
    var _this;
    _classCallCheck(this, Details);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "debouncedOnChangeFilter", _debounce(_this.props.onChangeFilters, _this.props.modulesManager.getConf("fe-claim", "debounceTime", 800)));
    return _this;
  }
  _createClass(Details, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props;
        _this$props.intl;
        var classes = _this$props.classes,
        filters = _this$props.filters,
        onChangeFilters = _this$props.onChangeFilters,
        _this$props$filterPan = _this$props.filterPaneContributionsKey,
        filterPaneContributionsKey = _this$props$filterPan === void 0 ? null : _this$props$filterPan,
        FilterExt = _this$props.FilterExt;
      return /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: classes.form
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 6,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "cmr_cs.ChequeStatusPicker",
        name: "chequeStatus",
        value: filters["chequeStatus"] && filters["chequeStatus"]["value"],
        onChange: function onChange(v, s) {
          return onChangeFilters([{
            id: "chequeStatus",
            value: v,
            filter: !!v ? "chequeImportLineStatus: \"".concat(v, "\"") : null
          }]);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 6,
        className: classes.item
      }, /*#__PURE__*/React.createElement(TextInput, {
        module: "cmr_cs",
        label: "cmr_cs.chequeNo",
        name: "chequeNo",
        value: filters["chequeNo"] && filters["chequeNo"]["value"],
        onChange: function onChange(v) {
          return _this2.debouncedOnChangeFilter([{
            id: "chequeNo",
            value: v,
            filter: !!v ? "chequeImportLineCode_Icontains: \"".concat(v, "\"") : null
          }]);
        }
      })), /*#__PURE__*/React.createElement(Contributions, {
        filters: filters,
        onChangeFilters: onChangeFilters,
        contributionKey: CHEQUE_FILTER_CONTRIBUTION_KEY
      }), !!filterPaneContributionsKey && /*#__PURE__*/React.createElement(Contributions, {
        filters: filters,
        onChangeFilters: onChangeFilters,
        contributionKey: filterPaneContributionsKey
      }), !!FilterExt && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        className: classes.paperDivider
      }, /*#__PURE__*/React.createElement(Divider, null)), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/React.createElement(FilterExt, {
        onChangeFilters: onChangeFilters
      }))));
    }
  }]);
  return Details;
}(Component);
var ChequeFilter = /*#__PURE__*/function (_Component2) {
  _inherits(ChequeFilter, _Component2);
  var _super2 = _createSuper$8(ChequeFilter);
  function ChequeFilter() {
    _classCallCheck(this, ChequeFilter);
    return _super2.apply(this, arguments);
  }
  _createClass(ChequeFilter, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return /*#__PURE__*/React.createElement("form", {
        className: classes.container,
        noValidate: true,
        autoComplete: "off"
      }, /*#__PURE__*/React.createElement(Details, this.props));
    }
  }]);
  return ChequeFilter;
}(Component);
var ChequeFilter$1 = withModulesManager(injectIntl(withTheme(withStyles(styles$8)(ChequeFilter))));

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$7 = function styles(theme) {
  return {};
};
var ChequeSearcher = /*#__PURE__*/function (_Component) {
  _inherits(ChequeSearcher, _Component);
  var _super = _createSuper$7(ChequeSearcher);
  function ChequeSearcher(props) {
    var _this;
    _classCallCheck(this, ChequeSearcher);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "state", {
      random: null
    });
    _defineProperty(_assertThisInitialized(_this), "fetch", function (prms) {
      _this.props.fetchChequeSummaries(_this.props.modulesManager, prms, !!_this.claimAttachments);
    });
    _defineProperty(_assertThisInitialized(_this), "rowIdentifier", function (r) {
      return r.uuid;
    });
    _defineProperty(_assertThisInitialized(_this), "filtersToQueryParams", function (state) {
      var prms = Object.keys(state.filters).filter(function (f) {
        return !!state.filters[f]["filter"];
      }).map(function (f) {
        return state.filters[f]["filter"];
      });
      var forced = _this.forcedFilters();
      var random = state.filters["random"];
      if (forced.length > 0) {
        prms.push.apply(prms, _toConsumableArray(forced.map(function (f) {
          return f.filter;
        })));
      }
      if (!!random) {
        prms.push("first: ".concat(random.value));
        prms.push("orderBy: [\"dateClaimed\", \"?\"]");
        _this.setState({
          random: random
        });
      } else {
        //prms.push(`orderBy: ["${state.orderBy}"]`);
        _this.setState({
          random: null
        });
      }
      if (!forced.length && !random) {
        prms.push("first: ".concat(state.pageSize));
        if (!!state.afterCursor) {
          prms.push("after: \"".concat(state.afterCursor, "\""));
        }
        if (!!state.beforeCursor) {
          prms.push("before: \"".concat(state.beforeCursor, "\""));
        }
      }
      return prms;
    });
    _defineProperty(_assertThisInitialized(_this), "headers", function () {
      var result = ["cmr_cs.checknum", "cmr_cs.checkstate", "cmr_cs.checkdate"];
      return result;
    });
    _defineProperty(_assertThisInitialized(_this), "sorts", function () {
      var result = [["chequeImportLineCode", true], ["chequeImportLineStatus", true], ["chequeImportLineDate", false]];
      return result;
    });
    _defineProperty(_assertThisInitialized(_this), "itemFormatters", function () {
      var result = [function (c) {
        return c.chequeImportLineCode;
      }, function (c) {
        return formatMessage(_this.props.intl, "cmr_cs", c.chequeImportLineStatus);
      }, function (c) {
        return formatDateFromISO(_this.props.modulesManager, _this.props.intl, c.chequeImportLineDate);
      }];
      return result;
    });
    _defineProperty(_assertThisInitialized(_this), "rowLocked", function (selection, claim) {
      return !!claim.clientMutationId;
    });
    _defineProperty(_assertThisInitialized(_this), "rowHighlighted", function (selection, claim) {
      return !!_this.highlightAmount && claim.claimed > _this.highlightAmount;
    });
    _defineProperty(_assertThisInitialized(_this), "rowHighlightedAlt", function (selection, claim) {
      return !!_this.highlightAltInsurees && selection.filter(function (c) {
        return _.isEqual(c.insuree, claim.insuree);
      }).length && !selection.includes(claim);
    });
    _this.rowsPerPageOptions = props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.rowsPerPageOptions", [10, 20, 50, 100]);
    _this.defaultPageSize = props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.defaultPageSize", 10);
    _this.highlightAmount = parseInt(props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.highlightAmount", 0));
    return _this;
  }
  _createClass(ChequeSearcher, [{
    key: "forcedFilters",
    value: function forcedFilters() {
      return !this.props.forcedFilters ? [] : _toConsumableArray(this.props.forcedFilters.filter(function (f) {
        return f.id !== "random";
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        intl = _this$props.intl,
        myCheques = _this$props.myCheques,
        myChequesPageInfo = _this$props.myChequesPageInfo,
        fetchingCheques = _this$props.fetchingCheques,
        fetchedMyCheques = _this$props.fetchedMyCheques,
        errorCheques = _this$props.errorCheques,
        FilterExt = _this$props.FilterExt,
        filterPaneContributionsKey = _this$props.filterPaneContributionsKey,
        actions = _this$props.actions,
        defaultFilters = _this$props.defaultFilters,
        cacheFiltersKey = _this$props.cacheFiltersKey,
        onDoubleClick = _this$props.onDoubleClick;
        _this$props.cheques;
        var duplicatesCheque = _this$props.duplicatesCheque,
        duplicate = _this$props.duplicate;
        _this$props.actionsContributionKey;
      var count = !!this.state.random && this.state.random.value;
      if (!count) {
        count = myChequesPageInfo.totalCount;
      }
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Searcher, {
        module: "claim",
        defaultFilters: defaultFilters,
        cacheFiltersKey: cacheFiltersKey,
        FilterPane: defaultFilters == "none" ? null : ChequeFilter$1,
        FilterExt: FilterExt,
        filterPaneContributionsKey: filterPaneContributionsKey,
        items: !!duplicate ? duplicatesCheque : myCheques,
        defaultOrderBy: "-chequeImportLineDate",
        itemsPageInfo: myChequesPageInfo,
        fetchingItems: fetchingCheques,
        fetchedItems: fetchedMyCheques,
        errorItems: errorCheques,
        tableTitle: !!duplicate ? formatMessageWithValues(intl, "cmr_cs", "duplicateTableList", {
          count: count
        }) : formatMessageWithValues(intl, "cmr_cs", "table", {
          count: count
        }),
        rowsPerPageOptions: this.rowsPerPageOptions,
        defaultPageSize: this.defaultPageSize,
        fetch: this.fetch,
        rowIdentifier: this.rowIdentifier,
        filtersToQueryParams: this.filtersToQueryParams,
        rowLocked: this.rowLocked,
        rowHighlighted: this.rowHighlighted,
        rowHighlightedAlt: this.rowHighlightedAlt,
        headers: this.headers,
        itemFormatters: this.itemFormatters,
        actions: actions,
        sorts: this.sorts,
        onDoubleClick: onDoubleClick
      }));
    }
  }]);
  return ChequeSearcher;
}(Component);
var mapStateToProps$5 = function mapStateToProps(state) {
  return {
    fetchingCheques: state.cmr_cs.fetchingCheques,
    errorCheques: state.cmr_cs.errorCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    myCheques: state.cmr_cs.myCheques,
    duplicatesCheque: state.cmr_cs.duplicatesCheque,
    myChequesPageInfo: state.cmr_cs.myChequesPageInfo
  };
};
var mapDispatchToProps$5 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchChequeSummaries: fetchChequeSummaries
  }, dispatch);
};
var ChequeSearcher$1 = withModulesManager(connect(mapStateToProps$5, mapDispatchToProps$5)(injectIntl(withTheme(withStyles(styles$7)(ChequeSearcher)))));

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CHEQUE_FILTER_KEY = "cheque.Filter";
var styles$6 = function styles(theme) {
  return {
    page: theme.page
  };
};
var ChequeListPage = /*#__PURE__*/function (_Component) {
  _inherits(ChequeListPage, _Component);
  var _super = _createSuper$6(ChequeListPage);
  function ChequeListPage(props) {
    var _this;
    _classCallCheck(this, ChequeListPage);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "query", function () {
      var prms = [];
      prms.push("first: ".concat(_this.state.pageSize));
      if (!!_this.state.afterCursor) {
        prms.push("after: \"".concat(_this.state.afterCursor, "\""));
      }
      if (!!_this.state.beforeCursor) {
        prms.push("before: \"".concat(_this.state.beforeCursor, "\""));
      }
      _this.props.fetchCheques(prms);
    });
    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (i) {
      historyPush(_this.props.modulesManager, _this.props.history, "cmr_cs.ChequeStatus", [i.chequeImportLineCode], false);
    });
    _defineProperty(_assertThisInitialized(_this), "canSubmitAll", function () {
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "handleDuplicateNavigation", function () {
      historyPush(_this.props.modulesManager, _this.props.history, "cmr_cs.DuplicateChequeListPage", [], null);
    });
    _this.state = {
      defaultFilters: props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.defaultFilters", {
        // "chequeStatus": {
        //   "value": "New",
        //    "filter": "chequeImportLineStatus: \"New\"",
        // },
      })
    };
    return _this;
  }
  _createClass(ChequeListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.query();
      var storedData = localStorage.getItem('duplicatesCheque');
      if (storedData) {
        var parsedData = JSON.parse(storedData);
        this.props.fetchDuplicatesCheque(parsedData);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props;
        _this$props.intl;
        var classes = _this$props.classes;
        _this$props.fetchingCheques;
        _this$props.errorCheques;
        _this$props.fetchedMyCheques;
        _this$props.myCheques;
        _this$props.myChequesPageInfo;
      var actions = [{
        action: this.handleDuplicateNavigation,
        label: formatMessage(this.props.intl, "cmr_cs", "duplicateTable"),
        enabled: this.canSubmitAll
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(Helmet, {
        title: formatMessage(this.props.intl, "cmr_cs", "cmr_cs.ChequeListHeader")
      }), /*#__PURE__*/React.createElement(ChequeSearcher$1, {
        defaultFilters: this.state.defaultFilters,
        actions: actions,
        cacheFiltersKey: "claimReviewsPageFiltersCache",
        filterPaneContributionsKey: CHEQUE_FILTER_KEY,
        onDoubleClick: this.onDoubleClick
      }));
    }
  }]);
  return ChequeListPage;
}(Component);
var mapStateToProps$4 = function mapStateToProps(state, props) {
  return {
    fetchingCheques: state.cmr_cs.fetchingCheques,
    errorCheques: state.cmr_cs.errorCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    myCheques: state.cmr_cs.myCheques,
    myChequesPageInfo: state.cmr_cs.myChequesPageInfo,
    duplicatesCheque: state.cmr_cs.duplicatesCheque
  };
};
var mapDispatchToProps$4 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCheques: fetchCheques,
    fetchDuplicatesCheque: fetchDuplicatesCheque
  }, dispatch);
};
var ChequeListPage$1 = injectIntl(withTheme(withStyles(styles$6)(connect(mapStateToProps$4, mapDispatchToProps$4)(ChequeListPage))));

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CREATECHEQUE_URL = "".concat(baseApiUrl$1, "/cs/importfile");
var styles$5 = function styles(theme) {
  return {
    page: theme.page
  };
};
var file = '';
function handleChange(event) {
  file = event.target.files[0];
}
var ChequeImportPage = /*#__PURE__*/function (_Component) {
  _inherits(ChequeImportPage, _Component);
  var _super = _createSuper$5(ChequeImportPage);
  function ChequeImportPage(props) {
    var _this;
    _classCallCheck(this, ChequeImportPage);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "query", function () {
      var prms = [];
      prms.push("first: ".concat(_this.state.pageSize));
      if (!!_this.state.afterCursor) {
        prms.push("after: \"".concat(_this.state.afterCursor, "\""));
      }
      if (!!_this.state.beforeCursor) {
        prms.push("before: \"".concat(_this.state.beforeCursor, "\""));
      }
      prms.push("orderBy: [\"code\"]");
      _this.props.fetchChequesImport(prms);
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        showModal: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (event) {
      event.preventDefault();
      var formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      try {
        _this.setState({
          showModal: true
        });
        _this.setState({
          contentModal: "cmr_cs.currentlyImporting"
        });
        var reponseUpload = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  fetch("".concat(CREATECHEQUE_URL, "/upload"), {
                    headers: apiHeaders,
                    body: formData,
                    method: "POST",
                    credentials: "same-origin"
                  }).then(function (response) {
                    if (response.status >= 400) {
                      throw new Error("Unknown error");
                    }
                    response.json().then(function (reponseJson) {
                      _this.setState({
                        uploadState: reponseJson
                      });
                      _this.props.fetchDuplicatesCheque(reponseJson);
                      localStorage.setItem('duplicatesCheque', JSON.stringify(reponseJson));
                      if (reponseJson.success == true) {
                        _this.setState({
                          showModal: true
                        });
                        _this.setState({
                          contentModal: "cmr_cs.checkImported"
                        });
                      }
                    });
                  });
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function reponseUpload() {
            return _ref.apply(this, arguments);
          };
        }();
        reponseUpload();
      } catch (error) {
        console.error(error);
        console.log(error);
      }
    });
    _this.state = {
      page: 0,
      pageSize: 20,
      count: 20,
      afterCursor: null,
      beforeCursor: null,
      uploadState: {},
      showModal: false,
      contentModal: "cmr_cs.currentlyImporting"
    };
    return _this;
  }
  _createClass(ChequeImportPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.query();
      var storedData = localStorage.getItem('duplicatesCheque');
      if (storedData) {
        var parsedData = JSON.parse(storedData);
        this.props.fetchDuplicatesCheque(parsedData);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        intl = _this$props.intl,
        classes = _this$props.classes,
        fetchingChequesImport = _this$props.fetchingChequesImport,
        errorChequesImport = _this$props.errorChequesImport;
        _this$props.fetchedMyChequesImport;
        var myChequesImport = _this$props.myChequesImport,
        myChequesImportPageInfo = _this$props.myChequesImportPageInfo,
        onChangePage = _this$props.onChangePage,
        onChangeRowsPerPage = _this$props.onChangeRowsPerPage;
      var headers = ["cmr_cs.importId", "cmr_cs.importDate", "cmr_cs.storedFile"];
      var itemFormatters = [function (e) {
        return e.idChequeImport;
      }, function (e) {
        return e.importDate;
      }, function (e) {
        return e.storedFile;
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ProgressOrError, {
        progress: fetchingChequesImport,
        error: errorChequesImport
      }), /*#__PURE__*/React.createElement("h1", null, formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        spacing: 2,
        direction: "column"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h6"
      }, formatMessageWithValues(intl, "CmrCS", "cmr_cs.importChecks"))), /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement("form", {
        onSubmit: function onSubmit(event) {
          return _this2.handleSubmit(event);
        }
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        spacing: 1,
        direction: "column"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Input, {
        required: true,
        id: "import-button",
        inputProps: {
          accept: ".csv, application/csv, text/csv"
        },
        type: "file",
        onChange: handleChange
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "contained",
        color: "primary",
        type: "submit"
      }, formatMessageWithValues(intl, "CmrCS", "cmr_cs.uploadFile"))))))), /*#__PURE__*/React.createElement(Dialog, {
        open: this.state.showModal,
        onClose: this.handleClose
      }, /*#__PURE__*/React.createElement(DialogTitle, null, formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, formatMessageWithValues(intl, "CmrCS", this.state.contentModal)))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Table, {
        module: "cmr_cs",
        header: formatMessageWithValues(intl, "CmrCS", "cmr_cs.tableImport", {
          count: myChequesImportPageInfo.totalCount
        }),
        headers: headers,
        itemFormatters: itemFormatters,
        items: myChequesImport,
        withPagination: true,
        page: this.state.page,
        pageSize: this.state.pageSize,
        count: this.state.count,
        onChangePage: onChangePage,
        onChangeRowsPerPage: onChangeRowsPerPage,
        rowsPerPageOptions: this.rowsPerPageOptions
      }));
    }
  }]);
  return ChequeImportPage;
}(Component);
var mapStateToProps$3 = function mapStateToProps(state) {
  return {
    fetchingChequesImport: state.cmr_cs.fetchingChequesImport,
    errorChequesImport: state.cmr_cs.errorChequesImport,
    fetchedMyChequesImport: state.cmr_cs.fetchedMyChequesImport,
    myChequesImport: state.cmr_cs.myChequesImport,
    myChequesImportPageInfo: state.cmr_cs.myChequesImportPageInfo,
    duplicatesCheque: state.cmr_cs.duplicatesCheque
  };
};
var mapDispatchToProps$3 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchChequesImport: fetchChequesImport,
    fetchDuplicatesCheque: fetchDuplicatesCheque
  }, dispatch);
};
var ChequeImportPage$1 = injectIntl(withTheme(withStyles(styles$5)(connect(mapStateToProps$3, mapDispatchToProps$3)(ChequeImportPage))));

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ChequeStatusPicker = /*#__PURE__*/function (_Component) {
  _inherits(ChequeStatusPicker, _Component);
  var _super = _createSuper$4(ChequeStatusPicker);
  function ChequeStatusPicker() {
    _classCallCheck(this, ChequeStatusPicker);
    return _super.apply(this, arguments);
  }
  _createClass(ChequeStatusPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConstantBasedPicker, _extends({
        module: "cmr_cs",
        label: "cmr_cs-list",
        constants: CHEQUE_STATUS
      }, this.props));
    }
  }]);
  return ChequeStatusPicker;
}(Component);

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ChequeSanteActivitiesReport = function ChequeSanteActivitiesReport(props) {
  var values = props.values,
    setValues = props.setValues;
  var userHealthFacility = useSelector(function (state) {
    return state.loc.userHealthFacilityFullPath;
  });
  if (userHealthFacility !== null && userHealthFacility !== void 0 && userHealthFacility.code) {
    values.hflocation = userHealthFacility;
  }
  console.log(values);
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "location.HealthFacilityPicker",
    onChange: function onChange(hflocation) {
      return setValues(_objectSpread$5(_objectSpread$5({}, values), {}, {
        hflocation: hflocation
      }));
    },
    value: userHealthFacility !== null && userHealthFacility !== void 0 && userHealthFacility.code ? userHealthFacility.code : values.hflocation
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateFrom,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateFrom",
    onChange: function onChange(dateFrom) {
      return setValues(_objectSpread$5(_objectSpread$5({}, values), {}, {
        dateFrom: dateFrom
      }));
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateTo,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateTo",
    onChange: function onChange(dateTo) {
      return setValues(_objectSpread$5(_objectSpread$5({}, values), {}, {
        dateTo: dateTo
      }));
    }
  })));
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ChequeSanteActivitiesFullLocationReport = function ChequeSanteActivitiesFullLocationReport(props) {
  var values = props.values,
    setValues = props.setValues;
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location0) {
      setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        location0: location0
      }));
    },
    value: values.location0,
    locationLevel: 0
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location1) {
      return setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        location1: location1
      }));
    },
    value: values.location1,
    locationLevel: 1
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location2) {
      return setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        location2: location2
      }));
    },
    value: values.location2,
    locationLevel: 2
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "location.HealthFacilityPicker",
    onChange: function onChange(hflocation) {
      return setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        hflocation: hflocation
      }));
    },
    value: values.hflocation
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateFrom,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateFrom",
    onChange: function onChange(dateFrom) {
      return setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        dateFrom: dateFrom
      }));
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateTo,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateTo",
    onChange: function onChange(dateTo) {
      return setValues(_objectSpread$4(_objectSpread$4({}, values), {}, {
        dateTo: dateTo
      }));
    }
  })));
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$4 = function styles(theme) {
  return {
    paper: theme.paper.paper,
    tableTitle: theme.table.title,
    item: theme.paper.item,
    fullHeight: {
      height: "100%"
    }
  };
};
var ChequeStatusMasterPanel = /*#__PURE__*/function (_FormPanel) {
  _inherits(ChequeStatusMasterPanel, _FormPanel);
  var _super = _createSuper$3(ChequeStatusMasterPanel);
  function ChequeStatusMasterPanel() {
    var _this;
    _classCallCheck(this, ChequeStatusMasterPanel);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "updateAttribute", function (attr, v) {
      var edited = _objectSpread$3({}, _this.props.edited);
      edited[attr] = v;
      _this.props.onEditedChanged(edited);
    });
    return _this;
  }
  _createClass(ChequeStatusMasterPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        intl = _this$props.intl,
        classes = _this$props.classes,
        edited = _this$props.edited;
        _this$props.title;
        _this$props.titleParams;
        _this$props.actions;
        _this$props.onEditedChanged;
        _this$props.chequeStatus;
        var readOnly = _this$props.readOnly;
      console.log("edited", readOnly);
      return /*#__PURE__*/React.createElement(Grid, {
        container: true,
        direction: "row"
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: classes.item
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        className: classes.item
      }, /*#__PURE__*/React.createElement(NumberInput, {
        module: "cmr_cs",
        label: formatMessage(intl, "cmr_cs", "chequeStatus.checknum"),
        required: true,
        readOnly: true,
        value: !!edited && !!edited.chequeImportLineCode ? edited.chequeImportLineCode : "",
        onChange: function onChange(v) {
          return _this2.updateAttribute("checknum", v);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "cmr_cs.ChequeStatusPicker",
        value: !!edited && !!edited.chequeImportLineStatus ? edited.chequeImportLineStatus : "",
        readOnly: readOnly,
        required: true,
        onChange: function onChange(v) {
          return _this2.updateAttribute("chequeImportLineStatus", v);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "core.DatePicker",
        value: !!edited && !!edited.chequeImportLineDate ? edited.chequeImportLineDate : "",
        module: "cmr_cs",
        label: formatMessage(intl, "cmr_cs", "cmr_cs.checkdate"),
        onChange: function onChange(v) {
          return _this2.updateAttribute("checkdate", v);
        },
        readOnly: true,
        required: true
        // maxDate={edited.dateTo < edited.dateClaimed ? edited.dateTo : edited.dateClaimed}
      }))));
    }
  }]);
  return ChequeStatusMasterPanel;
}(FormPanel);
var ChequeStatusMasterPanel$1 = withModulesManager(withTheme(withStyles(styles$4)(ChequeStatusMasterPanel)));

var useAuthentication = function useAuthentication() {
  var dispatch = useDispatch();
  var user = useSelector(function (state) {
    return state.core.user;
  });
  var isInitialized = useSelector(function (state) {
    return state.core.isInitialized;
  });
  return {
    user: user,
    isAuthenticated: Boolean(user),
    initialize: function initialize$1() {
      return dispatch(initialize());
    },
    isInitialized: isInitialized,
    login: function login$1(credentials) {
      return dispatch(login(credentials));
    }
  };
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var styles$3 = function styles(theme) {
  return {
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton
  };
};
var AuthChequeDialog = function AuthChequeDialog(_ref) {
  var classes = _ref.classes,
    cheque = _ref.cheque,
    onCancel = _ref.onCancel,
    onConfirm = _ref.onConfirm,
    intl = _ref.intl,
    user = _ref.user;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isAuthenticating = _useState2[0],
    setIsAuthenticating = _useState2[1];
  var _useState3 = useState({
      username: user === null || user === void 0 ? void 0 : user.username
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    credentials = _useState4[0],
    setCredentials = _useState4[1];
  var _useState5 = useState({
      loginStatus: "",
      message: null
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    serverResponse = _useState6[0],
    setServerResponse = _useState6[1];
  var requestSent = useRef(false);
  var auth = useAuthentication();
  var handleLoginError = function handleLoginError(errorMessage) {
    setServerResponse({
      loginStatus: "CORE_AUTH_ERR",
      message: errorMessage
    });
    setIsAuthenticating(false);
  };
  var onSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
      var _response$payload, _response$payload$err, response, loginStatus;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            setIsAuthenticating(true);
            _context.prev = 2;
            _context.next = 5;
            return auth.login(credentials, "AuthChequeDialog");
          case 5:
            response = _context.sent;
            if (!((_response$payload = response.payload) !== null && _response$payload !== void 0 && (_response$payload$err = _response$payload.errors) !== null && _response$payload$err !== void 0 && _response$payload$err.length)) {
              _context.next = 9;
              break;
            }
            handleLoginError(formatMessage(intl, "cmr_cs", "incorrectPassword"));
            return _context.abrupt("return");
          case 9:
            loginStatus = response.loginStatus, response.message;
            setServerResponse({
              loginStatus: loginStatus,
              message: ""
            });
            if (loginStatus === "CORE_AUTH_ERR") {
              setIsAuthenticating(false);
            } else {
              onConfirm();
            }
            _context.next = 17;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            handleLoginError(formatMessage(intl, "cmr_cs", "incorrectPassword"));
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 14]]);
    }));
    return function onSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  useEffect(function () {
    requestSent.current = false;
  }, [cheque]);
  return /*#__PURE__*/React.createElement(Dialog, {
    open: !!cheque,
    onClose: onCancel
  }, /*#__PURE__*/React.createElement(DialogTitle, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "cmr_cs",
    id: "passwordCheck"
  })), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    required: true,
    readOnly: isAuthenticating,
    type: "password",
    label: formatMessage(intl, "cmr_cs", "password"),
    fullWidth: true,
    inputProps: {
      autoComplete: "new-password"
    },
    onChange: function onChange(password) {
      return setCredentials(_objectSpread$2(_objectSpread$2({}, credentials), {}, {
        password: password
      }));
    }
  })), (serverResponse === null || serverResponse === void 0 ? void 0 : serverResponse.message) && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Box, {
    color: "error.main"
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "error"
  }, serverResponse.message))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: isAuthenticating || !(credentials.username && credentials.password),
    color: "primary",
    variant: "contained"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "cmr_cs",
    id: "authchequedialog.login.button"
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: onCancel,
    className: classes.secondaryButton,
    disabled: isAuthenticating
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "core",
    id: "cancel"
  }))))));
};
var AuthChequeDialog$1 = injectIntl(withTheme(withStyles(styles$3)(AuthChequeDialog)));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$2 = function styles(theme) {
  return {
    lockedPage: theme.page.locked,
    fullHeight: {
      height: "100%"
    }
  };
};
var ChequeForm = /*#__PURE__*/function (_Component) {
  _inherits(ChequeForm, _Component);
  var _super = _createSuper$2(ChequeForm);
  function ChequeForm() {
    var _this;
    _classCallCheck(this, ChequeForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      lockNew: false,
      chequeStatus: _this._newChequeStatus(),
      newChequeStatus: true
    });
    _defineProperty(_assertThisInitialized(_this), "back", function (e) {
      var _this$props = _this.props,
        modulesManager = _this$props.modulesManager,
        history = _this$props.history;
      historyPush(modulesManager, history, "cmr_cs.ChequeList");
    });
    _defineProperty(_assertThisInitialized(_this), "_add", function () {
      _this.setState(function (state) {
        return {
          chequeStatus: _this._newChequeStatus(),
          newChequeStatus: true,
          lockNew: false
        };
      }, function (e) {
        _this.props.add();
        _this.forceUpdate();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "reload", function () {
      _this.props.fetchChequeStatus(_this.props.modulesManager, _this.state.chequeImportLineCode);
    });
    _defineProperty(_assertThisInitialized(_this), "canSave", function () {
      if (!_this.state.chequeStatus.chequeImportLineCode) return false;
      if (!_this.state.chequeStatus.chequeImportLineStatus) return false;
      if (!_this.state.chequeStatus.chequeImportLineDate) return false;
      if (_this.state.cheque == null) return true;
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "_Authvalidator", function () {
      _this.setState({
        cheque: true,
        readOnlyState: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_save", function (chequeStatus) {
      _this.setState({
        lockNew: !_this.state.chequeStatus.chequeImportLineCode
      }, function () {
        if (_this.canSave()) {
          _this.props.save(_this.state.chequeStatus);
        }
      });
      _this.setState({
        cheque: null
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onEditedChanged", function (chequeStatus) {
      _this.setState({
        chequeStatus: chequeStatus,
        newChequeStatus: false
      });
    });
    return _this;
  }
  _createClass(ChequeForm, [{
    key: "_newChequeStatus",
    value: function _newChequeStatus() {
      var chequeStatus = {};
      chequeStatus.jsonExt = {};
      return chequeStatus;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (!!this.props.cheque_code) {
        this.setState(function (state, props) {
          return {
            cheque_code: _this2.props.cheque_code
          };
        }, function (e) {
          return _this2.props.fetchChequeSummaries(_this2.props.modulesManager, ["chequeImportLineCode:\"".concat(_this2.props.cheque_code, "\"")]);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.fetchedChequeStatus !== this.props.fetchedChequeStatus && this.props.fetchedChequeStatus) {
        var chequeStatus = this.props.chequeStatus || {};
        chequeStatus.ext = chequeStatus.jsonExt ? JSON.parse(chequeStatus.jsonExt) : {};
        this.setState({
          chequeStatus: chequeStatus,
          chequeImportLineCode: chequeStatus.chequeImportLineCode,
          lockNew: false,
          newChequeStatus: false
        });
      } else if (prevProps.chequeImportLineCode && !this.props.chequeImportLineCode) {
        this.setState({
          chequeStatus: this._newChequeStatus(),
          newChequeStatus: true,
          lockNew: false,
          chequeImportLineCode: null
        });
      } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
        this.setState(function (state, props) {
          return {
            chequeStatus: _objectSpread$1(_objectSpread$1({}, state.chequeStatus), {}, {
              clientMutationId: props.mutation.clientMutationId
            })
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        intl = _this$props2.intl,
        classes = _this$props2.classes,
        fetchingCheques = _this$props2.fetchingCheques,
        fetchedMyCheques = _this$props2.fetchedMyCheques,
        errorCheques = _this$props2.errorCheques,
        _this$props2$readOnly = _this$props2.readOnly,
        readOnly = _this$props2$readOnly === void 0 ? false : _this$props2$readOnly,
        save = _this$props2.save;
        _this$props2.add;
        var myCheques = _this$props2.myCheques,
        chequeImportLineCode = _this$props2.chequeImportLineCode;
      var _this$state = this.state,
        chequeStatus = _this$state.chequeStatus;
        _this$state.cheque;
        var readOnlyState = _this$state.readOnlyState;
      var runningMutation = !!chequeStatus && !!chequeStatus.clientMutationId;
      var actions = [];
      if (!!chequeImportLineCode) {
        actions.push({
          doIt: function doIt(e) {
            return _this3.reload(chequeImportLineCode);
          },
          icon: /*#__PURE__*/React.createElement(ReplayIcon, null),
          onlyIfDirty: !readOnly
        });
      }
      return /*#__PURE__*/React.createElement("div", {
        className: !!runningMutation ? classes.lockedPage : null
      }, /*#__PURE__*/React.createElement(AuthChequeDialog$1, {
        cheque: this.state.cheque,
        user: this.props.user,
        onConfirm: this._save,
        onCancel: function onCancel(e) {
          return _this3.setState({
            cheque: null,
            lockNew: false,
            readOnlyState: null
          });
        }
      }), /*#__PURE__*/React.createElement(ProgressOrError, {
        progress: fetchingCheques,
        error: errorCheques
      }), (!!fetchedMyCheques && !!chequeStatus && chequeStatus.chequeImportLineCode === chequeStatus || !chequeImportLineCode) && /*#__PURE__*/React.createElement(Form, {
        module: "cmr_cs",
        title: formatMessage(intl, "cmr_cs", "edit.title"),
        edited_id: chequeImportLineCode,
        edited: myCheques[0],
        HeadPanel: ChequeStatusMasterPanel$1,
        chequeStatus: chequeStatus,
        readOnly: readOnlyState,
        onEditedChanged: this.onEditedChanged,
        canSave: this.canSave,
        back: this.back,
        actions: actions,
        reload: (chequeImportLineCode || readOnly) && this.reload,
        save: !!save ? this._Authvalidator : null
      }));
    }
  }]);
  return ChequeForm;
}(Component);
var mapStateToProps$2 = function mapStateToProps(state, props) {
  return {
    chequeStatus: state.cmr_cs.chequeStatus,
    user: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user : [],
    myCheques: state.cmr_cs.myCheques,
    fetchingCheques: state.cmr_cs.fetchingCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    errorCheques: state.cmr_cs.errorCheques,
    submittingMutation: state.cmr_cs.submittingMutation,
    mutation: state.cmr_cs.mutation
  };
};
var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchChequeSummaries: fetchChequeSummaries,
    journalize: journalize
  }, dispatch);
};
var ChequeForm$1 = withHistory(withModulesManager(connect(mapStateToProps$2, mapDispatchToProps$2)(injectIntl(withTheme(withStyles(styles$2)(ChequeForm))))));

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$1 = function styles(theme) {
  return {
    page: theme.page,
    fullHeight: {
      height: "100%"
    }
  };
};
var ChequeStatusPage = /*#__PURE__*/function (_Component) {
  _inherits(ChequeStatusPage, _Component);
  var _super = _createSuper$1(ChequeStatusPage);
  function ChequeStatusPage() {
    var _this;
    _classCallCheck(this, ChequeStatusPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "save", function (chequeStatus) {
      if (!chequeStatus.chequeImportLineCode) {
        _this.props.updateChequeStatus(_this.props.modulesManager, chequeStatus, formatMessageWithValues(_this.props.intl, "cmr_cs", "updateChequeStatus.mutationLabel"));
      } else {
        _this.props.updateChequeStatus(_this.props.modulesManager, chequeStatus, formatMessageWithValues(_this.props.intl, "cmr_cs", "updateChequeStatus.mutationLabel"));
      }
    });
    return _this;
  }
  _createClass(ChequeStatusPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props;
        _this$props.intl;
        var classes = _this$props.classes,
        modulesManager = _this$props.modulesManager,
        history = _this$props.history,
        cheque_code = _this$props.cheque_code;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ChequeForm$1, {
        cheque_code: cheque_code,
        save: this.save,
        add: this.add,
        back: function back(e) {
          return historyPush(modulesManager, history, "cmr_cs.ChequeStatus");
        }
      }));
    }
  }]);
  return ChequeStatusPage;
}(Component);
var mapStateToProps$1 = function mapStateToProps(state, props) {
  return {
    cheque_code: props.match.params.cheque_code
  };
};
var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateChequeStatus: updateChequeStatus,
    journalize: journalize
  }, dispatch);
};
var ChequeStatusPage$1 = withHistory(withModulesManager(connect(mapStateToProps$1, mapDispatchToProps$1)(injectIntl(withTheme(withStyles(styles$1)(ChequeStatusPage))))));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return {
    page: theme.page
  };
};
var duplicatesChequeListPage = /*#__PURE__*/function (_Component) {
  _inherits(duplicatesChequeListPage, _Component);
  var _super = _createSuper(duplicatesChequeListPage);
  function duplicatesChequeListPage(props) {
    var _this;
    _classCallCheck(this, duplicatesChequeListPage);
    _this = _super.call(this, props);
    // this.state = {
    //     defaultFilters: props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.defaultFilters", {
    //         "chequeStatus": {
    //             "value": "New",
    //             "filter": "chequeImportLineStatus: \"New\"",
    //         },
    //     }),
    // };
    // query = () => {
    //     let prms = [];
    //     prms.push(`first: ${this.state.pageSize}`);
    //     if (!!this.state.afterCursor) {
    //         prms.push(`after: "${this.state.afterCursor}"`)
    //     }
    //     if (!!this.state.beforeCursor) {
    //         prms.push(`before: "${this.state.beforeCursor}"`)
    //     }
    //     this.props.fetchCheques(prms);
    // }
    _defineProperty(_assertThisInitialized(_this), "canSubmitAll", function () {
      return true;
    });
    return _this;
  }
  _createClass(duplicatesChequeListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.query();
      var storedData = localStorage.getItem('duplicatesCheque');
      if (storedData) {
        var parsedData = JSON.parse(storedData);
        this.props.fetchDuplicatesCheque(parsedData);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props;
        _this$props.intl;
        var classes = _this$props.classes;
        _this$props.fetchingCheques;
        _this$props.errorCheques;
        _this$props.fetchedMyCheques;
        _this$props.myCheques;
        _this$props.myChequesPageInfo;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(Helmet, {
        title: formatMessage(this.props.intl, "cmr_cs", "cmr_cs.ChequeListHeader")
      }), /*#__PURE__*/React.createElement(ChequeSearcher$1, {
        defaultFilters: 'none',
        cacheFiltersKey: "claimReviewsPageFiltersCache"
        // filterPaneContributionsKey={CHEQUE_FILTER_KEY}
        ,
        duplicate: true
      }));
    }
  }]);
  return duplicatesChequeListPage;
}(Component);
var mapStateToProps = function mapStateToProps(state) {
  return {
    fetchingCheques: state.cmr_cs.fetchingCheques,
    errorCheques: state.cmr_cs.errorCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    myCheques: state.cmr_cs.myCheques,
    myChequesPageInfo: state.cmr_cs.myChequesPageInfo,
    duplicatesCheque: state.cmr_cs.duplicatesCheque
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCheques: fetchCheques,
    fetchDuplicatesCheque: fetchDuplicatesCheque
  }, dispatch);
};
var DuplicateChequeListPage = injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(duplicatesChequeListPage))));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ROUTE_CMR_CS_LIST = "cheque/list";
var ROUTE_CMR_CS_IMPORT = "cheque/import";
var ROUTE_CMR_STATUS = "cheque/status";
var ROUTE_CMR_DOUBLE = "cheque/double";
var ROUTE_CMR_CS_DUPLICATE_LIST = "cheque/list/duplicate";
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }, {
    key: "fr_cs",
    messages: messages_fr
  }],
  "reducers": [{
    key: 'cmr_cs',
    reducer: reducer
  }],
  "refs": [{
    key: "cmr_cs.ChequeStatusPicker",
    ref: ChequeStatusPicker
  }, {
    key: "cmr_cs.ChequeDouble",
    ref: ROUTE_CMR_DOUBLE
  }, {
    key: "cmr_cs.ChequeList",
    ref: ROUTE_CMR_CS_LIST
  }, {
    key: "cmr_cs.ChequeStatus",
    ref: ROUTE_CMR_STATUS
  },
  // key: "cmr_cs.ChequeDoubles", ref: ROUTE_CMR_DOUBLES
  {
    key: "cmr_cs.DuplicateChequeListPage",
    ref: ROUTE_CMR_CS_DUPLICATE_LIST
  }],
  "reports": [{
    key: "invoice_fosa_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$hflocation;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        hflocation: (_values$hflocation = values.hflocation) !== null && _values$hflocation !== void 0 && _values$hflocation.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "cpn1_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location, _values$location2, _values$location3, _values$hflocation2;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location = values.location0) !== null && _values$location !== void 0 && _values$location.code ? values.location0.code : 0,
        location1: (_values$location2 = values.location1) !== null && _values$location2 !== void 0 && _values$location2.code ? values.location1.code : 0,
        location2: (_values$location3 = values.location2) !== null && _values$location3 !== void 0 && _values$location3.code ? values.location2.code : 0,
        hflocation: (_values$hflocation2 = values.hflocation) !== null && _values$hflocation2 !== void 0 && _values$hflocation2.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "cpn4_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location4, _values$location5, _values$location6, _values$hflocation3;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location4 = values.location0) !== null && _values$location4 !== void 0 && _values$location4.code ? values.location0.code : 0,
        location1: (_values$location5 = values.location1) !== null && _values$location5 !== void 0 && _values$location5.code ? values.location1.code : 0,
        location2: (_values$location6 = values.location2) !== null && _values$location6 !== void 0 && _values$location6.code ? values.location2.code : 0,
        hflocation: (_values$hflocation3 = values.hflocation) !== null && _values$hflocation3 !== void 0 && _values$hflocation3.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "assisted_birth_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location7, _values$location8, _values$location9, _values$hflocation4;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location7 = values.location0) !== null && _values$location7 !== void 0 && _values$location7.code ? values.location0.code : 0,
        location1: (_values$location8 = values.location1) !== null && _values$location8 !== void 0 && _values$location8.code ? values.location1.code : 0,
        location2: (_values$location9 = values.location2) !== null && _values$location9 !== void 0 && _values$location9.code ? values.location2.code : 0,
        hflocation: (_values$hflocation4 = values.hflocation) !== null && _values$hflocation4 !== void 0 && _values$hflocation4.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "CPON_under_check_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location10, _values$location11, _values$location12, _values$hflocation5;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location10 = values.location0) !== null && _values$location10 !== void 0 && _values$location10.code ? values.location0.code : 0,
        location1: (_values$location11 = values.location1) !== null && _values$location11 !== void 0 && _values$location11.code ? values.location1.code : 0,
        location2: (_values$location12 = values.location2) !== null && _values$location12 !== void 0 && _values$location12.code ? values.location2.code : 0,
        hflocation: (_values$hflocation5 = values.hflocation) !== null && _values$hflocation5 !== void 0 && _values$hflocation5.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "newborn_CPoN_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location13, _values$location14, _values$location15, _values$hflocation6;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location13 = values.location0) !== null && _values$location13 !== void 0 && _values$location13.code ? values.location0.code : 0,
        location1: (_values$location14 = values.location1) !== null && _values$location14 !== void 0 && _values$location14.code ? values.location1.code : 0,
        location2: (_values$location15 = values.location2) !== null && _values$location15 !== void 0 && _values$location15.code ? values.location2.code : 0,
        hflocation: (_values$hflocation6 = values.hflocation) !== null && _values$hflocation6 !== void 0 && _values$hflocation6.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "complicated_birth_with_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location16, _values$location17, _values$location18, _values$hflocation7;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location16 = values.location0) !== null && _values$location16 !== void 0 && _values$location16.code ? values.location0.code : 0,
        location1: (_values$location17 = values.location1) !== null && _values$location17 !== void 0 && _values$location17.code ? values.location1.code : 0,
        location2: (_values$location18 = values.location2) !== null && _values$location18 !== void 0 && _values$location18.code ? values.location2.code : 0,
        hflocation: (_values$hflocation7 = values.hflocation) !== null && _values$hflocation7 !== void 0 && _values$hflocation7.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "cesarian_cs_rate",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location19, _values$location20, _values$location21, _values$hflocation8;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location19 = values.location0) !== null && _values$location19 !== void 0 && _values$location19.code ? values.location0.code : 0,
        location1: (_values$location20 = values.location1) !== null && _values$location20 !== void 0 && _values$location20.code ? values.location1.code : 0,
        location2: (_values$location21 = values.location2) !== null && _values$location21 !== void 0 && _values$location21.code ? values.location2.code : 0,
        hflocation: (_values$hflocation8 = values.hflocation) !== null && _values$hflocation8 !== void 0 && _values$hflocation8.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "pregnant_woman_reference_rate",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location22, _values$location23, _values$location24, _values$hflocation9;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location22 = values.location0) !== null && _values$location22 !== void 0 && _values$location22.code ? values.location0.code : 0,
        location1: (_values$location23 = values.location1) !== null && _values$location23 !== void 0 && _values$location23.code ? values.location1.code : 0,
        location2: (_values$location24 = values.location2) !== null && _values$location24 !== void 0 && _values$location24.code ? values.location2.code : 0,
        hflocation: (_values$hflocation9 = values.hflocation) !== null && _values$hflocation9 !== void 0 && _values$hflocation9.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location25, _values$location26, _values$location27, _values$hflocation10;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location25 = values.location0) !== null && _values$location25 !== void 0 && _values$location25.code ? values.location0.code : 0,
        location1: (_values$location26 = values.location1) !== null && _values$location26 !== void 0 && _values$location26.code ? values.location1.code : 0,
        location2: (_values$location27 = values.location2) !== null && _values$location27 !== void 0 && _values$location27.code ? values.location2.code : 0,
        hflocation: (_values$hflocation10 = values.hflocation) !== null && _values$hflocation10 !== void 0 && _values$hflocation10.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "paid_invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location28, _values$location29, _values$location30, _values$hflocation11;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location28 = values.location0) !== null && _values$location28 !== void 0 && _values$location28.code ? values.location0.code : 0,
        location1: (_values$location29 = values.location1) !== null && _values$location29 !== void 0 && _values$location29.code ? values.location1.code : 0,
        location2: (_values$location30 = values.location2) !== null && _values$location30 !== void 0 && _values$location30.code ? values.location2.code : 0,
        hflocation: (_values$hflocation11 = values.hflocation) !== null && _values$hflocation11 !== void 0 && _values$hflocation11.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "rejected_invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location31, _values$location32, _values$location33, _values$hflocation12;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location31 = values.location0) !== null && _values$location31 !== void 0 && _values$location31.code ? values.location0.code : 0,
        location1: (_values$location32 = values.location1) !== null && _values$location32 !== void 0 && _values$location32.code ? values.location1.code : 0,
        location2: (_values$location33 = values.location2) !== null && _values$location33 !== void 0 && _values$location33.code ? values.location2.code : 0,
        hflocation: (_values$hflocation12 = values.hflocation) !== null && _values$hflocation12 !== void 0 && _values$hflocation12.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "check_in_use_report",
    component: ChequeSanteActivitiesFullLocationReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location34, _values$location35, _values$location36, _values$hflocation13;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location34 = values.location0) !== null && _values$location34 !== void 0 && _values$location34.code ? values.location0.code : 0,
        location1: (_values$location35 = values.location1) !== null && _values$location35 !== void 0 && _values$location35.code ? values.location1.code : 0,
        location2: (_values$location36 = values.location2) !== null && _values$location36 !== void 0 && _values$location36.code ? values.location2.code : 0,
        hflocation: (_values$hflocation13 = values.hflocation) !== null && _values$hflocation13 !== void 0 && _values$hflocation13.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "closed_check_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location37, _values$location38, _values$location39, _values$hflocation14;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location37 = values.location0) !== null && _values$location37 !== void 0 && _values$location37.code ? values.location0.code : 0,
        location1: (_values$location38 = values.location1) !== null && _values$location38 !== void 0 && _values$location38.code ? values.location1.code : 0,
        location2: (_values$location39 = values.location2) !== null && _values$location39 !== void 0 && _values$location39.code ? values.location2.code : 0,
        hflocation: (_values$hflocation14 = values.hflocation) !== null && _values$hflocation14 !== void 0 && _values$hflocation14.code ? values.hflocation.code : 0
      };
    }
  }, {
    key: "severe_malaria_cost_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    getParams: function getParams(values) {
      var _values$location40, _values$location41, _values$location42, _values$hflocation15;
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: (_values$location40 = values.location0) !== null && _values$location40 !== void 0 && _values$location40.code ? values.location0.code : 0,
        location1: (_values$location41 = values.location1) !== null && _values$location41 !== void 0 && _values$location41.code ? values.location1.code : 0,
        location2: (_values$location42 = values.location2) !== null && _values$location42 !== void 0 && _values$location42.code ? values.location2.code : 0,
        hflocation: (_values$hflocation15 = values.hflocation) !== null && _values$hflocation15 !== void 0 && _values$hflocation15.code ? values.hflocation.code : 0
      };
    }
  }],
  "core.MainMenu": [CmrCsModuleMainMenu],
  "core.Router": [{
    path: ROUTE_CMR_CS_LIST,
    component: ChequeListPage$1
  }, {
    path: ROUTE_CMR_CS_IMPORT,
    component: ChequeImportPage$1
  }, {
    path: ROUTE_CMR_STATUS + '/:cheque_code',
    component: ChequeStatusPage$1
  }, {
    path: ROUTE_CMR_CS_DUPLICATE_LIST,
    component: DuplicateChequeListPage
  }]
};
var CmrCsModule = function CmrCsModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

export { CmrCsModule };
//# sourceMappingURL=index.es.js.map
