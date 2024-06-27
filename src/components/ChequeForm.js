import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ReplayIcon from "@material-ui/icons/Replay";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
  withModulesManager,
  withHistory,
  historyPush,
  Form,
  journalize,
  formatMessage,
  ProgressOrError,
} from "@openimis/fe-core";
import ChequeStatusMasterPanel from "../components/ChequeStatusMasterPanel";
import AuthChequeDialog from "./AuthChequeDialog";
import { fetchChequeSummaries } from "../actions";

const styles = (theme) => ({
  lockedPage: theme.page.locked,
  fullHeight: {
    height: "100%",
  },
});


class ChequeForm extends Component {
  state = {
    lockNew: false,
    chequeStatus: this._newChequeStatus(),
    newChequeStatus: true,
  };

  _newChequeStatus() {
    let chequeStatus = {};
    chequeStatus.jsonExt = {};
    return chequeStatus;
  }

  componentDidMount() {
    if (!!this.props.cheque_code) {
      this.setState(
        (state, props) => ({ cheque_code: this.props.cheque_code }),
        (e) => this.props.fetchChequeSummaries(this.props.modulesManager, [`chequeImportLineCode:"${this.props.cheque_code}"`]),
      );
    }
  }


  back = (e) => {
    const { modulesManager, history } = this.props;
    historyPush(modulesManager, history, "cmr_cs.ChequeList");
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fetchedChequeStatus !== this.props.fetchedChequeStatus && this.props.fetchedChequeStatus) {
      let chequeStatus = this.props.chequeStatus || {};
      chequeStatus.ext = chequeStatus.jsonExt ? JSON.parse(chequeStatus.jsonExt) : {};
      this.setState({
        chequeStatus,
        chequeImportLineCode: chequeStatus.chequeImportLineCode,
        lockNew: false,
        newChequeStatus: false,
      });
    } else if (prevProps.chequeImportLineCode && !this.props.chequeImportLineCode) {
      this.setState({
        chequeStatus: this._newChequeStatus(),
        newChequeStatus: true,
        lockNew: false,
        chequeImportLineCode: null,
      });
    } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
      this.props.journalize(this.props.mutation);
      this.setState((state, props) => ({
        chequeStatus: { ...state.chequeStatus, clientMutationId: props.mutation.clientMutationId },
      }));
    }
  }


  _add = () => {
    this.setState(
      (state) => ({
        chequeStatus: this._newChequeStatus(),
        newChequeStatus: true,
        lockNew: false,
      }),
      (e) => {
        this.props.add();
        this.forceUpdate();
      },
    );
  };

  reload = () => {
    this.props.fetchChequeStatus(
      this.props.modulesManager,
      this.state.chequeImportLineCode,
    );
  };

  canSave = () => {
    if (!this.state.chequeStatus.chequeImportLineCode) return false;
    if (!this.state.chequeStatus.chequeImportLineStatus) return false;
    if (!this.state.chequeStatus.chequeImportLineDate) return false;
    if (this.state.cheque == null) return true
    return true;
  };

  _Authvalidator = () => {
    this.setState({ cheque: true, readOnlyState: true })
  }

  _save = (chequeStatus) => {
    this.setState({ lockNew: !this.state.chequeStatus.chequeImportLineCode }, () => {
      if (this.canSave()) {
        this.props.save(this.state.chequeStatus);
      }
    });
    this.setState({ cheque: null })
  };

  onEditedChanged = (chequeStatus) => {
    this.setState({ chequeStatus, newChequeStatus: false });
  };


  render() {
    const {
      intl,
      classes,
      fetchingCheques,
      fetchedMyCheques,
      errorCheques,
      readOnly = false,
      save,
      add,
      myCheques,
      chequeImportLineCode
    } = this.props;
    const { chequeStatus, cheque, readOnlyState } = this.state;
    let runningMutation = !!chequeStatus && !!chequeStatus.clientMutationId;
    var actions = [];
    if (!!chequeImportLineCode) {
      actions.push({
        doIt: (e) => this.reload(chequeImportLineCode),
        icon: <ReplayIcon />,
        onlyIfDirty: !readOnly,
      });
    }
    return (
      <div className={!!runningMutation ? classes.lockedPage : null}>
        <AuthChequeDialog
          cheque={this.state.cheque}
          user={this.props.user}
          onConfirm={this._save}
          onCancel={e => this.setState({ cheque: null, lockNew: false, readOnlyState: null })} />
        <ProgressOrError progress={fetchingCheques} error={errorCheques} />
        {((!!fetchedMyCheques && !!chequeStatus && chequeStatus.chequeImportLineCode === chequeStatus) || !chequeImportLineCode) && (
          <Form
            module="cmr_cs"
            title={formatMessage(intl, "cmr_cs", "edit.title")}
            edited_id={chequeImportLineCode}
            edited={myCheques[0]}
            HeadPanel={ChequeStatusMasterPanel}
            chequeStatus={chequeStatus}
            readOnly={readOnlyState}
            onEditedChanged={this.onEditedChanged}
            canSave={this.canSave}
            back={this.back}
            actions={actions}
            reload={(chequeImportLineCode || readOnly) && this.reload}
            save={!!save ? this._Authvalidator : null}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    chequeStatus: state.cmr_cs.chequeStatus,
    user: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user : [],
    myCheques: state.cmr_cs.myCheques,
    fetchingCheques: state.cmr_cs.fetchingCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    errorCheques: state.cmr_cs.errorCheques,
    submittingMutation: state.cmr_cs.submittingMutation,
    mutation: state.cmr_cs.mutation,
  });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchChequeSummaries,journalize },
    dispatch,
  );
};

export default withHistory(
  withModulesManager(
    connect(mapStateToProps, mapDispatchToProps)(injectIntl(withTheme(withStyles(styles)(ChequeForm)))),
  ),
);
