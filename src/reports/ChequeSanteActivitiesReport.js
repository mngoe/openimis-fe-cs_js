import { Grid } from "@material-ui/core";
import { PublishedComponent } from "@openimis/fe-core";
import React from "react";

const ChequeSanteActivitiesReport = (props) => {
  const { values, setValues } = props;

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.dateFrom}
          module="CmrCs"
          required
          label="cmr_cs.dateFrom"
          onChange={(dateFrom) => setValues({ ...values, dateFrom })}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.dateTo}
          module="CmrCs"
          required
          label="cmr_cs.dateTo"
          onChange={(dateTo) => setValues({ ...values, dateTo })}
        />
      </Grid>
    </Grid>
  );
};

export default ChequeSanteActivitiesReport;
