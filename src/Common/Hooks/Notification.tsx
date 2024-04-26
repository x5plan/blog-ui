import { Toast, ToastBody, ToastTitle } from "@fluentui/react-components";
import React from "react";

import { useAppToastController } from "./AppToast";

export const useCommonErrorNotification = () => {
    const { dispatchToast } = useAppToastController();

    return React.useCallback(
        (title: string, error?: Error, options?: Parameters<typeof dispatchToast>[1]) => {
            // TODO: Send telemetry

            dispatchToast(
                <Toast>
                    <ToastTitle>{title}</ToastTitle>
                    {error && <ToastBody>{error?.message}</ToastBody>}
                </Toast>,
                {
                    position: "top-end",
                    intent: "error",
                    pauseOnHover: true,
                    pauseOnWindowBlur: true,
                    ...options,
                },
            );
        },
        [dispatchToast],
    );
};

export const useCommonSuccessNotification = () => {
    const { dispatchToast } = useAppToastController();

    return React.useCallback(
        (title: string, message?: string, options?: Parameters<typeof dispatchToast>[1]) => {
            dispatchToast(
                <Toast>
                    <ToastTitle>{title}</ToastTitle>
                    {message && <ToastBody>{message}</ToastBody>}
                </Toast>,
                {
                    position: "top-end",
                    intent: "success",
                    timeout: 2000,
                    pauseOnWindowBlur: true,
                    ...options,
                },
            );
        },
        [dispatchToast],
    );
};
