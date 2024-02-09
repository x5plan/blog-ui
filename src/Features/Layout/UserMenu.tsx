import {
    Avatar,
    Button,
    Menu,
    MenuDivider,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Persona,
    Tooltip,
} from "@fluentui/react-components";
import {
    PeopleAddRegular,
    PeopleEditRegular,
    PersonRegular,
    SettingsRegular,
    SignOutRegular,
} from "@fluentui/react-icons";
import * as React from "react";

import { useCurrentUser } from "../Auth/Hooks";
import { signOutUserRequestAction } from "../Auth/RequestActions";
import { useIsMiniScreen } from "../Environment/Hooks";
import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { CE_PageBaseRoute } from "../Page/Types";
import { useCreateNavigateOnClick } from "../Router/Hooks";
import { useAppDispatch } from "../Store/Store";
import { userUserMenuStyles } from "./Styles/UserMenuStyles";

export const UserMenu: React.FC = () => {
    const createNavigateOnClick = useCreateNavigateOnClick();
    const dispatch = useAppDispatch();

    const isMiniScreen = useIsMiniScreen();
    const styles = userUserMenuStyles();
    const currentUser = useCurrentUser();

    const [
        c_ariaLabel,
        c_profileItemText,
        c_settingItemText,
        c_signOutItemText,
        c_editProfileItemText,
        c_inviteItemText,
    ] = useLocalizedStrings(
        CE_Strings.USER_MENU_ARIA_LABEL,
        CE_Strings.USER_MENU_ITEM_PROFILE,
        CE_Strings.USER_MENU_ITEM_SETTING,
        CE_Strings.USER_MENU_ITEM_SIGN_OUT,
        CE_Strings.USER_MENU_ITEM_EDIT_PROFILE,
        CE_Strings.USER_MENU_ITEM_INVITE,
    );

    const onSignOutClick = React.useCallback(() => {
        dispatch(signOutUserRequestAction);
    }, [dispatch]);

    // TODO: Add user header image after server side implementation.

    return (
        <Menu>
            <MenuTrigger>
                <Button className={styles.button} appearance="transparent" aria-label={c_ariaLabel}>
                    {isMiniScreen ? (
                        <Tooltip content={currentUser.username} relationship="label">
                            <Avatar />
                        </Tooltip>
                    ) : (
                        <Persona
                            primaryText={currentUser.nickname || currentUser.username}
                            secondaryText={currentUser.username}
                        />
                    )}
                </Button>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <MenuItem
                        icon={<PersonRegular />}
                        aria-label={c_profileItemText}
                        onClick={createNavigateOnClick(
                            `${CE_PageBaseRoute.User}/${currentUser.id}`,
                        )}
                    >
                        {c_profileItemText}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        icon={<PeopleEditRegular />}
                        aria-label={c_editProfileItemText}
                        onClick={createNavigateOnClick(
                            `${CE_PageBaseRoute.User}/${currentUser.id}/edit`,
                        )}
                    >
                        {c_editProfileItemText}
                    </MenuItem>
                    <MenuItem icon={<SettingsRegular />} aria-label={c_settingItemText}>
                        {c_settingItemText}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        icon={<PeopleAddRegular />}
                        aria-label={c_inviteItemText}
                        onClick={createNavigateOnClick(`${CE_PageBaseRoute.Invite}`)}
                    >
                        {c_inviteItemText}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        icon={<SignOutRegular />}
                        aria-label={c_signOutItemText}
                        onClick={onSignOutClick}
                    >
                        {c_signOutItemText}
                    </MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};
