'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var feCore = require('@openimis/fe-core');
var _extends = require('@babel/runtime/helpers/extends');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var React = require('react');
var reactIntl = require('react-intl');
var reactRedux = require('react-redux');
var icons = require('@material-ui/icons');
require('lodash');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var styles$2 = require('@material-ui/core/styles');
var redux = require('redux');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var core = require('@material-ui/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var currency$1 = "Fcfa";
var messages_en = {
	currency: currency$1,
	"cheque.mainMenu": "Check",
	"menu.chequeImport": "Import Check",
	"menu.chequeList": "Check List",
	"Cheque.List.Header": "Check List",
	"cmr_cs.table": "Table Check ({count})",
	"cmr_cs.checknum": "Check Number",
	"cmr_cs.checkstate": "Check Status",
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
	"cmr_cs.dateTo": "To"
};

var currency = "Fcfa";
var messages_fr = {
	currency: currency,
	"cheque.mainMenu": "Chèque",
	"menu.chequeImport": "Import Cheque",
	"menu.chequeList": "Liste Cheque",
	"Cheque.List.Header": "Liste des cheques",
	"cmr_cs.table": "Table Chèque ({count})",
	"cmr_cs.checknum": "Numéro Cheque",
	"cmr_cs.checkstate": "Statut Cheque",
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
	"cmr_cs.dateTo": "A"
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    fetchingCheques: false,
    errorCheques: null,
    fetchedMyCheque: false,
    myCheques: [],
    myChequesPageInfo: {
      totalCount: 0
    },
    fetchingChequesImport: false,
    errorChequesImport: null,
    fetchedMyChequeImport: false,
    myChequesImport: [],
    myChequesImportPageInfo: {
      totalCount: 0
    },
    submittingMutation: false,
    mutation: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CMS_CS_CHECKLIST_REQ':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchingCheques: true,
        fetchedMyCheques: false,
        myCheques: [],
        myChequesPageInfo: {
          totalCount: 0
        },
        errorCheques: null
      });

    case 'CMS_CS_CHECKLIST_RESP':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchingCheques: false,
        fetchedMyCheques: true,
        myCheques: feCore.parseData(action.payload.data.chequeimportline),
        myChequesPageInfo: feCore.pageInfo(action.payload.data.chequeimportline),
        errorCheques: feCore.formatGraphQLError(action.payload)
      });

    case 'CMS_CS_CHECKLIST_ERR':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchedMyCheques: false,
        errorCheques: feCore.formatServerError(action.payload)
      });

    case 'CMS_CS_CHECKIMPORT_REQ':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchingChequesImport: true,
        fetchedMyChequesImport: false,
        myChequesImport: [],
        myChequesImportPageInfo: {
          totalCount: 0
        },
        errorChequesImport: null
      });

    case 'CMS_CS_CHECKIMPORT_RESP':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchingChequesImport: false,
        fetchedMyChequesImport: true,
        myChequesImport: feCore.parseData(action.payload.data.chequeimport),
        myChequesImportPageInfo: feCore.pageInfo(action.payload.data.chequeimport),
        errorChequesImport: feCore.formatGraphQLError(action.payload)
      });

    case 'CMS_CS_CHECKIMPORT_ERR':
      return _objectSpread$2(_objectSpread$2({}, state), {}, {
        fetchedMyChequesImport: false,
        errorChequesImport: feCore.formatServerError(action.payload)
      });

    default:
      return state;
  }
}

var RIGHT_ADD = 111002;
var RIGHT_SUBMIT = 111007;

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CmrCseMainMenu = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](CmrCseMainMenu, _Component);

  var _super = _createSuper$2(CmrCseMainMenu);

  function CmrCseMainMenu() {
    _classCallCheck__default["default"](this, CmrCseMainMenu);

    return _super.apply(this, arguments);
  }

  _createClass__default["default"](CmrCseMainMenu, [{
    key: "render",
    value: function render() {
      var rights = this.props.rights;
      var entries = [];

      if (!!rights.filter(function (r) {
        return r >= RIGHT_ADD && r <= RIGHT_SUBMIT;
      }).length) {
        // RIGHT_SEARCH is shared by HF & HQ staff)
        entries.push({
          text: feCore.formatMessage(this.props.intl, "cheque", "menu.chequeImport"),
          icon: /*#__PURE__*/React__default["default"].createElement(icons.ImportExport, null),
          route: "/cheque/import"
        });
        entries.push({
          text: feCore.formatMessage(this.props.intl, "cheque", "menu.chequeList"),
          icon: /*#__PURE__*/React__default["default"].createElement(icons.ListAlt, null),
          route: "/cheque/list"
        });
      }

      if (!entries.length) return null;
      return /*#__PURE__*/React__default["default"].createElement(feCore.MainMenuContribution, _extends__default["default"]({}, this.props, {
        header: feCore.formatMessage(this.props.intl, "cheque management", "cheque.mainMenu"),
        icon: /*#__PURE__*/React__default["default"].createElement(icons.ScreenShare, null),
        entries: entries
      }));
    }
  }]);

  return CmrCseMainMenu;
}(React.Component);

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : []
  };
};

