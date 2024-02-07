import * as React from "react";

import { useIsMobileView } from "../Environment/Hooks";
import { AppNavi } from "./AppNavi";
import { AppSideBarNavi } from "./AppSideBarNavi";
import { useAppHeaderStyles } from "./Styles/AppHeaderStyles";

export const AppHeader: React.FC = () => {
    const isMobileView = useIsMobileView();
    const styles = useAppHeaderStyles();

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.title}>X5Plan Blog</div>
                {!isMobileView && <AppNavi isInSidebar={false} />}
            </div>
            <div className={styles.right}>{isMobileView && <AppSideBarNavi />}</div>
        </div>
    );
};
