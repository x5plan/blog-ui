import * as React from "react";

import { useIsSignedIn } from "../Auth/Hooks";
import { useIsMiddleScreen, useIsSmallScreen } from "../Environment/Hooks";
import { AppNavi } from "./AppNavi";
import { AppSideBarNavi } from "./AppSideBarNavi";
import { SignInButtons } from "./SignInButtons";
import { useAppHeaderStyles } from "./Styles/AppHeaderStyles";

export const AppHeader: React.FC = () => {
    const isMiddleScreen = useIsMiddleScreen();
    const isSmallScreen = useIsSmallScreen();
    const isSignedIn = useIsSignedIn();

    const styles = useAppHeaderStyles();

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.title}>X5Plan Blog</div>
                {!isMiddleScreen && <AppNavi isInSidebar={false} />}
            </div>
            <div className={styles.right}>
                {!isSmallScreen && !isSignedIn && <SignInButtons />}
                {isMiddleScreen && <AppSideBarNavi showSignInLinks={isSmallScreen} />}
            </div>
        </div>
    );
};
