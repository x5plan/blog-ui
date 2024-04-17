import { Button, Field, Input } from "@fluentui/react-components";
import * as React from "react";

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
    });

    useSetPageMeta(s.pageTitle, null);

    const isSmallScreen = useIsSmallScreen();
    const styles = useSignUpPageStypes();
    const fieldsCls = isSmallScreen ? styles.fieldsColumn : styles.fieldsRow;

    // TODO: Implement form submission

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.title}>{s.pageTitle}</div>
                <form className={styles.form}>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.username}>
                                <Input />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.invitationCode}>
                                <Input />
                            </Field>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.email}>
                                <Input type="email" />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.emailVerificationCode}>
                                <Input />
                            </Field>
                            <Button className={styles.sendButton} aria-label={s.sendButtonLabel}>
                                {s.sendButton}
                            </Button>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.password}>
                                <Input type="password" />
                            </Field>
                        </div>
                        <div className={styles.fieldContainer}>
                            <Field className={styles.field} label={s.confirmPassword}>
                                <Input type="password" />
                            </Field>
                        </div>
                    </div>
                    <div className={fieldsCls}>
                        <Button appearance="primary">{s.pageTitle}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
