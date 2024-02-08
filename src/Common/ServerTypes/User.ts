export interface IUserBaseDetail {
    id: string;
    username: string;
    email: string;
    nickname: string;
    isAdmin: boolean;
}

export interface IUserDetail extends IUserBaseDetail {
    bio: string;
}
