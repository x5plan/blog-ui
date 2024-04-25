import type { IUserBaseDetail } from "@/Common/ServerTypes/User";

export interface IPostSignUpRequestBody {
    username: string;
    email: string;
    password: string;
    emailVerificationCode: string;
    registrationCode: string;
}

export interface IPostSignUpResponse {
    readonly token: string;
    readonly userBaseDetail: IUserBaseDetail;
}
