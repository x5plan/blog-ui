import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";

import { getTheme } from "./Features/Environment/Selectors";
import { useIsRtl } from "./Features/LocalizedString/Hooks";
import { useAppSelector } from "./Features/Store/Store";
import { themeMap } from "./Features/Theme/Theme";

export const App: React.FC = () => {
    const theme = useAppSelector(getTheme);
    const isRtl = useIsRtl();

    return (
        <FluentProvider theme={themeMap[theme]} dir={isRtl ? "rtl" : "ltr"}>
            <div />
        </FluentProvider>
    );
};

export default App;
