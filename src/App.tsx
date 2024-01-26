import { FluentProvider } from "@fluentui/react-components";
import * as React from "react";

import { getTheme } from "./Features/Environment/Selectors";
import { useAppSelector } from "./Features/Store/Store";
import { themeMap } from "./Features/Theme/Theme";

export const App: React.FC = () => {
    const theme = useAppSelector(getTheme);

    return (
        <FluentProvider theme={themeMap[theme]}>
            <div />
        </FluentProvider>
    );
};

export default App;
