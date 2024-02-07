import { mergeClasses, Tab, TabList } from "@fluentui/react-components";
import * as React from "react";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { useAppNaviStyles } from "./Styles/AppNaviStyles";

export interface IAppNaviProps {
    isInSidebar: boolean;
}

export const AppNavi: React.FC<IAppNaviProps> = (props) => {
    const { isInSidebar } = props;

    const [c_homePageString, c_articlePageString, c_navigationSectionTitleString] =
        useLocalizedStrings(
            CE_Strings.HOME_PAGE_TITLE,
            CE_Strings.ARTICLE_PAGE_TITLE,
            CE_Strings.NAVIGATION_SECTION_TITLE,
        );

    const styles = useAppNaviStyles();

    return (
        <div className={mergeClasses(styles.root, isInSidebar && styles.inSideBarRoot)}>
            <TabList
                aria-label={c_navigationSectionTitleString}
                vertical={isInSidebar}
                appearance={isInSidebar ? "subtle" : "transparent"}
                className={styles.tabList}
            >
                <Tab value="home" aria-label={c_homePageString}>
                    {c_homePageString}
                </Tab>
                <Tab value="articles" aria-label={c_articlePageString}>
                    {c_articlePageString}
                </Tab>
            </TabList>
        </div>
    );
};
