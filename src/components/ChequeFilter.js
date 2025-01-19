import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _debounce from "lodash/debounce";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import _ from "lodash";
import { Grid, Divider } from "@material-ui/core";
import {
  formatMessage,
  withModulesManager,
  ControlledField,
  PublishedComponent,
  TextInput,
  AmountInput,
  Contributions,
} from "@openimis/fe-core";

const CHEQUE_FILTER_CONTRIBUTION_KEY = "cheque.Filter";

const styles = (theme) => ({
  dialogTitle: theme.dialog.title,
  dialogContent: theme.dialog.content,
  form: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(1),
  },
  paperDivider: theme.paper.divider,
});

class Details extends Component {
  debouncedOnChangeFilter = _debounce(
    this.props.onChangeFilters,
    this.props.modulesManager.getConf("fe-claim", "debounceTime", 800),
  );

  render() {
    const { intl, classes, filters, onChangeFilters, filterPaneContributionsKey = null, FilterExt } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item xs={6} className={classes.item}>
          <PublishedComponent
            pubRef="cmr_cs.ChequeStatusPicker"
            name="chequeStatus"
            value={filters["chequeStatus"] && filters["chequeStatus"]["value"]}
            onChange={(v, s) =>
              onChangeFilters([
                {
                  id: "chequeStatus",
                  value: v,
                  filter: !!v ? `chequeImportLineStatus: "${v}"` : null,
                },
              ])
            }
          />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <TextInput
            module="cmr_cs"
            label="cmr_cs.chequeNo"
            name="chequeNo"
            value={filters["chequeNo"] && filters["chequeNo"]["value"]}
            onChange={(v) =>
              this.debouncedOnChangeFilter([
                {
                  id: "chequeNo",
                  value: v,
                  filter: !!v ? `chequeImportLineCode_Icontains: "${v}"` : null,
                },
              ])
            }
          />
        </Grid>
        <Contributions
          filters={filters}
          onChangeFilters={onChangeFilters}
          contributionKey={CHEQUE_FILTER_CONTRIBUTION_KEY}
        />
        {!!filterPaneContributionsKey && (
          <Contributions
            filters={filters}
            onChangeFilters={onChangeFilters}
            contributionKey={filterPaneContributionsKey}
          />
        )}
        {!!FilterExt && (
          <Fragment>
            <Grid item xs={12} className={classes.paperDivider}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <FilterExt onChangeFilters={onChangeFilters} />
            </Grid>
          </Fragment>
        )}
      </Grid>
    );
  }
}

class ChequeFilter extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Details {...this.props} />
      </form>
    );
  }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(ChequeFilter))));
