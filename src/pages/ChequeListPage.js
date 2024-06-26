import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { fetchCheques } from "../actions";
import ChequeSearcher from "../components/ChequeSearcher";
import { 
    ProgressOrError, 
    Table, 
    PagedDataHandler, 
    Helmet,
    formatMessage,
    historyPush,
    formatMessageWithValues, 
    FormattedMessage } from "@openimis/fe-core";
import { Button } from "@material-ui/core"
const CHEQUE_FILTER_KEY = "cheque.Filter";

const styles = (theme) => ({
    page: theme.page,
  });

class ChequeListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          defaultFilters: props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.defaultFilters", {
            // "chequeStatus": {
            //   "value": "New",
            //    "filter": "chequeImportLineStatus: \"New\"",
            // },
          }),
        };
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
        this.props.fetchCheques(prms);
    }

    onDoubleClick = (i, newTab = false) => {
        historyPush(this.props.modulesManager, this.props.history, "cmr_cs.ChequeStatus",[i.chequeImportLineCode],false);
    };

    double = () => {
        historyPush(this.props.modulesManager, this.props.history, "cmr_cs.ChequeDouble");
    };
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
               return (
            <div className={classes.page}>
                <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={this.double}
                          >
                            {formatMessageWithValues(intl, "CmrCS", "LISTE DES DOUBLONS")}
                          </Button>
                <Helmet title={formatMessage(this.props.intl, "cmr_cs", "cmr_cs.ChequeListHeader")} />
                <ChequeSearcher
                defaultFilters={this.state.defaultFilters}
                cacheFiltersKey="claimReviewsPageFiltersCache"
                filterPaneContributionsKey={CHEQUE_FILTER_KEY}
                onDoubleClick={this.onDoubleClick}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
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