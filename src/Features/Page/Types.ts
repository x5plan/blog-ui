export const enum CE_PageType {
    Home = "Home",
    Article = "Article",
}

export interface IPageState {
    pageType: CE_PageType | null;
    pageTitle: string;
}

export const enum CE_PageBaseRoute {
    Home = "/",
    Article = "/article",
    SignIn = "/signin",
    SignUp = "/signup",
    Invite = "/invite",
    User = "/user",
}
