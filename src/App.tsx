import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";

import { AppToastProvider } from "./Common/Providers/AppToastProvider";
import { IconProvider } from "./Common/Providers/IconProvider";
import { PageTitleProvider } from "./Common/Providers/PageTitleProvider";
import { RecaptchaProvider } from "./Common/Providers/RecaptchaProvider";
import { getTheme } from "./Features/Environment/Selectors";
import { AppLayout } from "./Features/Layout/AppLayout";
import { useIsRtl } from "./Features/LocalizedString/Hooks";
import { AppRouter } from "./Features/Router/Router";
import { AppView } from "./Features/Router/View";
import { useAppSelector } from "./Features/Store/Store";
import { themeMap } from "./Features/Theme/Theme";

export const App: React.FC = () => {
    const theme = useAppSelector(getTheme);
    const isRtl = useIsRtl();

    return (
        <RecaptchaProvider>
            <FluentProvider
                theme={themeMap[theme]}
                dir={isRtl ? "rtl" : "ltr"}
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <PageTitleProvider />
                <IconProvider />
                <AppToastProvider>
                    <AppRouter>
                        <AppLayout>
                            <AppView />
                        </AppLayout>
                    </AppRouter>
                </AppToastProvider>
            </FluentProvider>
        </RecaptchaProvider>
    );
};

export default App;
