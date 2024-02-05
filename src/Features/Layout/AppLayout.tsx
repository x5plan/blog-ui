import type * as React from "react";

export interface IAppLayoutProps {
    children: React.ReactElement;
}

export const AppLayout: React.FC<IAppLayoutProps> = (props) => {
    // TODO: Implement layout

    return props.children;
};
