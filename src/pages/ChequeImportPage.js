import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { formatMessageWithValues } from "@openimis/fe-core";

const styles = theme => ({
    page: theme.page,
});

class ChequeImportPage extends Component {

    render() {
        const { intl, classes } = this.props;

        return (
            <div className={classes.page}>
                Cheque Import Page
            </div>
        )
    }
}


export default injectIntl(withTheme(withStyles(styles)(ChequeImportPage)));