import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReplayIcon from "@material-ui/icons/Replay";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
    withModulesManager,
    withHistory,
    historyPush,
    Form,
    journalize,
    ProgressOrError,
  } from "@openimis/fe-core";
import ChequeStatusMasterPanel from "../components/ChequeStatusMasterPanel";
import { fetchChequeSummaries } from "../actions";

  const styles = (theme) => ({
    lockedPage: theme.page.locked,
  });

  class ChequeForm extends Component {
    state = {
      lockNew: false,
      reset: 0,
      update: true,
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
      console.log("Navigating back", modulesManager, history);
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
        this.setState({ reset: this.state.reset + 1 });
      }
    }
    
  
    _add = () => {
      this.setState(
        (state) => ({
          chequeStatus: this._newChequeStatus(),
          newChequeStatus: true,
          lockNew: false,
          reset: state.reset + 1,
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
      return true;
    };

    _save = (chequeStatus) => {
      this.setState({ lockNew: !chequeStatus.chequeImportLineCode }, () => {
        if (this.canSave()) {
          this.props.save(this.state.chequeStatus);
        }
      });
    };
  
    onEditedChanged = (chequeStatus) => {
      this.setState({ chequeStatus, newChequeStatus: false });
    };
  
    render() {
      const {
        intl,
        fetchingChequeStatus,
        fetchedChequeStatus,
        errorChequeStatus,
        readOnly = false,
        save,
        add,
        myCheques,
        chequeImportLineCode
      } = this.props;
      const { chequeStatus } = this.state;
      var actions = [];
      if (!!chequeImportLineCode) {
        actions.push({
          doIt: (e) => this.reload(chequeImportLineCode),
          icon: <ReplayIcon />,
          onlyIfDirty: !readOnly,
        });
      }
  
      return (
        <Fragment>
          <ProgressOrError progress={fetchingChequeStatus} error={errorChequeStatus} />
          {((!!fetchedChequeStatus && !!chequeStatus && chequeStatus.chequeImportLineCode === chequeStatus) || !chequeImportLineCode) && (
            <Form
              module="cmr_cs"
              title="edit.title"
              reset={this.state.reset}
              update={this.state.update}
              edited_id={chequeImportLineCode}
              edited={myCheques[0]}
              HeadPanel={ChequeStatusMasterPanel}
              ChequeStatus={chequeStatus}
              onEditedChanged={this.onEditedChanged}
              canSave={this.canSave}
              back={this.back}
              actions={actions}
              reload={(chequeImportLineCode || readOnly) && this.reload}
              save={!!save ? this._save : null}
              add={!!add && !this.state.newChequeStatus ? this._add : null}
            />

          )}
        </Fragment>
      );
    }
  }
  const mapStateToProps = (state, props) => ({
    chequeStatus: state.cmr_cs.chequeStatus,
    myCheques: state.cmr_cs.myCheques,
    fetchingCheques: state.cmr_cs.fetchingCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    errorCheques: state.cmr_cs.errorCheques,
    submittingMutation: state.cmr_cs.submittingMutation,
    mutation: state.cmr_cs.mutation,
  });
  
  export default withHistory(
    withModulesManager(connect(mapStateToProps, { fetchChequeSummaries, journalize })(injectIntl(withTheme(withStyles(styles)(ChequeForm)))))
  );
  