import { Button, Field, Input, Spinner, Toast, ToastTitle } from "@fluentui/react-components";
import { PasswordFilled, PersonFilled } from "@fluentui/react-icons";
import * as React from "react";
import { useNavigation } from "react-navi";

import { RouterLink } from "@/Common/Components/RouterLink";
import { useAppToastController } from "@/Common/Hooks/AppToast";
import { format } from "@/Common/Utilities/Format";
import { isUsername } from "@/Common/Validators/Username";
import { setAuthAction, updateBearerTokenAction } from "@/Features/Auth/Actions";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";
import { useLocalizedString, useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageBaseRoute } from "@/Features/Page/Types";
import { useAppDispatch } from "@/Features/Store/Store";

import { postSignInRequestAsync } from "./Request";
import { useSignInPageStyles } from "./SignInPageStyles";

export interface ISignInPageProps {
    redirectPath?: string;
}

export const SignInPage: React.FC<ISignInPageProps> = (props) => {
    const pageTitle = useLocalizedString(CE_Strings.SIGN_IN_TITLE);
    useSetPageMeta(pageTitle, null);

    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const styles = useSignInPageStyles();
    const { dispatchToast } = useAppToastController();

    const passwordRef = React.useRef<HTMLInputElement>(null);

    const [
        s_usernamePlaceholder,
        s_passwordPlaceholder,
        s_usernameAriaLabel,
        s_passwordAriaLabel,
        s_signUpTitle,
        s_forgotPasswordLink,
        s_noSuchUserError,
        s_wrongPasswordError,
        s_emptyUsernameError,
        s_emptyPasswordError,
        s_welcomeMessage,
    ] = useLocalizedStrings(
        CE_Strings.SIGN_IN_USERNAME_PLACEHOLDER,
        CE_Strings.SIGN_IN_PASSWORD_PLACEHOLDER,
        CE_Strings.SIGN_IN_USERNAME_ARIA_LABEL,
        CE_Strings.SIGN_IN_PASSWORD_ARIA_LABEL,
        CE_Strings.SIGN_UP_TITLE,
        CE_Strings.FORGOT_PASSWORD_LINK,
        CE_Strings.SIGN_IN_NO_SUCH_USER_ERROR,
        CE_Strings.SIGN_IN_WRONG_PASSWORD_ERROR,
        CE_Strings.SIGN_IN_EMPTY_USERNAME_ERROR,
        CE_Strings.SIGN_IN_EMPTY_PASSWORD_ERROR,
        CE_Strings.SIGN_IN_WELCOME_MESSAGE,
    );

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameError, setUsernameError] = React.useState<string>(null);
    const [passwordError, setPasswordError] = React.useState<string>(null);
    const [loading, setLoading] = React.useState(false);

    const validateForm = React.useCallback(() => {
        let isSuccessful = true;

        if (!username) {
            setUsernameError(s_emptyUsernameError);
            isSuccessful = false;
        }

        if (username && !isUsername(username)) {
            setUsernameError(s_noSuchUserError);
            isSuccessful = false;
        }

        if (!password) {
            setPasswordError(s_emptyPasswordError);
            isSuccessful = false;
        }

        return isSuccessful;
    }, [s_emptyPasswordError, s_emptyUsernameError, s_noSuchUserError, password, username]);

    const onSignInButtonClick = React.useCallback(() => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        setUsernameError(null);
        setPasswordError(null);

        postSignInRequestAsync({ username, password }, "")
            .then(({ data, error }) => {
                if (error) {
                    if (error.errCode === CE_ErrorCode.Auth_NoSuchUser) {
                        setUsernameError(s_noSuchUserError);
                    } else if (error.errCode === CE_ErrorCode.Auth_WrongPassword) {
                        setPasswordError(s_wrongPasswordError);
                    }
                    return;
                }

                const { token, userBaseDetail } = data;

                dispatch(updateBearerTokenAction(token));
                dispatch(setAuthAction({ currentUser: userBaseDetail }));
                dispatchToast(
                    <Toast>
                        <ToastTitle>
                            {format(
                                s_welcomeMessage,
                                userBaseDetail.nickname || userBaseDetail.username,
                            )}
                        </ToastTitle>
                    </Toast>,
                    {
                        position: "top-end",
                        intent: "success",
                        timeout: 2000,
                    },
                );
                navigation.navigate(props.redirectPath || CE_PageBaseRoute.Home);
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
                setLoading(false);
            });
    }, [
        s_noSuchUserError,
        s_welcomeMessage,
        s_wrongPasswordError,
        dispatch,
        dispatchToast,
        navigation,
        password,
        props.redirectPath,
        username,
        validateForm,
    ]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.title}>{pageTitle}</div>
                <form className={styles.form}>
                    <Field validationMessage={usernameError}>
                        <Input
                            contentBefore={<PersonFilled />}
                            placeholder={s_usernamePlaceholder}
                            aria-label={s_usernameAriaLabel}
                            type="text"
                            disabled={loading}
                            value={username}
                            onChange={(e, { value }) => setUsername(value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    passwordRef.current.focus();
                                }
                            }}
                        />
                    </Field>

                    <Field validationMessage={passwordError}>
                        <Input
                            contentBefore={<PasswordFilled />}
                            placeholder={s_passwordPlaceholder}
                            aria-label={s_passwordAriaLabel}
                            type="password"
                            disabled={loading}
                            value={password}
                            onChange={(e, { value }) => setPassword(value)}
                            ref={passwordRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onSignInButtonClick();
                                }
                            }}
                        />
                    </Field>

                    <Button
                        appearance="primary"
                        type="button"
                        disabled={loading}
                        onClick={onSignInButtonClick}
                    >
                        {loading ? <Spinner size="tiny" /> : pageTitle}
                    </Button>
                </form>
                <div className={styles.links}>
                    <RouterLink href={CE_PageBaseRoute.SignUp}>{s_signUpTitle}</RouterLink>
                    <RouterLink href={CE_PageBaseRoute.ResetPassword}>
                        {s_forgotPasswordLink}
                    </RouterLink>
                </div>
            </div>
        </div>
    );
};
