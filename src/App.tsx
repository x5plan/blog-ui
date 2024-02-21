import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";

import { AppToastProvider } from "./Common/Components/AppToast";
import { getTheme } from "./Features/Environment/Selectors";
import { AppLayout } from "./Features/Layout/AppLayout";
import { useIsRtl } from "./Features/LocalizedString/Hooks";
import { PageTitleProvider } from "./Features/Page/PageTitleProvider";
import { AppRouter } from "./Features/Router/Router";
import { AppView } from "./Features/Router/View";
import { useAppSelector } from "./Features/Store/Store";
import { IconProvider } from "./Features/Theme/IconProvider";
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
    );
};

export default App;
