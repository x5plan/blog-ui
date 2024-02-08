import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { initAuthAction } from "@/Features/Auth/InitAuthAction";
import { initEnvAction } from "@/Features/Environment/Actions";
import { GlobalErrorBoundary } from "@/Features/Error/GlobalErrorBoundary";
import { showErrorPage } from "@/Features/Error/Utils";
import { initLocalizedStringAction } from "@/Features/LocalizedString/Actions";
import { store } from "@/Features/Store/Store";

const AppLazy = React.lazy(() => import("./App"));

function render() {
    createRoot(document.getElementById("root")!).render(
        <GlobalErrorBoundary>
            <Provider store={store}>
                <React.Suspense fallback={null}>
                    <AppLazy />
                </React.Suspense>
            </Provider>
        </GlobalErrorBoundary>,
    );
}

async function launchAsync() {
    store.dispatch(initEnvAction);
    await store.dispatch(initAuthAction);
    await store.dispatch(initLocalizedStringAction);

    render();
}

launchAsync().catch((error) => {
    showErrorPage(error);
});
