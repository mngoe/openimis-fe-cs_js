import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import {
    Grid,
    Typography,
    Button,
    Divider,
    Input,
    FormControlLabel,
  } from "@material-ui/core";
import { formatMessageWithValues, FormattedMessage, baseApiUrl, apiHeaders } from "@openimis/fe-core";
import { fetchChequesImport } from "../actions"
import { ProgressOrError, Table } from "@openimis/fe-core";

const CREATECHEQUE_URL = `${baseApiUrl}/cheque/importfile`;

const styles = theme => ({
    page: theme.page,
});

let file = '';

function handleChange(event) {
  file = event.target.files[0];
  console.log(file);
}

function  handleSubmit(event) {
  console.log(file);
  event.preventDefault()
  const url = 'http://localhost:3000/uploadFile';
  const formData = new FormData();
  console.log("Submit");
  
  formData.append('file', file);
  formData.append('fileName', file.name);
  console.log(formData);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    fetch(`${CREATECHEQUE_URL}/upload`, {
      headers: apiHeaders,
      body: formData,
      method: "POST",
      credentials: "same-origin",
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Unknown error");
      }
  
      const payload = response.json();
      console>log(payload);
    });

  } catch (error) {
    console.error(error);
    console>log(error)
  }

}


class ChequeImportPage extends Component {

    state = {
        page: 0,
        pageSize: 20,
        afterCursor: null,
        beforeCursor: null,
    }

    componentDidMount() {
        this.query();
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


    render() {
        const { 
            intl,
            classes,
            fetchingChequesImport,
            errorChequesImport,
            fetchedMyChequesImport,
            myChequesImport,
            myChequesImportPageInfo 
        } = this.props;

        let headers = [
            "cmr_cs.importId",
            "cmr_cs.importDate",
            "cmr_cs.importUser",
        ]

        let itemFormatters = [
            e => e.id,
            e => e.code,
            e => e.name,
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
                    <form noValidate>
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
                            onClick={handleSubmit}
                          >
                            {formatMessageWithValues(intl, "CmrCS", "cmr_cs.uploadFile")}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>

                <hr/>

                <Table
                    module="cmr_cs"
                    header={formatMessageWithValues(intl, "CmrCS", "cmr_cs.tableImport", 
                    {count: myChequesImportPageInfo.totalCount})}
                    headers={headers}
                    itemFormatters={itemFormatters}
                    items={myChequesImport}
                    withPagination={true}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    count={myChequesImportPageInfo.totalCount}
                    onChangePage={this.onChangePage}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
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
});



const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchChequesImport }, dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChequeImportPage))));