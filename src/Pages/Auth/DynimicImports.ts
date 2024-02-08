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
