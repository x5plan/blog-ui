import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";

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
        <FluentProvider
            theme={themeMap[theme]}
            dir={isRtl ? "rtl" : "ltr"}
            style={{
                height: "100% !important",
                width: "100% !important",
            }}
        >
            <AppRouter>
                <AppLayout>
                    <AppView />
                </AppLayout>
            </AppRouter>
        </FluentProvider>
    );
};

export default App;
