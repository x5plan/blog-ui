/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
    readonly X5PLAN_CND_URL: string;
    readonly X5PLAN_ICON_URL: string;
    readonly X5PLAN_API_URL: string;

    /**
     * Base URL has been set to `X5PLAN_CND_URL` in `vite.config.ts`.
     * @deprecated Use `X5PLAN_CND_URL` instead.
     */
    BASE_URL: string;
}
