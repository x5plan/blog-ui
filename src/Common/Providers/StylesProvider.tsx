import * as React from "react";
import { Helmet } from "react-helmet-async";

import { getTheme } from "@/Features/Environment/Selectors";
import { useAppSelector } from "@/Features/Store/Store";
import { CE_Theme } from "@/Features/Theme/Types";

export const StylesProvider: React.FC = () => {
    const theme = useAppSelector(getTheme);

    const highlightStyle = React.useMemo(() => {
        switch (theme) {
            case CE_Theme.HighContrast:
                return getStyleUrl("prism-atom-dark");

            case CE_Theme.Dark:
                return getStyleUrl("prism-dracula");

            case CE_Theme.Light:
            default:
                return getStyleUrl("prism-one-light");
        }
    }, [theme]);

    return (
        <Helmet>
            <link rel="stylesheet" href={highlightStyle} />
        </Helmet>
    );
};

function getStyleUrl(styleName: string) {
    // This is a relative path, so it will be resolved to the current file's path
    return new URL(`../../assets/styles/${styleName}.css`, import.meta.url).href;
}
