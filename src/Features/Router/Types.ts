import type { Params, RouteObject } from "react-router-dom";

import type { IRecaptchaAsync } from "@/Common/Types/Recaptcha";

import type { IRootState } from "../Store/Types";

export interface IGetViewFunctionProps {
    readonly recaptchaAsync: IRecaptchaAsync;
    readonly getState: () => IRootState;
    readonly params: Params;
    readonly searchParams: URLSearchParams;
}

export type IGetViewFunction = (props: IGetViewFunctionProps) => Promise<React.ReactNode>;

export type IRouteObjectWithElement = RouteObject & {
    element: React.ReactNode;
};
