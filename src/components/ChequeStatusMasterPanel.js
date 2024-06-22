import React, { } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";
import {
  ControlledField,
  TextInput,
  formatMessage,
  FormattedMessage,
  PublishedComponent,
  FormPanel,
  NumberInput,
  withModulesManager,
} from "@openimis/fe-core";
import ChequeStatusPicker from "../pickers/ChequeStatusPicker";

const styles = (theme) => ({
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  item: theme.paper.item,
  fullHeight: {
    height: "100%",
  },
});

const chequeStatuses = [
  { value: "New", label: "New" },
  { value: "Cancel", label: "Cancel" },
  { value: "Used", label: "Used" },
  // Add more statuses as required
];


class ChequeStatusMasterPanel extends FormPanel {

  updateAttribute = (attr, v) => {
    console.log("edited", edited)
    console.log("edited", attr)
    console.log("edited", v)
    
    let edited = { ...this.props.edited };
    console.log("edited", edited)
    edited[attr] = v;
    this.props.onEditedChanged(edited);

  };

  render() {
    const {
      intl,
      classes,
      edited,
      title = "add.chequeStatus",
      titleParams = { label: "" },
      actions,
      onEditedChanged,
      chequeStatus
    } = this.props;
    // let readOnly = !!edited.cheque_code ? false : false;
    // console.log("cheque",edited.chequeImportLineCode)


    return (
      <Grid container>
        <Grid container className={classes.item}>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "cmr_cs", "chequeStatus.checknum")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="cmr_cs"
                label=""
                required={true}
                readOnly={true}
                value={!!edited && !!edited.chequeImportLineCode ? edited.chequeImportLineCode  : ""}
                onChange={(v) => this.updateAttribute("checknum", v)}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "cmr_cs","checkstate")}
            </Grid>
            <Grid className={classes.item}>
              <FormControl className={classes.formControl}>
                <Select
                  value={edited?.checkstate || ""}
                  onChange={(e) => this.updateAttribute("chequeImportLineStatus", e.target.value)}
                >
                  {chequeStatuses.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid className={classes.item}>

            <PublishedComponent
                pubRef="ChequeStatusPicker"
                value={edited?.chequeImportLineStatus}
                module="cmr_cs"
                label="cmr_cs.checkstate"
                readOnly={false}
                onChange={(value) => onEditedChanged({ ...edited, chequeImportLineStatus })}
              />
          </Grid> */}

            {/* <Grid className={classes.item}>
              <TextInput
                module="cmr_cs"
                label=""
                required={true}
                readOnly={false}
                
                value={!!edited && !!edited.chequeImportLineStatus ? edited.chequeImportLineStatus : ""}
                onChange={(v) => this.updateAttribute("chequeImportLineStatus", v)}
              />
            </Grid> */}
          </Grid>
          <Grid item xs={4} className={classes.item}>
            <Grid className={classes.item}>
              {formatMessage(intl, "cmr_cs", "chequeStatus.checkdate")}
            </Grid>
            <Grid className={classes.item}>
              <NumberInput
                module="cmr_cs"
                label=""
                required={true}
                readOnly={true}
                value={!!edited && !!edited.chequeImportLineDate ? edited.chequeImportLineDate : ""}
                onChange={(v) => this.updateAttribute("checkdate", v)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
// console.log(chequeImportLineStatus,"cheque",idChequeImportLine)

export default withModulesManager(withTheme(withStyles(styles)(ChequeStatusMasterPanel)));
