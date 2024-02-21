import { Button, Field, Input, Spinner } from "@fluentui/react-components";
import { PasswordFilled, PersonFilled } from "@fluentui/react-icons";
import * as React from "react";
import { useNavigation } from "react-navi";

import { RouterLink } from "@/Common/Components/RouterLink";
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

    const [
        c_usernamePlaceholder,
        c_passwordPlaceholder,
        c_usernameAriaLabel,
        c_passwordAriaLabel,
        c_signUpTitle,
        c_forgotPasswordLink,
        c_noSuchUserError,
        c_wrongPasswordError,
        c_emptyUsernameError,
        c_emptyPasswordError,
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
    );

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameError, setUsernameError] = React.useState<string>(null);
    const [passwordError, setPasswordError] = React.useState<string>(null);
    const [loading, setLoading] = React.useState(false);

    const validateForm = React.useCallback(() => {
        let isSuccessful = true;

        if (!username) {
            setUsernameError(c_emptyUsernameError);
            isSuccessful = false;
        }

        if (username && !isUsername(username)) {
            setUsernameError(c_noSuchUserError);
            isSuccessful = false;
        }

        if (!password) {
            setPasswordError(c_emptyPasswordError);
            isSuccessful = false;
        }

        return isSuccessful;
    }, [c_emptyPasswordError, c_emptyUsernameError, c_noSuchUserError, password, username]);

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
                        setUsernameError(c_noSuchUserError);
                    } else if (error.errCode === CE_ErrorCode.Auth_WrongPassword) {
                        setPasswordError(c_wrongPasswordError);
                    }
                } else {
                    dispatch(updateBearerTokenAction(data.token));
                    dispatch(setAuthAction({ currentUser: data.userBaseDetail }));
                    navigation.navigate(props.redirectPath || CE_PageBaseRoute.Home);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [
        c_noSuchUserError,
        c_wrongPasswordError,
        dispatch,
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
                            placeholder={c_usernamePlaceholder}
                            aria-label={c_usernameAriaLabel}
                            type="text"
                            disabled={loading}
                            value={username}
                            onChange={(e, { value }) => setUsername(value)}
                        />
                    </Field>

                    <Field validationMessage={passwordError}>
                        <Input
                            contentBefore={<PasswordFilled />}
                            placeholder={c_passwordPlaceholder}
                            aria-label={c_passwordAriaLabel}
                            type="password"
                            disabled={loading}
                            value={password}
                            onChange={(e, { value }) => setPassword(value)}
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
                    <RouterLink href={CE_PageBaseRoute.SignUp}>{c_signUpTitle}</RouterLink>
                    <RouterLink href={CE_PageBaseRoute.ResetPassword}>
                        {c_forgotPasswordLink}
                    </RouterLink>
                </div>
            </div>
        </div>
    );
};
