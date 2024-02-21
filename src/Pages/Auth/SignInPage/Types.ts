import type { IUserBaseDetail } from "@/Common/ServerTypes/User";

export interface IPostSignInRequestBody {
    username: string;
    password: string;
}

export interface IPostSignInResponse {
    token: string;
    userBaseDetail: IUserBaseDetail;
}
