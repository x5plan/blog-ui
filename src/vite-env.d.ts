/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
    readonly X5PLAN_CND_URL: string;
    readonly X5PLAN_ICON_URL: string;
    readonly X5PLAN_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
