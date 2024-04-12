import * as React from "react";

import { showErrorPage } from "./Utils";

export class GlobalErrorBoundary extends React.Component<
    React.PropsWithChildren,
    { error: boolean }
> {
    public constructor(props: { children: React.ReactElement }) {
        super(props);
        this.state = { error: false };
    }

    public static getDerivedStateFromError(error: Error) {
        if (window.onerror) {
            window.onerror(error.message, null, null, null, error);
        }
        showErrorPage(error);

        return { error: true };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // TODO: Add telemetry here
    }

    public render() {
        return this.state.error ? null : this.props.children;
    }
}
