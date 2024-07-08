import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import {
  Grid,
  Typography,
  Button,
  Divider,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from "@material-ui/core";
import { formatMessageWithValues, FormattedMessage, baseApiUrl, apiHeaders } from "@openimis/fe-core";
import { fetchChequesImport } from "../actions"
import { ProgressOrError, Table } from "@openimis/fe-core";

const CREATECHEQUE_URL = `${baseApiUrl}/cs/importfile`;

const styles = theme => ({
  page: theme.page,
});

let file = '';

function handleChange(event) {
  file = event.target.files[0];
}




class ChequeImportPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 20,
      count: 20,
      afterCursor: null,
      beforeCursor: null,
      uploadState: null,
      showModal: false,
      contentModal: "cmr_cs.currentlyImporting"
    }
    this.isMountedFlag = false; 

  }

  componentDidMount() {
    this.isMountedFlag = true;
    this.query();
  }

  componentWillUnmount() {
    this.isMountedFlag = false; 
  }

  query = () => {
    let prms = [];
    prms.push(`first: ${this.state.pageSize}`);
    if (!!this.state.afterCursor) {
      prms.push(`after: "${this.state.afterCursor}"`)
    }
    if (!!this.state.beforeCursor) {
      prms.push(`before: "${this.state.beforeCursor}"`)
    }
    prms.push(`orderBy: ["code"]`);
    this.props.fetchChequesImport(prms);
  }

  handleClose = () => {
    if (this.isMountedFlag) { 
      this.setState({ showModal: false, uploadState: null });
    }
  }

  transformChequeData(data) {
    return data.map(item => {
      return {
        chequeImportLineCode: item[1],
        chequeImportLineDate: item[3],
        chequeImportLineStatus: item[2],
      };
    });

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const { duplicatesCheque } = this.props
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      this.setState({ showModal: true });
      this.setState({ contentModal: "cmr_cs.currentlyImporting" });
      const reponseUpload = async () => {
        fetch(`${CREATECHEQUE_URL}/upload`, {
          headers: apiHeaders,
          body: formData,
          method: "POST",
          credentials: "same-origin",
        }).then(response => {
          if (response.status >= 400) {
            throw new Error("Unknown error");
          }
          response.json().then(reponseJson => {

            if (this.isMountedFlag) {
              if (reponseJson.success == true) {
                const cheque = this.transformChequeData(reponseJson.updatedCheques);
                this.setState({
                  uploadState: cheque
                });
                this.setState({ showModal: true });
                if (!!reponseJson && reponseJson.updatedCheques.length > 0) {
                  this.setState({ contentModal: "cmr_cs.DuplicateImport" });
                } else {
                  this.setState({ contentModal: "cmr_cs.checkImported" });
                }
              }
            }
          });
        });
      }
      reponseUpload();
    } catch (error) {
      console.error(error);
      console.log(error)
    }
  }

  render() {
    const {
      intl,
      classes,
      fetchingChequesImport,
      errorChequesImport,
      fetchedMyChequesImport,
      myChequesImport,
      myChequesImportPageInfo,
      onChangePage,
      onChangeRowsPerPage,
    } = this.props;

    let headers = [
      "cmr_cs.importId",
      "cmr_cs.importDate",
      "cmr_cs.storedFile",
    ]

    let itemFormatters = [
      e => e.idChequeImport,
      e => e.importDate,
      e => e.storedFile,
    ]
    return (
      <div className={classes.page}>
        <ProgressOrError progress={fetchingChequesImport} error={errorChequesImport} />
        <h1>{formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")}</h1>

        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h6">{formatMessageWithValues(intl, "CmrCS", "cmr_cs.importChecks")}</Typography>
          </Grid>
          <Grid item>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Input
                    required
                    id="import-button"
                    inputProps={{
                      accept: ".csv, application/csv, text/csv",
                    }}
                    type="file"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {formatMessageWithValues(intl, "CmrCS", "cmr_cs.uploadFile")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Dialog open={this.state.showModal} onClose={this.handleClose} >
          <DialogTitle>{formatMessageWithValues(intl, "CmrCS", "cmr_cs.importCheckFile")}</DialogTitle>
          <Divider />
          <DialogContent>
          {this.state.uploadState != null ?
              <>
                <DialogContentText>
                  {formatMessageWithValues(intl, "CmrCS", this.state.contentModal)}
                </DialogContentText>
                {this.state.uploadState.map((cheque, index) => (
                  <DialogContentText key={index}>
                    Code: {cheque.chequeImportLineCode}, Date: {cheque.chequeImportLineDate}, Status: {cheque.chequeImportLineStatus}
                  </DialogContentText>
                ))}
              </>
              :
              <DialogContentText>
                {formatMessageWithValues(intl, "CmrCS", this.state.contentModal)}
              </DialogContentText>
            }
             </DialogContent>
        </Dialog>
        <hr />
        <Table
          module="cmr_cs"
          header={formatMessageWithValues(intl, "CmrCS", "cmr_cs.tableImport",
            { count: myChequesImportPageInfo.totalCount })}
          headers={headers}
          itemFormatters={itemFormatters}
          items={myChequesImport}
          withPagination={true}
          page={this.state.page}
          pageSize={this.state.pageSize}
          count={this.state.count}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          rowsPerPageOptions={this.rowsPerPageOptions}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchingChequesImport: state.cmr_cs.fetchingChequesImport,
  errorChequesImport: state.cmr_cs.errorChequesImport,
  fetchedMyChequesImport: state.cmr_cs.fetchedMyChequesImport,
  myChequesImport: state.cmr_cs.myChequesImport,
  myChequesImportPageInfo: state.cmr_cs.myChequesImportPageInfo,
  duplicatesCheque: state.cmr_cs.duplicatesCheque
});



const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchChequesImport }, dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChequeImportPage))));