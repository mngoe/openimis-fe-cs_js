import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { formatMessageWithValues, FormattedMessage } from "@openimis/fe-core";
import { fetchCheques } from "../actions"
import { ProgressOrError, Table } from "@openimis/fe-core";

const styles = theme => ({
    page: theme.page,
});

class ChequeListPage extends Component {

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
        prms.push(`orderBy: ["chequeImportLineCode"]`);
        this.props.fetchCheques(prms);
    }


    render() {
        const { 
            intl,
            classes,
            fetchingCheques,
            errorCheques,
            fetchedMyCheques,
            myCheques,
            myChequesPageInfo 
        } = this.props;

        let headers = [
            "cmr_cs.checknum",
            "cmr_cs.checkstate",
        ]

        let itemFormatters = [
            e => e.chequeImportLineCode,
            e => e.chequeImportLineStatus,
        ]

        return (
            <div className={classes.page}>
                <ProgressOrError progress={fetchingCheques} error={errorCheques} /> 
                <Table
                    module="cmr_cs"
                    header={formatMessageWithValues(intl, "CmrCS", "cmr_cs.table", 
                    {count: myChequesPageInfo.totalCount})}
                    headers={headers}
                    itemFormatters={itemFormatters}
                    items={myCheques}
                    withPagination={true}
                    page={this.state.page}
                    pageSize={this.state.pageSize}
                    count={myChequesPageInfo.totalCount}
                    onChangePage={this.onChangePage}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    rowsPerPageOptions={this.rowsPerPageOptions}
                />
                </div>
        )
    }
}

const mapStateToProps = state => ({
    fetchingCheques: state.cmr_cs.fetchingCheques,
    errorCheques: state.cmr_cs.errorCheques,
    fetchedMyCheques: state.cmr_cs.fetchedMyCheques,
    myCheques: state.cmr_cs.myCheques,
    myChequesPageInfo: state.cmr_cs.myChequesPageInfo,
});



const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchCheques }, dispatch);
};

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChequeListPage))));