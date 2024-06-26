import {
    Link,
    makeStyles,
    MessageBar,
    MessageBarBody,
    MessageBarTitle,
    shorthands,
    tokens,
} from "@fluentui/react-components";
import { ErrorCircle48Filled } from "@fluentui/react-icons";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { RouterLink } from "@/Common/Components/RouterLink";
import { flex } from "@/Common/Styles/Flex";

import { useLocalizedString } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";

export interface IErrorPageLink {
    title: string;
    href: string | URL;
}

export interface IErrorPageProps {
    message: string;
    description?: string;
    /**
     * A list of links to display on the error page.
     * Users can click on these to navigate to other parts of the app.
     */
    links?: IErrorPageLink[];
    /**
     * Whether to show a back button to navigate to the previous page.
     * @default false
     */
    showBackButton?: boolean;

    /**
     * Whether to show a refresh button to reload the page.
     * @default false
     */
    showRefreshButton?: boolean;
}

export const useStyle = makeStyles({
    title: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "14px",
    },
    linkContainer: {
        ...flex({
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
        }),
        marginTop: "4px",
        ...shorthands.gap("6px"),
    },
    linkDivider: {
        minWidth: "2px",
        minHeight: "14px",
        backgroundColor: tokens.colorNeutralForegroundDisabled,
    },
});

export const ErrorPage: React.FC<IErrorPageProps> = (props) => {
    const {
        message,
        description,
        links = [],
        showBackButton = false,
        showRefreshButton = false,
    } = props;

    const styles = useStyle();
    const backButtonString = useLocalizedString(CE_Strings.COMMON_BACK_BUTTON);
    const refreshButtonString = useLocalizedString(CE_Strings.COMMON_REFRESH_BUTTON);
    const navigate = useNavigate();

    const showLinks = (links && links.length > 0) || showBackButton;

    const linkElements = React.useMemo(() => {
        const elements = links.map((link, index) => (
            <RouterLink key={"link" + index} href={link.href.toString()}>
                {link.title}
            </RouterLink>
        ));

        if (showRefreshButton) {
            elements.push(
                <Link
                    key={"link-refresh"}
                    as={"a"}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.reload();
                    }}
                    onKeyDown={(e) => {
                        if (e.code === "Enter" || e.code === "Space") {
                            e.preventDefault();
                            window.location.reload();
                        }
                    }}
                >
                    {refreshButtonString}
                </Link>,
            );
        }

        if (showBackButton) {
            elements.push(
                <Link
                    key={"link-back"}
                    as={"a"}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === "Enter" || e.code === "Space") {
                            e.preventDefault();
                            navigate(-1);
                        }
                    }}
                >
                    {backButtonString}
                </Link>,
            );
        }

        return elements;
    }, [backButtonString, links, navigate, refreshButtonString, showBackButton, showRefreshButton]);

    return (
        <div>
            <MessageBar
                layout="multiline"
                intent="error"
                politeness="polite"
                shape="square"
                icon={<ErrorCircle48Filled />}
            >
                <MessageBarBody>
                    <MessageBarTitle className={styles.title}>{message}</MessageBarTitle>
                    {description && <div className={styles.description}>{description}</div>}
                    {showLinks && (
                        <div className={styles.linkContainer}>
                            {linkElements.reduce(
                                (pre, cur, index) => [
                                    ...pre,
                                    cur,
                                    index < linkElements.length - 1 && (
                                        <span
                                            className={styles.linkDivider}
                                            key={"divider" + index}
                                        />
                                    ),
                                ],
                                [],
                            )}
                        </div>
                    )}
                </MessageBarBody>
            </MessageBar>
        </div>
    );
};
