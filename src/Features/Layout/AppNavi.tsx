import { mergeClasses, Tab, TabList } from "@fluentui/react-components";
import { DocumentBulletList20Regular, Home20Filled } from "@fluentui/react-icons";
import * as React from "react";

import { format } from "@/Common/Utilities/Format";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { usePageType } from "../Page/Hooks";
import { CE_PageType } from "../Page/Types";
import { useCreateNavigateOnClick } from "../Router/Hooks";
import { useAppNaviStyles } from "./Styles/AppNaviStyles";

export interface IAppNaviProps {
    isInSidebar: boolean;
    onItemClicked?: () => void;
}

interface INavItem {
    label: string;
    icon: JSX.Element;
    type: CE_PageType;
    path: string;
}

export const AppNavi: React.FC<IAppNaviProps> = (props) => {
    const { isInSidebar, onItemClicked } = props;

    const [
        s_homePageString,
        s_articlePageString,
        s_navigationSectionTitleString,
        s_navigationAriaLabelString,
    ] = useLocalizedStrings(
        CE_Strings.HOME_PAGE_TITLE,
        CE_Strings.ARTICLE_PAGE_TITLE,
        CE_Strings.NAVIGATION_SECTION_TITLE,
        CE_Strings.NAVIGATION_ARIA_LABEL,
    );

    const styles = useAppNaviStyles();
    const pageType = usePageType();
    const createNavigateOnClick = useCreateNavigateOnClick();

    const navList = React.useMemo<INavItem[]>(
        () => [
            {
                label: s_homePageString,
                icon: <Home20Filled />,
                type: CE_PageType.Home,
                path: "/",
            },
            {
                label: s_articlePageString,
                icon: <DocumentBulletList20Regular />,
                type: CE_PageType.Article,
                path: "/article",
            },
        ],
        [s_homePageString, s_articlePageString],
    );

    return (
        <div className={mergeClasses(styles.root, isInSidebar && styles.inSideBarRoot)}>
            <TabList
                aria-label={s_navigationSectionTitleString}
                vertical={isInSidebar}
                appearance={isInSidebar ? "subtle" : "transparent"}
                className={mergeClasses(styles.tabList, isInSidebar && styles.inSideBarTabList)}
                selectedValue={pageType}
                role="navigation"
            >
                {navList.map((navItem) => (
                    <Tab
                        key={navItem.type}
                        value={navItem.type}
                        aria-label={format(s_navigationAriaLabelString, navItem.label)}
                        onClick={createNavigateOnClick(navItem.path, false, false, () => {
                            onItemClicked?.();
                        })}
                        icon={navItem.icon}
                        className={mergeClasses(isInSidebar && styles.inSideBarItem)}
                        role="link"
                    >
                        {navItem.label}
                    </Tab>
                ))}
            </TabList>
        </div>
    );
};
