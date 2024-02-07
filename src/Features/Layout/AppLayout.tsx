import "@/assets/styles/scrollbar.css";

import { mergeClasses } from "@fluentui/react-components";
import * as React from "react";

import { useIsMiniScreen, useIsSmallScreen } from "../Environment/Hooks";
import { AppHeader } from "./AppHeader";
import { useAppLayoutStyles } from "./Styles/AppLayoutStyles";

export interface IAppLayoutProps {
    children: React.ReactElement;
}

export const AppLayout: React.FC<IAppLayoutProps> = (props) => {
    const styles = useAppLayoutStyles();
    const isSmallScreen = useIsSmallScreen();
    const isMiniScreen = useIsMiniScreen();

    return (
        <div className={styles.root}>
            <div
                className={mergeClasses(
                    styles.header,
                    isSmallScreen && styles.headerSmallScreen,
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
                    <div className={styles.container}></div>
                </div>
            </div>
        </div>
    );
};
