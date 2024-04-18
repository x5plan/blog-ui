import { Button } from "@fluentui/react-components";
import { Navigation24Regular } from "@fluentui/react-icons";
import * as React from "react";

import { format } from "@/Common/Utilities/Format";

import { useIsSignedIn } from "../Auth/Hooks";
import { getAppName } from "../Config/Selectors";
import { useIsMiddleScreen, useIsSmallScreen } from "../Environment/Hooks";
import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { CE_PageBaseRoute } from "../Page/Types";
import { useCreateNavigateOnClick } from "../Router/Hooks";
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
    const createNavigateOnClick = useCreateNavigateOnClick();
    const [s_homePageString, s_navigationAriaLabelString] = useLocalizedStrings(
        CE_Strings.HOME_PAGE_TITLE,
        CE_Strings.NAVIGATION_ARIA_LABEL,
    );

    const styles = useAppHeaderStyles();

    const appName = useAppSelector(getAppName);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <Button
                    className={styles.title}
                    onClick={createNavigateOnClick(CE_PageBaseRoute.Home)}
                    appearance="subtle"
                    aria-label={format(s_navigationAriaLabelString, s_homePageString)}
                >
                    {appName}
                </Button>
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
                        <AppSideBarNaviLazy showSignInLinks={isSmallScreen && !isSignedIn} />
                    </React.Suspense>
                )}
            </div>
        </div>
    );
};
