import { Grid } from "@material-ui/core";
import { PublishedComponent } from "@openimis/fe-core";
import React from "react";

const ChequeSanteActivitiesFullLocationReport = (props) => {
  const { values, setValues } = props;

  return (
    <Grid container direction="column" spacing={1}>
       <Grid item>
        <PublishedComponent
          pubRef="location.LocationPicker"
          onChange={(location0) => 
            {
            setValues({
              ...values,
              location0,
            });
          }
          }
          value={values.location0}
          locationLevel={0}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="location.LocationPicker"
          onChange={(location1) =>
            setValues({
              ...values,
              location1,
            })
          }
          value={values.location1}
          locationLevel={1}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="location.LocationPicker"
          onChange={(location2) =>
            setValues({
              ...values,
              location2,
            })
          }
          value={values.location2}
          locationLevel={2}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="location.HealthFacilityPicker"
          onChange={(hflocation) =>
            setValues({
              ...values,
              hflocation,
            })
          }
          value={values.hflocation}
        />
      </Grid>
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

export default ChequeSanteActivitiesFullLocationReport;
