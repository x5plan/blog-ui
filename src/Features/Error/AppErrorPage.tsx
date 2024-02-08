import * as React from "react";

import type { AppError } from "./AppError";
import { ErrorPage } from "./ErrorPage";
import { useErrorCustomLocalizedDescription, useErrorLocalizedTitle } from "./Hooks";

export interface IAppErrorPageProps {
    error: AppError;
    showBackButton?: boolean;
}

export const AppErrorPage: React.FC<IAppErrorPageProps> = (props) => {
    const { error, showBackButton } = props;

    const title = useErrorLocalizedTitle(error.code);
    const description =
        useErrorCustomLocalizedDescription(error.code) ?? error.description ?? error.message;

    return <ErrorPage message={title} description={description} showBackButton={showBackButton} />;
};
