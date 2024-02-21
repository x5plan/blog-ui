import { Button } from "@fluentui/react-components";
import { Navigation24Regular } from "@fluentui/react-icons";
import * as React from "react";

import { useIsSignedIn } from "../Auth/Hooks";
import { getAppName } from "../Config/Selectors";
import { useIsMiddleScreen, useIsSmallScreen } from "../Environment/Hooks";
import { useAppSelector } from "../Store/Store";
import { AppNavi } from "./AppNavi";
import { loadAppSideBarNavi, loadUserMenu } from "./DynimicImports";
import { SignInButtons } from "./SignInButtons";
import { useAppHeaderStyles } from "./Styles/AppHeaderStyles";

const AppSideBarNaviLazy = React.lazy(loadAppSideBarNavi);
const UserMenuLazy = React.lazy(loadUserMenu);

export const AppHeader: React.FC = () => {
    const isMiddleScreen = useIsMiddleScreen();
    const isSmallScreen = useIsSmallScreen();
    const isSignedIn = useIsSignedIn();

    const styles = useAppHeaderStyles();

    const appName = useAppSelector(getAppName);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.title}>{appName}</div>
                {!isMiddleScreen && <AppNavi isInSidebar={false} />}
            </div>
            <div className={styles.right}>
                {isSignedIn && (
                    <React.Suspense fallback={null}>
                        <UserMenuLazy />
                    </React.Suspense>
                )}
                {!isSmallScreen && !isSignedIn && <SignInButtons />}
                {isMiddleScreen && (
                    <React.Suspense
                        fallback={
                            <Button
                                appearance="transparent"
                                icon={<Navigation24Regular />}
                                disabled={true}
                            />
                        }
                    >
                        <AppSideBarNaviLazy showSignInLinks={isSmallScreen} />
                    </React.Suspense>
                )}
            </div>
        </div>
    );
};
