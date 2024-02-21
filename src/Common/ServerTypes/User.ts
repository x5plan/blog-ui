export interface IUserBaseDetail {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly nickname: string;
    readonly isAdmin: boolean;
}

export interface IUserDetail extends IUserBaseDetail {
    readonly bio: string;
}
