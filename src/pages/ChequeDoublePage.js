import React, { Component } from 'react';
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
import { Button } from "@material-ui/core";
const CHEQUE_FILTER_KEY = "cheque.Filter";

const styles = (theme) => ({
    page: theme.page,
  });

class ChequeDoublePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          defaultFilters: props.modulesManager.getConf("fe-cmr-cs", "cmr_cs.defaultFilters", {
            "chequeStatus": {
              "value": "New",
              "filter": "chequeImportLineStatus: \"New\"",
            },
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
            prms.push(`after: "${this.state.afterCursor}"`);
        }
        if (!!this.state.beforeCursor) {
            prms.push(`before: "${this.state.beforeCursor}"`);
        }
    
        this.props.fetchCheques(prms).then(() => {
            const uniqueCheques = this.removeDuplicates(this.props.myCheques);
            this.setState({ uniqueCheques });
        });
    }
    
    removeDuplicates = (cheques) => {
        const seen = new Set();
        return cheques.filter(cheque => {
            const duplicate = seen.has(cheque.number); // Assurez-vous que `number` est la clé correcte
            seen.add(cheque.number);
            return !duplicate;
        });
    }
    

  render() {
    const { 
        intl,
        classes,
        fetchingCheques,
        errorCheques,
        fetchedMyCheques,
        myCheques,
        myChequesPageInfo,
        onDoubleClick,onDoubleClick1
    } = this.props;
    const cheques = this.state.uniqueCheques || this.props.myCheques;
    console.log(cheques,"biennnnnnnnnnnnnn")
    return (
        <div>
            <Helmet title={formatMessage(this.props.intl, "cmr_cs", "cmr_cs.ChequeListHeader")} />
            <ChequeSearcher
                defaultFilters={this.state.defaultFilters}
                cacheFiltersKey="claimReviewsPageFiltersCache"
                filterPaneContributionsKey={CHEQUE_FILTER_KEY}
                onDoubleClick={this.onDoubleClick}
                cheques={cheques} // Passez les chèques filtrés ici
            />
        </div>
    );
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

export default injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChequeDoublePage))));