import { Button, Field, Input, Spinner } from "@fluentui/react-components";
import * as React from "react";
import { isEmail } from "validator";

import { isUsername } from "@/Common/Validators/Username";
import { useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

import { useSignUpPageStypes } from "./SignUpPageStyles";

export const SignUpPage: React.FC = () => {
    const s = useLocalizedStrings({
        pageTitle: CE_Strings.SIGN_UP_TITLE,
        username: CE_Strings.SIGN_IN_USERNAME_PLACEHOLDER,
        invitationCode: CE_Strings.INVITATION_CODE_TABLE_CODE_COL,
        email: CE_Strings.SIGN_UP_EMAIL_LABEL,
        emailVerificationCode: CE_Strings.SIGN_UP_EMAIL_VERIFICATION_LABEL,
        sendButton: CE_Strings.COMMON_SEND_BUTTON,
        sendButtonLabel: CE_Strings.SIGN_UP_EMAIL_VERIFICATION_CODE_SEND_BUTTON_ARIA_LABEL,
        password: CE_Strings.SIGN_IN_PASSWORD_PLACEHOLDER,
        confirmPassword: CE_Strings.SIGN_UP_PASSWORD_CONFIRM_LABEL,
        emptyUsernameError: CE_Strings.SIGN_IN_EMPTY_USERNAME_ERROR,
        emptyPasswordError: CE_Strings.SIGN_IN_EMPTY_PASSWORD_ERROR,
    });

    useSetPageMeta(s.pageTitle, null);

    const isSmallScreen = useIsSmallScreen();
    const styles = useSignUpPageStypes();
    const fieldsCls = isSmallScreen ? styles.fieldsColumn : styles.fieldsRow;

    const [username, setUsername] = React.useState("");
    const [invitationCode, setInvitationCode] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailVerificationCode, setEmailVerificationCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [usernameError, setUsernameError] = React.useState<string>(null);
    const [invitationCodeError, setInvitationCodeError] = React.useState<string>(null);
    const [emailError, setEmailError] = React.useState<string>(null);
    const [emailVerificationCodeError, setEmailVerificationCodeError] =
        React.useState<string>(null);
    const [passwordError, setPasswordError] = React.useState<string>(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>(null);

    const [sendingCode, setSendingCode] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);

    const validateEmail = React.useCallback(() => {
        if (!email) {
            setEmailError(""); // TODO: Add error message string
            return false;
        } else if (!isEmail(email)) {
            setEmailError(""); // TODO: Add error message string
            return false;
        }

        setEmailError(null);
        return true;
    }, [email]);

    const validateForm = React.useCallback(() => {
        let isSuccessful = true;
        if (!username) {
            setUsernameError(s.emptyUsernameError);
            isSuccessful = false;
        } else if (!isUsername(username)) {
            setUsernameError(""); // TODO: Add error message string
            isSuccessful = false;
        } else {
            setUsernameError(null);
        }

        if (!invitationCode) {
            setInvitationCodeError(""); // TODO: Add error message string
            isSuccessful = false;
        } else {
            setInvitationCodeError(null);
        }

        if (!validateEmail()) {
            isSuccessful = false;
        }

        if (!emailVerificationCode) {
            setEmailVerificationCodeError(""); // TODO: Add error message string
            isSuccessful = false;
        } else {
            setEmailVerificationCodeError(null);
        }

        if (!password) {
            setPasswordError(s.emptyPasswordError);
            isSuccessful = false;
        } else {
            setPasswordError(null);
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(""); // TODO: Add error message string
            isSuccessful = false;
        } else {
            setConfirmPasswordError(null);
        }

        return isSuccessful;
    }, [
        confirmPassword,
        emailVerificationCode,
        invitationCode,
        password,
        s,
        username,
        validateEmail,
    ]);

    const onSendEmailVerificationCodeButtonClick = React.useCallback(() => {
        if (!validateEmail()) {
            return;
        }

        setSendingCode(true);

        // TODO: Implement email verification code sending
    }, [validateEmail]);

    const onSignUpButtonClick = React.useCallback(() => {
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        // TODO: Implement form submission
    }, [validateForm]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.title}>{s.pageTitle}</div>
                <form className={styles.form}>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.username}
                                validationMessage={usernameError}
                            >
                                <Input
                                    value={username}
                                    disabled={submitting}
                                    onChange={(e, { value }) => setUsername(value)}
                                />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.invitationCode}
                                validationMessage={invitationCodeError}
                            >
                                <Input
                                    value={invitationCode}
                                    disabled={submitting}
                                    onChange={(e, { value }) => setInvitationCode(value)}
                                />
                            </Field>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.email}
                                validationMessage={emailError}
                            >
                                <Input
                                    type="email"
                                    value={email}
                                    disabled={sendingCode || submitting}
                                    onChange={(e, { value }) => setEmail(value)}
                                />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.emailVerificationCode}
                                validationMessage={emailVerificationCodeError}
                            >
                                <Input
                                    value={emailVerificationCode}
                                    disabled={submitting}
                                    onChange={(e, { value }) => setEmailVerificationCode(value)}
                                />
                            </Field>
                            <Button
                                className={styles.sendButton}
                                aria-label={s.sendButtonLabel}
                                disabled={sendingCode || submitting}
                                onClick={onSendEmailVerificationCodeButtonClick}
                            >
                                {sendingCode ? <Spinner size="tiny" /> : s.sendButton}
                            </Button>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.password}
                                validationMessage={passwordError}
                            >
                                <Input
                                    type="password"
                                    value={password}
                                    disabled={submitting}
                                    onChange={(e, { value }) => setPassword(value)}
                                />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field
                                className={styles.field}
                                label={s.confirmPassword}
                                validationMessage={confirmPasswordError}
                            >
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    disabled={submitting}
                                    onChange={(e, { value }) => setConfirmPassword(value)}
                                />
                            </Field>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <Button
                            appearance="primary"
                            onClick={onSignUpButtonClick}
                            disabled={submitting}
                        >
                            {submitting ? <Spinner size="tiny" /> : s.pageTitle}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
