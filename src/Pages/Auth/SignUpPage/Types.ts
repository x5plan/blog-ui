import type { IUserBaseDetail } from "@/Common/ServerTypes/User";
import type { CE_Language } from "@/Features/LocalizedString/Locales";

export interface ISignUpPageState {
    lastSendEmailVerificationCodeTime: number;
}

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

export interface IPostSendEmailVerificationCodeForRegistrationRequestBody {
    readonly email: string;
    readonly lang: CE_Language;
}
