import * as React from "react";
import { Helmet } from "react-helmet-async";

import { getCdnEndPoint, getTheme } from "../Environment/Selectors";
import { useAppSelector } from "../Store/Store";
import { CE_Theme } from "./Types";

const iconSizes = [16, 32, 48, 128, 192, 256];
const iosIconSizes = [152, 167, 180];

export const IconProvider: React.FC = () => {
    const theme = useAppSelector(getTheme);
    const cdnEndPoint = useAppSelector(getCdnEndPoint);
    const iconType = theme === CE_Theme.Light ? "light" : "dark";

    return (
        <Helmet>
            {iconSizes.map((size) => (
                <link
                    key={`icon-${iconType}-${size}`}
                    rel="icon"
                    type="image/png"
                    sizes={`${size}x${size}`}
                    href={`${cdnEndPoint}icon/${iconType}.${size}.png`}
                />
            ))}
            <link rel="icon" type="image/png" href={`${cdnEndPoint}icon/${iconType}.png`} />
            {iosIconSizes.map((size) => (
                <link
                    key={`icon-${iconType}-ios-${size}`}
                    rel="apple-touch-icon"
                    sizes={`${size}x${size}`}
                    href={`${cdnEndPoint}icon/${iconType}.${size}.png`}
                />
            ))}
            <link rel="apple-touch-icon" href={`${cdnEndPoint}icon/${iconType}.png`} />
        </Helmet>
    );
};