var CmrCsModuleMainMenu = feCore.withModulesManager(reactIntl.injectIntl(reactRedux.connect(mapStateToProps$2)(CmrCseMainMenu)));

function fetchCheques() {
  var payload = feCore.formatPageQueryWithCount("chequeimportline", null, ["idChequeImportLine", "chequeImportLineCode", "chequeImportLineDate", "chequeImportLineStatus"]);
  return feCore.graphql(payload, 'CMS_CS_CHECKLIST');
}
function fetchChequesImport() {
  var payload = feCore.formatPageQueryWithCount("chequeimport", null, ["idChequeImport", "importDate", "storedFile"]);
  return feCore.graphql(payload, 'CMS_CS_CHECKIMPORT');
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var styles$1 = function styles(theme) {
  return {
    page: theme.page
  };
};

var ChequeListPage = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ChequeListPage, _Component);

  var _super = _createSuper$1(ChequeListPage);

  function ChequeListPage() {
    var _this;

    _classCallCheck__default["default"](this, ChequeListPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "state", {
      page: 0,
      pageSize: 20,
      afterCursor: null,
      beforeCursor: null
    });

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "query", function () {
      var prms = [];
      prms.push("first: ".concat(_this.state.pageSize));

      if (!!_this.state.afterCursor) {
        prms.push("after: \"".concat(_this.state.afterCursor, "\""));
      }

      if (!!_this.state.beforeCursor) {
        prms.push("before: \"".concat(_this.state.beforeCursor, "\""));
      }

      prms.push("orderBy: [\"chequeImportLineCode\"]");

      _this.props.fetchCheques(prms);
    });

    return _this;
  }

  _createClass__default["default"](ChequeListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.query();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          intl = _this$props.intl,
          classes = _this$props.classes,
          fetchingCheques = _this$props.fetchingCheques,
          errorCheques = _this$props.errorCheques;
          _this$props.fetchedMyCheques;
          var myCheques = _this$props.myCheques,
          myChequesPageInfo = _this$props.myChequesPageInfo;
      var headers = ["cmr_cs.checknum", "cmr_cs.checkstate"];
      var itemFormatters = [function (e) {
        return e.chequeImportLineCode;
      }, function (e) {
        return e.chequeImportLineStatus;
      }];
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React__default["default"].createElement(feCore.ProgressOrError, {
        progress: fetchingCheques,
        error: errorCheques
      }), /*#__PURE__*/React__default["default"].createElement(feCore.Table, {
        module: "cmr_cs",
        header: feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.table", {
          count: myChequesPageInfo.totalCount
        }),
        headers: headers,
        itemFormatters: itemFormatters,
        items: myCheques,
        withPagination: true,
        page: this.state.page,
        pageSize: this.state.pageSize,
        count: myChequesPageInfo.totalCount,
        onChangePage: this.onChangePage,
        onChangeRowsPerPage: this.onChangeRowsPerPage,
        rowsPerPageOptions: this.rowsPerPageOptions
      }));
    }
  }]);

  return ChequeListPage;
}(React.Component);

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    fetchingCheques: state.cmr_cs.fetchingCheques,
    errorCheques: state.cmr_cs.errorCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    myCheques: state.cmr_cs.myCheques,
    myChequesPageInfo: state.cmr_cs.myChequesPageInfo
  };
};

var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return redux.bindActionCreators({
    fetchCheques: fetchCheques
  }, dispatch);
};

var ChequeListPage$1 = reactIntl.injectIntl(styles$2.withTheme(styles$2.withStyles(styles$1)(reactRedux.connect(mapStateToProps$1, mapDispatchToProps$1)(ChequeListPage))));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CREATECHEQUE_URL = "".concat(feCore.baseApiUrl, "/cs/importfile");

var styles = function styles(theme) {
  return {
    page: theme.page
  };
};

var file = '';

function handleChange(event) {
  file = event.target.files[0];
}

