import "@/assets/styles/scrollbar.css";

import { mergeClasses } from "@fluentui/react-components";
import * as React from "react";

import { RecaptchaCopyrightMessage } from "@/Common/Components/RecaptchaCopyrightMessage";
import { format } from "@/Common/Utilities/Format";

import { useIsMiddleScreen, useIsMiniScreen, useIsSmallScreen } from "../Environment/Hooks";
import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { AppHeader } from "./AppHeader";
import { useAppLayoutStyles } from "./Styles/AppLayoutStyles";

export interface IAppLayoutProps {
    children: React.ReactElement;
}

export const AppLayout: React.FC<IAppLayoutProps> = (props) => {
    const styles = useAppLayoutStyles();
    const isMiddleScreen = useIsMiddleScreen();
    const isSmallScreen = useIsSmallScreen();
    const isMiniScreen = useIsMiniScreen();

    const [s_appCopyright] = useLocalizedStrings(CE_Strings.APP_COPYRIGHT_TEXT);

    return (
        <div className={styles.root}>
            <div
                className={mergeClasses(
                    styles.header,
                    isMiddleScreen && styles.headerMiddleScreen,
                    isMiniScreen && styles.headerMiniScreen,
                )}
            >
                <div className={styles.container}>
                    <AppHeader />
                </div>
            </div>
            <div
                className={mergeClasses(
                    styles.body,
                    isSmallScreen && styles.bodySmallScreen,
                    isMiniScreen && styles.bodyMiniScreen,
                )}
            >
                <div className={styles.container}>{props.children}</div>
                <div className={styles.footer}>
                    <RecaptchaCopyrightMessage className={styles.footerText} />
                    <span className={styles.footerText}>
                        {format(s_appCopyright, new Date().getFullYear())}
                    </span>
                </div>
            </div>
        </div>
    );
};
