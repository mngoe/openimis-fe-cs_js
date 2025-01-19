import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { ListAlt, ScreenShare, ImportExport } from "@material-ui/icons";
import { formatMessage, MainMenuContribution, withModulesManager } from "@openimis/fe-core";
import { RIGHT_ADD } from "../constants";

class CmrCseMainMenu extends Component {
    render() {
      const { rights } = this.props;
      let entries = [];
      if (!!rights.filter((r) => r == RIGHT_ADD).length) {
        entries.push({
          text: formatMessage(this.props.intl, "cheque", "menu.chequeImport"),
          icon: <ImportExport />,
          route: "/cheque/import",
        });

        entries.push({
            text: formatMessage(this.props.intl, "cheque", "menu.chequeList"),
            icon: <ListAlt />,
            route: "/cheque/list",
          });
      }
      if (!entries.length) return null;
      return (
        <MainMenuContribution
          {...this.props}
          header={formatMessage(this.props.intl, "cheque management", "cheque.mainMenu")}
          icon={<ScreenShare />}
          entries={entries}
        />
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
  });
  export default withModulesManager(injectIntl(connect(mapStateToProps)(CmrCseMainMenu)));