import axios, { HttpStatusCode } from "axios";

import type { XOR } from "@/Common/Types/XOR";
import { getApiBearerToken, getApiEndPoint } from "@/Features/Environment/Selectors";
import { AppError } from "@/Features/Error/AppError";
import { CE_ErrorCode } from "@/Features/Error/ErrorCode";
import { getState } from "@/Features/Store/Store";

export interface IRequestOptions<TQuery, TBody> {
    path: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    query?: TQuery;
    body?: TBody;
    recaptchaToken?: string;
}

export interface IResponseError {
    errCode: CE_ErrorCode;
    msg?: string;
}

export type IResponseData<T> = XOR<{ data: T }, { error: IResponseError }>;

export async function requestAsync<TResponse, TQuery = undefined, TBody = undefined>(
    options: IRequestOptions<TQuery, TBody>,
    filteredErrors: CE_ErrorCode[] = [],
): Promise<IResponseData<TResponse>> {
    const appState = getState();
    const apiBearerToken = getApiBearerToken(appState);
    const apiEndPoint = getApiEndPoint(appState);

    const response = await axios.request({
        url: `${apiEndPoint}api/${options.path}`,
        method: options.method,
        params: options.query,
        data: options.body && JSON.stringify(options.body),
        headers: {
            "Content-Type": "application/json",
            Authorization: apiBearerToken && `Bearer ${apiBearerToken}`,
            ...(options.recaptchaToken && { "X-Recaptcha-Token": options.recaptchaToken }),
        },
        validateStatus: () => true,
    });

    let error: IResponseError;
    const data =
        response.headers["content-type"]?.includes("application/json") &&
        typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;

    switch (response.status) {
        case HttpStatusCode.Accepted:
        case HttpStatusCode.Created:
            if ("errCode" in data) {
                error = data as unknown as IResponseError;
            } else {
                return { data };
            }
            break;

        case HttpStatusCode.Unauthorized:
            error = { errCode: CE_ErrorCode.AuthRequired };
            break;

        case HttpStatusCode.InternalServerError:
            error = {
                errCode: CE_ErrorCode.ServerError,
                msg: typeof data === "string" ? data : data.msg,
            };
            break;

        default:
            if (typeof data === "string") {
                error = { errCode: CE_ErrorCode.Unknown, msg: data };
            } else if ("errCode" in data) {
                error = data as unknown as IResponseError;
            } else {
                error = { errCode: CE_ErrorCode.Unknown };
            }
            break;
    }

    if (!filteredErrors.includes(error.errCode)) {
        throw new AppError(error.errCode, error.msg);
    }

    return { error };
}
