import React from "react";

export class GlobalErrorBoundary extends React.Component<{
    children: React.ReactElement;
}> {
    public static getDerivedStateFromError(error: Error) {
        if (window.onerror) {
            window.onerror(error.message, null, null, null, error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}

    public render() {
        return this.props.children;
    }
}