var ChequeImportPage = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ChequeImportPage, _Component);

  var _super = _createSuper(ChequeImportPage);

  function ChequeImportPage(props) {
    var _this;

    _classCallCheck__default["default"](this, ChequeImportPage);

    _this = _super.call(this, props);

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "query", function () {
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

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "handleClose", function () {
      _this.setState({
        showModal: false
      });
    });

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "handleSubmit", function (event) {
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
          var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
            return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    fetch("".concat(CREATECHEQUE_URL, "/upload"), {
                      headers: feCore.apiHeaders,
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

  _createClass__default["default"](ChequeImportPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.query();
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
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React__default["default"].createElement(feCore.ProgressOrError, {
        progress: fetchingChequesImport,
        error: errorChequesImport
      }), /*#__PURE__*/React__default["default"].createElement("h1", null, feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        container: true,
        spacing: 2,
        direction: "column"
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true
      }, /*#__PURE__*/React__default["default"].createElement(core.Typography, {
        variant: "h6"
      }, feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.importChecks"))), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true
      }, /*#__PURE__*/React__default["default"].createElement("form", {
        onSubmit: function onSubmit(event) {
          return _this2.handleSubmit(event);
        }
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        container: true,
        spacing: 1,
        direction: "column"
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true
      }, /*#__PURE__*/React__default["default"].createElement(core.Input, {
        required: true,
        id: "import-button",
        inputProps: {
          accept: ".csv, application/csv, text/csv"
        },
        type: "file",
        onChange: handleChange
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true
      }, /*#__PURE__*/React__default["default"].createElement(core.Button, {
        variant: "contained",
        color: "primary",
        type: "submit"
      }, feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.uploadFile"))))))), /*#__PURE__*/React__default["default"].createElement(core.Dialog, {
        open: this.state.showModal,
        onClose: this.handleClose
      }, /*#__PURE__*/React__default["default"].createElement(core.DialogTitle, null, feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")), /*#__PURE__*/React__default["default"].createElement(core.Divider, null), /*#__PURE__*/React__default["default"].createElement(core.DialogContent, null, /*#__PURE__*/React__default["default"].createElement(core.DialogContentText, null, feCore.formatMessageWithValues(intl, "CmrCS", this.state.contentModal)))), /*#__PURE__*/React__default["default"].createElement("hr", null), /*#__PURE__*/React__default["default"].createElement(feCore.Table, {
        module: "cmr_cs",
        header: feCore.formatMessageWithValues(intl, "CmrCS", "cmr_cs.tableImport", {
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
}(React.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    fetchingChequesImport: state.cmr_cs.fetchingChequesImport,
    errorChequesImport: state.cmr_cs.errorChequesImport,
    fetchedMyChequesImport: state.cmr_cs.fetchedMyChequesImport,
    myChequesImport: state.cmr_cs.myChequesImport,
    myChequesImportPageInfo: state.cmr_cs.myChequesImportPageInfo
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return redux.bindActionCreators({
    fetchChequesImport: fetchChequesImport
  }, dispatch);
};

var ChequeImportPage$1 = reactIntl.injectIntl(styles$2.withTheme(styles$2.withStyles(styles)(reactRedux.connect(mapStateToProps, mapDispatchToProps)(ChequeImportPage))));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var ChequeSanteActivitiesReport = function ChequeSanteActivitiesReport(props) {
  var values = props.values,
      setValues = props.setValues;
  return /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    container: true,
    direction: "column",
    spacing: 1
  }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location0) {
      setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        location0: location0
      }));
      console.log(location0);
      console.log(values);
    },
    value: values.location0,
    locationLevel: 0
  })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location1) {
      return setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        location1: location1
      }));
    },
    value: values.location1,
    locationLevel: 1
  })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "location.LocationPicker",
    onChange: function onChange(location2) {
      return setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        location2: location2
      }));
    },
    value: values.location2,
    locationLevel: 2
  })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "location.HealthFacilityPicker",
    onChange: function onChange(hflocation) {
      return setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        hflocation: hflocation
      }));
    },
    value: values.hflocation
  })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateFrom,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateFrom",
    onChange: function onChange(dateFrom) {
      return setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        dateFrom: dateFrom
      }));
    }
  })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
    pubRef: "core.DatePicker",
    value: values.dateTo,
    module: "CmrCs",
    required: true,
    label: "cmr_cs.dateTo",
    onChange: function onChange(dateTo) {
      return setValues(_objectSpread$1(_objectSpread$1({}, values), {}, {
        dateTo: dateTo
      }));
    }
  })));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ROUTE_CMR_CS_LIST = "cheque/list";
var ROUTE_CMR_CS_IMPORT = "cheque/import";
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
  "reports": [{
    key: "invoice_fosa_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo && values.location0.code;
    },
    getParams: function getParams(values) {
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        hflocation: values.hflocation.code
      };
    }
  }, {
    key: "cpn1_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo && values.location0.code;
    },
    getParams: function getParams(values) {
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0.code,
        location1: values.location1.code,
        location2: values.location2.code,
        hflocation: values.hflocation.code
      };
    }
  }, {
    key: "cpn4_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        date_from: values.dateFrom,
        date_to: values.dateTo,
        location0: values.location0.code,
        location1: values.location1.code,
        location2: values.location2.code,
        hflocation: values.hflocation.code
      };
    }
  }, {
    key: "assisted_birth_under_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "CPON_under_check_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "newborn_CPoN_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "complicated_birth_with_cs",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "cesarian_cs_rate",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "pregnant_woman_reference_rate",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "paid_invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "rejected_invoice_per_period_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "check_in_use_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "closed_check_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
      };
    }
  }, {
    key: "severe_malaria_cost_report",
    component: ChequeSanteActivitiesReport,
    isValid: function isValid(values) {
      return values.dateFrom && values.dateTo;
    },
    //isValid: (values)=> true,
    getParams: function getParams(values) {
      return {
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        usrAction: values.usrAction
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
  }]
};
var CmrCsModule = function CmrCsModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

exports.CmrCsModule = CmrCsModule;
//# sourceMappingURL=index.js.map
