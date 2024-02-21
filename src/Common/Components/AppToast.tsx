import { Toaster, useId } from "@fluentui/react-components";
import * as React from "react";

import { useIsMiddleScreen, useIsMiniScreen } from "@/Features/Environment/Hooks";

export interface IToastProviderProps {
    children: React.ReactElement;
}

export const AppToastContext = React.createContext<string>(null);

export const AppToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
    const id = useId("toaster");

    const isMiddleScreen = useIsMiddleScreen();
    const isMiniScreen = useIsMiniScreen();

    return (
        <AppToastContext.Provider value={id}>
            {children}
            <Toaster
                toasterId={id}
                offset={{
                    vertical: 50,
                    horizontal: isMiniScreen ? 10 : isMiddleScreen ? 20 : 40,
                }}
            />
        </AppToastContext.Provider>
    );
};
