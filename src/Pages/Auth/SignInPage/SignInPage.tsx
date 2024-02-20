import { Button, Input } from "@fluentui/react-components";
import { PasswordFilled, PersonFilled } from "@fluentui/react-icons";
import * as React from "react";

import { useLocalizedString, useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

import { useSignInPageStyles } from "./SignInPageStyles";

export const SignInPage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.SIGN_IN_TITLE);
    useSetPageMeta(pageTitle, null);

    const styles = useSignInPageStyles();

    const [c_usernamePlaceholder, c_passwordPlaceholder, c_usernameAriaLabel, c_passwordAriaLabel] =
        useLocalizedStrings(
            CE_Strings.SIGN_IN_USERNAME_PLACEHOLDER,
            CE_Strings.SIGN_IN_PASSWORD_PLACEHOLDER,
            CE_Strings.SIGN_IN_USERNAME_ARIA_LABEL,
            CE_Strings.SIGN_IN_PASSWORD_ARIA_LABEL,
        );

    const onSignInButtonClick = React.useCallback(() => {}, []);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.title}>{pageTitle}</div>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <Input
                            contentBefore={<PersonFilled />}
                            placeholder={c_usernamePlaceholder}
                            aria-label={c_usernameAriaLabel}
                            type="text"
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            contentBefore={<PasswordFilled />}
                            placeholder={c_passwordPlaceholder}
                            aria-label={c_passwordAriaLabel}
                            type="password"
                        />
                    </div>

                    <div className={styles.field}>
                        <Button appearance="primary" type="button" onClick={onSignInButtonClick}>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
