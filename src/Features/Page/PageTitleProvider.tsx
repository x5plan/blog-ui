import * as React from "react";
import { Helmet } from "react-helmet-async";

import { useAppSelector } from "../Store/Store";
import { getPageTitle } from "./Selectors";

const siteName = "X5Plan Blog";

export const PageTitleProvider: React.FC = () => {
    const pageTitle = useAppSelector(getPageTitle);

    return (
        <Helmet>
            <title>{pageTitle ? `${pageTitle} - ${siteName}` : siteName}</title>
        </Helmet>
    );
};
