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
import { FormattedMessage, formatMessage, TextInput } from "@openimis/fe-core";
import { useAuthentication } from "../hooks";

const styles = theme => ({
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton,
});

const AuthChequeDialog = ({ classes, cheque, onCancel, onConfirm, intl, user }) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [credentials, setCredentials] = useState({ username: user?.username });
    const [serverResponse, setServerResponse] = useState({ loginStatus: "", message: null });
    const requestSent = useRef(false);

    const auth = useAuthentication();

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

        try {
            const response = await auth.login(credentials, "AuthChequeDialog");
            if (response.payload?.errors?.length) {
                handleLoginError(formatMessage(intl, "cmr_cs", "incorrectPassword"));
                return;
            }

            const { loginStatus, message } = response;
            setServerResponse({ loginStatus, message:"" });

            if (loginStatus === "CORE_AUTH_ERR") {
                setIsAuthenticating(false);
            } else {
                onConfirm();
            }
        } catch (error) {
            handleLoginError(formatMessage(intl, "cmr_cs", "incorrectPassword"));
        }
    };

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
