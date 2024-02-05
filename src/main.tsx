import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { initEnvAction } from "./Features/Environment/Actions";
import { GlobalErrorBoundary } from "./Features/Error/GlobalErrorBoundary";
import { initLocalizedStringAction } from "./Features/LocalizedString/Actions";
import { store } from "./Features/Store/Store";

const AppLazy = React.lazy(() => import("./App"));

function render() {
    createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <GlobalErrorBoundary>
                <Provider store={store}>
                    <React.Suspense fallback={null}>
                        <AppLazy />
                    </React.Suspense>
                </Provider>
            </GlobalErrorBoundary>
        </React.StrictMode>,
    );
}

function launch() {
    store.dispatch(initEnvAction);
    store.dispatch(initLocalizedStringAction).then(() => {
        render();
    });
}

launch();
