import * as React from "react";
import { Helmet } from "react-helmet-async";

import { getAppName } from "@/Features/Config/Selectors";

import { getPageTitle } from "../../Features/Page/Selectors";
import { useAppSelector } from "../../Features/Store/Store";

export const PageTitleProvider: React.FC = () => {
    const pageTitle = useAppSelector(getPageTitle);
    const siteName = useAppSelector(getAppName);

    return (
        <Helmet>
            <title>{pageTitle ? `${pageTitle} - ${siteName}` : siteName}</title>
        </Helmet>
    );
};
