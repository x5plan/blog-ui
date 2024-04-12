export function loadSignInPageRoute() {
    return import("./SignInPage").then(({ signInPageRoute }) => ({
        default: signInPageRoute,
    }));
}

export function loadSignUpPageRoute() {
    return import("./SignUpPage").then(({ signUpPageRoute }) => ({
        default: signUpPageRoute,
    }));
}

export function loadInvitePageRoute() {
    return import("./InvitePage").then(({ invitePageRoute }) => ({
        default: invitePageRoute,
    }));
}
