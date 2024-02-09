import { Button } from "@fluentui/react-button";
import React from "react";
import { useNavigation } from "react-navi";

import { RouterLink } from "@/Common/Components/RouterLink";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { CE_PageBaseRoute } from "../Page/Types";
import { useSignInButtonsStyles, useSignInLinksStyles } from "./Styles/SignInButtonsStyles";

export const SignInButtons: React.FC = () => {
    const [c_signInTitle, c_signUpTitle] = useLocalizedStrings(
        CE_Strings.SIGN_IN_TITLE,
        CE_Strings.SIGN_UP_TITLE,
    );

    const styles = useSignInButtonsStyles();
    const navigation = useNavigation();

    return (
        <div className={styles.root}>
            <Button
                appearance="primary"
                className={styles.button}
                onClick={() => {
                    navigation.navigate(CE_PageBaseRoute.SignIn);
                }}
            >
                {c_signInTitle}
            </Button>
            <Button
                className={styles.button}
                onClick={() => {
                    navigation.navigate(CE_PageBaseRoute.SignUp);
                }}
            >
                {c_signUpTitle}
            </Button>
        </div>
    );
};

export interface ISignInLinksProps {
    onLinkClicked?: () => void;
}

export const SignInLinks: React.FC<ISignInLinksProps> = (props) => {
    const { onLinkClicked } = props;

    const [c_signInTitle, c_signUpTitle] = useLocalizedStrings(
        CE_Strings.SIGN_IN_TITLE,
        CE_Strings.SIGN_UP_TITLE,
    );

    const styles = useSignInLinksStyles();

    return (
        <div className={styles.root}>
            <RouterLink href={CE_PageBaseRoute.SignIn} onClick={onLinkClicked}>
                {c_signInTitle}
            </RouterLink>
            <RouterLink href={CE_PageBaseRoute.SignUp} onClick={onLinkClicked}>
                {c_signUpTitle}
            </RouterLink>
        </div>
    );
};
