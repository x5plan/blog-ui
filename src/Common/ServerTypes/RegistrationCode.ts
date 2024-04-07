import type { IUserBaseDetail } from "./User";

export interface IRegistrationCode {
    readonly registrationCode: string;
    readonly expireDate: string;
    readonly creator: IUserBaseDetail;
    readonly assignedUser: IUserBaseDetail | null;
}
