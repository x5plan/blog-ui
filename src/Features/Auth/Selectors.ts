import type { IRootState } from "../Store/Types";

export const getBearerToken = (state: IRootState) => state.auth.bearerToken;
export const getCurrentUser = (state: IRootState) => state.auth.currentUser;
export const getIsSignedIn = (state: IRootState) => !!state.auth.currentUser;
