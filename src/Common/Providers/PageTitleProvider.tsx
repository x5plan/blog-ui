import * as React from "react";
import { Helmet } from "react-helmet-async";

import { getPageTitle } from "../../Features/Page/Selectors";
import { useAppSelector } from "../../Features/Store/Store";

export const PageTitleProvider: React.FC = () => {
    const pageTitle = useAppSelector(getPageTitle);
    const siteName = useAppSelector((state) => state.config.appName);

    return (
        <Helmet>
            <title>{pageTitle ? `${pageTitle} - ${siteName}` : siteName}</title>
        </Helmet>
    );
};
