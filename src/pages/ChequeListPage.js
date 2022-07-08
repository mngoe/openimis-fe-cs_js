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

    componentDidMount() {
        this.props.fetchCheques();
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

        return (
            <div className={classes.page}>
                <ProgressOrError progress={fetchingCheques} error={errorCheques} />
                <h1>
                    <FormattedMessage module="CmrCs" id="Cheque.List.Header" />
                </h1>
                <table>
                    {!!myCheques && myCheques.map(e=> (
                        <tr><td>{e.code}</td><td>{e.name}</td></tr>
                    ))}
                </table>
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