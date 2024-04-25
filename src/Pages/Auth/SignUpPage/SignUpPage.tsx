import {
    Button,
    Field,
    Input,
    Spinner,
    Toast,
    ToastBody,
    ToastTitle,
} from "@fluentui/react-components";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isUUID } from "validator";

import { useAppToastController } from "@/Common/Hooks/AppToast";
import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import { format } from "@/Common/Utilities/Format";
import { isPassword } from "@/Common/Validators/Password";
import { isUsername } from "@/Common/Validators/Username";
import { setAuthAction, updateBearerTokenAction } from "@/Features/Auth/Actions";
import { getAppName } from "@/Features/Config/Selectors";
import { useIsSmallScreen } from "@/Features/Environment/Hooks";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { getLanguage } from "@/Features/LocalizedString/Selectors";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageBaseRoute } from "@/Features/Page/Types";
import { useAppDispatch, useAppSelector } from "@/Features/Store/Store";

import {
    postSendEmailVerificationCodeForRegistrationRequestAsync,
    postSignUpRequestAsync,
} from "./Request";
import { useSignUpPageStypes } from "./SignUpPageStyles";

export interface ISignUpPageProps {
    redirectPath?: string;
}

export const SignUpPage: React.FC<ISignUpPageProps> = ({ redirectPath }) => {
    const s = useLocalizedStrings({
        pageTitle: CE_Strings.SIGN_UP_TITLE,
        username: CE_Strings.SIGN_IN_USERNAME_PLACEHOLDER,
        usernameHint: CE_Strings.SIGN_UP_USERNAME_HINT,
        invitationCode: CE_Strings.INVITATION_CODE_TABLE_CODE_COL,
        email: CE_Strings.SIGN_UP_EMAIL_LABEL,
        emailVerificationCode: CE_Strings.SIGN_UP_EMAIL_VERIFICATION_LABEL,
        sendButton: CE_Strings.COMMON_SEND_BUTTON,
        sendButtonLabel: CE_Strings.SIGN_UP_EMAIL_VERIFICATION_CODE_SEND_BUTTON_ARIA_LABEL,
        password: CE_Strings.SIGN_IN_PASSWORD_PLACEHOLDER,
        passwordHint: CE_Strings.SIGN_UP_PASSWORD_HINT,
        confirmPassword: CE_Strings.SIGN_UP_PASSWORD_CONFIRM_LABEL,
        invalidUsernameError: CE_Strings.SIGN_UP_INVALID_USERNAME_ERROR,
        invalidEmailError: CE_Strings.SIGN_UP_INVALID_EMAIL_ERROR,
        invalidEmailVerificationCodeError: CE_Strings.SIGN_UP_INVALID_EMAIL_VERIFICATION_CODE_ERROR,
        invalidInvitationCodeError: CE_Strings.SIGN_UP_INVALID_INVITATION_CODE_ERROR,
        invalidPasswordError: CE_Strings.SIGN_UP_INVALID_PASSWORD_ERROR,
        passwordMismatchError: CE_Strings.SIGN_UP_PASSWORD_MISMATCH_ERROR,
        duplicateUsernameError: CE_Strings.SIGN_UP_DUPLICATE_USERNAME_ERROR,
        duplicateEmailError: CE_Strings.SIGN_UP_DUPLICATE_EMAIL_ERROR,
        sendRateLimitErrorMessage: CE_Strings.SIGN_UP_SEND_EMAIL_RATE_LIMIT_ERROR,
        sendCodeErrorMessage: CE_Strings.SIGN_UP_SEND_EMAIL_VERIFICATION_CODE_ERROR,
        sendCodeSuccessMessage: CE_Strings.SIGN_UP_SEND_EMAIL_VERIFICATION_CODE_SUCCESS,
        sendCodeSuccessDescription:
            CE_Strings.SIGN_UP_SEND_EMAIL_VERIFICATION_CODE_SUCCESS_DESCRIPTION,
        welcomMessage: CE_Strings.SIGN_UP_WELCOME_MESSAGE,
    });

    useSetPageMeta(s.pageTitle, null);

    const dispatch = useAppDispatch();
    const recaptchaAsync = useRecaptchaAsync();
    const navigate = useNavigate();
    const { dispatchToast } = useAppToastController();
    const appName = useAppSelector(getAppName);
    const lang = useAppSelector(getLanguage);
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
        if (!isEmail(email)) {
            setEmailError(s.invalidEmailError);
            return false;
        }

        setEmailError(null);
        return true;
    }, [email, s]);

    const validateForm = React.useCallback(() => {
        let isSuccessful = true;
        if (!isUsername(username)) {
            setUsernameError(s.invalidUsernameError);
            isSuccessful = false;
        } else {
            setUsernameError(null);
        }

        if (!isUUID(invitationCode)) {
            setInvitationCodeError(s.invalidInvitationCodeError);
            isSuccessful = false;
        } else {
            setInvitationCodeError(null);
        }

        if (!validateEmail()) {
            isSuccessful = false;
        }

        if (!emailVerificationCode) {
            setEmailVerificationCodeError(s.invalidEmailVerificationCodeError);
            isSuccessful = false;
        } else {
            setEmailVerificationCodeError(null);
        }

        if (!isPassword(password)) {
            setPasswordError(s.invalidPasswordError);
            isSuccessful = false;
        } else {
            setPasswordError(null);
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(s.passwordMismatchError);
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

        postSendEmailVerificationCodeForRegistrationRequestAsync({ email, lang }, recaptchaAsync)
            .then(({ error }) => {
                if (error) {
                    if (error.errCode === CE_ErrorCode.Auth_DuplicateEmail) {
                        setEmailError(s.duplicateEmailError);
                        return;
                    }

                    dispatchToast(
                        <Toast>
                            <ToastTitle>{s.sendRateLimitErrorMessage}</ToastTitle>
                        </Toast>,
                        {
                            position: "top-end",
                            intent: "info",
                        },
                    );
                } else {
                    dispatchToast(
                        <Toast>
                            <ToastTitle>{s.sendCodeSuccessMessage}</ToastTitle>
                            <ToastBody>{format(s.sendCodeSuccessDescription, email)}</ToastBody>
                        </Toast>,
                        {
                            position: "top-end",
                            intent: "success",
                            pauseOnHover: true,
                            pauseOnWindowBlur: true,
                        },
                    );
                }
            })
            .catch((error: Error) => {
                dispatchToast(
                    <Toast>
                        <ToastTitle>{s.sendCodeErrorMessage}</ToastTitle>
                        <ToastTitle>{error.message}</ToastTitle>
                    </Toast>,
                    {
                        position: "top-end",
                        intent: "error",
                    },
                );
            })
            .finally(() => {
                setSendingCode(false);
            });
    }, [dispatchToast, email, lang, recaptchaAsync, s, validateEmail]);

    const onSignUpButtonClick = React.useCallback(() => {
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        postSignUpRequestAsync(
            {
                username,
                email,
                password,
                emailVerificationCode,
                registrationCode: invitationCode,
            },
            recaptchaAsync,
        )
            .then(({ data, error }) => {
                if (error) {
                    const { errCode } = error;
                    switch (errCode) {
                        case CE_ErrorCode.Auth_DuplicateUsername:
                            setUsernameError(s.duplicateUsernameError);
                            break;
                        case CE_ErrorCode.Auth_DuplicateEmail:
                            setEmailError(s.duplicateEmailError);
                            break;
                        case CE_ErrorCode.Auth_InvalidEmailVerificationCode:
                            setEmailVerificationCodeError(s.invalidEmailVerificationCodeError);
                            break;
                        case CE_ErrorCode.Auth_InvalidateRegistrationCode:
                            setInvitationCodeError(s.invalidInvitationCodeError);
                            break;
                        default:
                            break;
                    }
                } else {
                    const { token, userBaseDetail } = data;
                    dispatch(updateBearerTokenAction(token));
                    dispatch(setAuthAction({ currentUser: userBaseDetail }));

                    dispatchToast(
                        <Toast>
                            <ToastTitle>
                                {format(s.welcomMessage, userBaseDetail.username, appName)}
                            </ToastTitle>
                        </Toast>,
                        {
                            position: "top-end",
                            intent: "success",
                            timeout: 2000,
                        },
                    );

                    navigate(redirectPath || CE_PageBaseRoute.Home);
                }
            })
            .catch((error: Error) => {
                dispatchToast(
                    <Toast>
                        <ToastTitle>{error.message}</ToastTitle>
                    </Toast>,
                    {
                        position: "top-end",
                        intent: "error",
                    },
                );
            })
            .finally(() => {
                setSubmitting(false);
            });
    }, [
        appName,
        dispatch,
        dispatchToast,
        email,
        emailVerificationCode,
        invitationCode,
        navigate,
        password,
        recaptchaAsync,
        redirectPath,
        s,
        username,
        validateForm,
    ]);

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
                                hint={s.usernameHint}
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
                                hint={s.passwordHint}
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
