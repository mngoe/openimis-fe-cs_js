import React, { useState, useEffect, useRef } from "react";
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    Typography,
} from '@material-ui/core';
import { FormattedMessage, formatMessage, TextInput ,baseApiUrl, apiHeaders} from "@openimis/fe-core";

const styles = theme => ({
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton,
});

const AuthChequeDialog = ({ classes, cheque, onCancel, onConfirm, intl, user }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const LOGINURL = `${baseApiUrl}/api_fhir_r4`;
    const [credentials, setCredentials] = useState({ username: user?.username });
    const [serverResponse, setServerResponse] = useState({ loginStatus: "", message: null });
    const requestSent = useRef(false);

    const handleLoginError = (errorMessage) => {
        setServerResponse({ loginStatus: "CORE_AUTH_ERR", message: errorMessage });
        setIsAuthenticating(false);
    };

    const errorMessages = {
        INCORRECT_CREDENTIALS: "core.LoginPage.authError",
    };

    const getErrorMessage = (messageKey) => {
        return errorMessages[messageKey] || messageKey;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsAuthenticating(true);

        const config = {
            headers: {
              'content-type': 'application/json',
            },
          };
          try {
            const reponseLogin = async () => {
              fetch(`${LOGINURL}/login/`, {
                headers:{'content-type': 'application/json'},
                body: JSON.stringify(credentials),
                method: "POST",
              }).then(response => {
                if (response.status >= 400) {
                    handleLoginError(formatMessage(intl, "cmr_cs", "incorrectPassword"));
                    setIsAuthenticating(false);

                }else{
                    setIsAuthenticating(false);
                    onConfirm()
                    onCancel()
                }
           
              });
            }
            reponseLogin();
          } catch (error) {
            console.error(error);
            console.log(error)
          }
        }
    

    useEffect(() => {
        requestSent.current = false;
    }, [cheque]);

    return (
        <Dialog
            open={!!cheque}
            onClose={onCancel}
        >
            <DialogTitle>
                <FormattedMessage
                    module="cmr_cs"
                    id="passwordCheck"
                />
            </DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <Grid item>
                        <TextInput
                            required
                            readOnly={isAuthenticating}
                            type="password"
                            label={formatMessage(intl, "cmr_cs", "password")}
                            fullWidth
                            inputProps={{ autoComplete: "new-password" }}
                            onChange={(password) => setCredentials({ ...credentials, password })}
                        />
                    </Grid>
                    {serverResponse?.message && (
                        <Grid item>
                            <Box color="error.main">
                                <Typography color="error">
                                    {serverResponse.message}
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                    <DialogActions>
                        <Button
                            
                            type="submit"
                            disabled={isAuthenticating || !(credentials.username && credentials.password)}
                            color="primary"
                            variant="contained"
                        >
                            <FormattedMessage module="cmr_cs" id="authchequedialog.login.button" />
                        </Button>
                        <Button onClick={onCancel} className={classes.secondaryButton} disabled={isAuthenticating}>
                            <FormattedMessage module="core" id="cancel" />
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default injectIntl(withTheme(withStyles(styles)(AuthChequeDialog)));
