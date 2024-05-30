import * as React from "react";
import { Helmet } from "react-helmet-async";

import iconDark16 from "@/assets/icons/dark.16.png";
import iconDark32 from "@/assets/icons/dark.32.png";
import iconDark48 from "@/assets/icons/dark.48.png";
import iconDark128 from "@/assets/icons/dark.128.png";
import iconDark152 from "@/assets/icons/dark.152.png";
import iconDark167 from "@/assets/icons/dark.167.png";
import iconDark180 from "@/assets/icons/dark.180.png";
import iconDark192 from "@/assets/icons/dark.192.png";
import iconDark256 from "@/assets/icons/dark.256.png";
import iconDark from "@/assets/icons/dark.png";
import iconLight16 from "@/assets/icons/light.16.png";
import iconLight32 from "@/assets/icons/light.32.png";
import iconLight48 from "@/assets/icons/light.48.png";
import iconLight128 from "@/assets/icons/light.128.png";
import iconLight152 from "@/assets/icons/light.152.png";
import iconLight167 from "@/assets/icons/light.167.png";
import iconLight180 from "@/assets/icons/light.180.png";
import iconLight192 from "@/assets/icons/light.192.png";
import iconLight256 from "@/assets/icons/light.256.png";
import iconLight from "@/assets/icons/light.png";

import { getTheme } from "../../Features/Environment/Selectors";
import { useAppSelector } from "../../Features/Store/Store";
import { CE_Theme } from "../../Features/Theme/Types";

const iconSizes = [16, 32, 48, 128, 192, 256];
const iosIconSizes = [152, 167, 180];

export const IconProvider: React.FC = () => {
    const theme = useAppSelector(getTheme);
    const isLight = theme === CE_Theme.Light;

    const icons = React.useMemo<Record<string, string>>(
        () => ({
            "16": isLight ? iconLight16 : iconDark16,
            "32": isLight ? iconLight32 : iconDark32,
            "48": isLight ? iconLight48 : iconDark48,
            "128": isLight ? iconLight128 : iconDark128,
            "152": isLight ? iconLight152 : iconDark152,
            "167": isLight ? iconLight167 : iconDark167,
            "180": isLight ? iconLight180 : iconDark180,
            "192": isLight ? iconLight192 : iconDark192,
            "256": isLight ? iconLight256 : iconDark256,
        }),
        [isLight],
    );

    return (
        <Helmet>
            {iconSizes.map((size) => (
                <link
                    key={icons[size]}
                    rel="icon"
                    type="image/png"
                    sizes={`${size}x${size}`}
                    href={icons[size]}
                />
            ))}
            <link rel="icon" type="image/png" href={isLight ? iconLight : iconDark} />
            {iosIconSizes.map((size) => (
                <link
                    key={icons[size]}
                    rel="apple-touch-icon"
                    sizes={`${size}x${size}`}
                    href={icons[size]}
                />
            ))}
            <link rel="apple-touch-icon" href={isLight ? iconLight : iconDark} />
        </Helmet>
    );
};
