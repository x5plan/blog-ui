import type { IUserBaseDetail } from "@/Common/ServerTypes/User";

export interface IAuthState {
    bearerToken: string;
    currentUser: IUserBaseDetail;
}

export interface IGetAccessTokenRequestQuery {
    token: string;
}

export interface IGetAccessTokenResponse {
    userBaseDetail: IUserBaseDetail;
}
