import * as React from "react";
import { NotFoundBoundary, View } from "react-navi";

import { ErrorPage } from "../Error/ErrorPage";
import { useLocalizedString } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";

export const AppView: React.FC = () => {
    const notFoundErrorMessage = useLocalizedString(CE_Strings.INVALID_URL_MSG);

    return (
        <React.Suspense fallback={null}>
            <NotFoundBoundary
                render={() => <ErrorPage message={notFoundErrorMessage} showBackButton={true} />}
            >
                <View />
            </NotFoundBoundary>
        </React.Suspense>
    );
};
