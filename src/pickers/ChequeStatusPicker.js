import React, { Component } from "react";
import { ConstantBasedPicker } from "@openimis/fe-core";

import { CHEQUE_STATUS } from "../constants";

class ChequeStatusPicker extends Component {

  render() {
    return <ConstantBasedPicker module="cmr_cs" label="cmr_cs-list" constants={CHEQUE_STATUS} {...this.props} />;
  }
}

export default ChequeStatusPicker;
