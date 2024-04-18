import * as React from "react";
import { useAsyncError } from "react-router-dom";

import { AppError } from "@/Features/Error/AppError";
import { AppErrorPage } from "@/Features/Error/AppErrorPage";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";

export const RouteAsyncError: React.FC = () => {
    const error = useAsyncError();

    if (error instanceof AppError) {
        return <AppErrorPage error={error} showBackButton={true} />;
    } else if (error instanceof Error) {
        return <AppErrorPage error={new AppError(CE_ErrorCode.Unknown, error.message)} />;
    } else {
        return <AppErrorPage error={new AppError(CE_ErrorCode.Unknown, "Unknown error")} />;
    }
};
