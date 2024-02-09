export function loadUserMenu() {
    return import("./UserMenu").then(({ UserMenu }) => ({
        default: UserMenu,
    }));
}

export function loadAppSideBarNavi() {
    return import("./AppSideBarNavi").then(({ AppSideBarNavi }) => ({
        default: AppSideBarNavi,
    }));
}
