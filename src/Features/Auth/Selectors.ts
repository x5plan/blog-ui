import type { IRootState } from "../Store/Types";

export const getBearerToken = (state: IRootState) => state.auth.bearerToken;
