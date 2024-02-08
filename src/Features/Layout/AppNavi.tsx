import { mergeClasses, Tab, TabList } from "@fluentui/react-components";
import { DocumentBulletList20Regular, Home20Filled } from "@fluentui/react-icons";
import * as React from "react";
import { useNavigation } from "react-navi";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { usePageType } from "../Page/Hooks";
import { CE_PageType } from "../Page/Types";
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

    const [c_homePageString, c_articlePageString, c_navigationSectionTitleString] =
        useLocalizedStrings(
            CE_Strings.HOME_PAGE_TITLE,
            CE_Strings.ARTICLE_PAGE_TITLE,
            CE_Strings.NAVIGATION_SECTION_TITLE,
        );

    const styles = useAppNaviStyles();
    const pageType = usePageType();
    const navigation = useNavigation();

    const navList = React.useMemo<INavItem[]>(
        () => [
            {
                label: c_homePageString,
                icon: <Home20Filled />,
                type: CE_PageType.Home,
                path: "/",
            },
            {
                label: c_articlePageString,
                icon: <DocumentBulletList20Regular />,
                type: CE_PageType.Article,
                path: "/article",
            },
        ],
        [c_homePageString, c_articlePageString],
    );

    return (
        <div className={mergeClasses(styles.root, isInSidebar && styles.inSideBarRoot)}>
            <TabList
                aria-label={c_navigationSectionTitleString}
                vertical={isInSidebar}
                appearance={isInSidebar ? "subtle" : "transparent"}
                className={styles.tabList}
                selectedValue={pageType}
            >
                {navList.map((navItem) => (
                    <Tab
                        key={navItem.type}
                        value={navItem.type}
                        aria-label={navItem.label}
                        onClick={() => {
                            navigation.navigate(navItem.path);
                            onItemClicked?.();
                        }}
                        icon={navItem.icon}
                        className={mergeClasses(isInSidebar && styles.inSideBarItem)}
                    >
                        {navItem.label}
                    </Tab>
                ))}
            </TabList>
        </div>
    );
};
