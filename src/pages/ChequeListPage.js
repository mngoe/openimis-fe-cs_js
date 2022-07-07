import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { formatMessageWithValues } from "@openimis/fe-core";

const styles = theme => ({
    page: theme.page,
});

class ChequeListPage extends Component {

    render() {
        const { intl, classes } = this.props;

        return (
            <div className={classes.page}>
                Cheque List
            </div>
        )
    }
}


export default injectIntl(withTheme(withStyles(styles)(ChequeListPage)));