import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";
import { Outlet } from "react-router-dom";

import { AppToastProvider } from "./Common/Providers/AppToastProvider";
import { IconProvider } from "./Common/Providers/IconProvider";
import { PageTitleProvider } from "./Common/Providers/PageTitleProvider";
import { RecaptchaProvider } from "./Common/Providers/RecaptchaProvider";
import { StylesProvider } from "./Common/Providers/StylesProvider";
import { getTheme } from "./Features/Environment/Selectors";
import { AppLayout } from "./Features/Layout/AppLayout";
import { useIsRtl } from "./Features/LocalizedString/Hooks";
import { AppRouter } from "./Features/Router/Router";
import { useAppSelector } from "./Features/Store/Store";
import { themeMap } from "./Features/Theme/Theme";

export const App: React.FC = () => {
    const theme = useAppSelector(getTheme);
    const isRtl = useIsRtl();

    return (
        <FluentProvider
            theme={themeMap[theme]}
            dir={isRtl ? "rtl" : "ltr"}
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <RecaptchaProvider>
                <PageTitleProvider />
                <IconProvider />
                <StylesProvider />
                <AppToastProvider>
                    <AppRouter>
                        <AppLayout>
                            <Outlet />
                        </AppLayout>
                    </AppRouter>
                </AppToastProvider>
            </RecaptchaProvider>
        </FluentProvider>
    );
};

export default App;
