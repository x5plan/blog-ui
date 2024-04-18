import * as React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";

import { getState } from "../Store/Store";
import type { IGetViewFunctionProps } from "./Types";

export const useCreateNavigateOnClick = () => {
    const navigate = useNavigate();

    return React.useCallback(
        <T extends HTMLElement>(
            path: string,
            preventDefault = true,
            stopPropagation = true,
            onClick?: (e: React.MouseEvent<T>) => void,
        ) => {
            return (e: React.MouseEvent<T>) => {
                if (preventDefault) {
                    e?.preventDefault();
                }
                if (stopPropagation) {
                    e?.stopPropagation();
                }
                onClick?.(e);
                navigate(path);
            };
        },
        [navigate],
    );
};

export const useGetViewFunctionProps = (): IGetViewFunctionProps => {
    const recaptchaAsync = useRecaptchaAsync();
    const [searchParams] = useSearchParams();
    const params = useParams();

    return {
        recaptchaAsync,
        getState,
        searchParams,
        params,
    };
};
