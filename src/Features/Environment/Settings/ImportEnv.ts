export function getIsProd() {
    return import.meta.env.PROD;
}

export function getApiUrl() {
    return import.meta.env.X5PLAN_API_URL;
}

export function getCdnUrl() {
    return import.meta.env.X5PLAN_CND_URL;
}
