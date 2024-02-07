import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
} from "@fluentui/react-components";
import { Dismiss24Regular, Navigation24Regular } from "@fluentui/react-icons";
import * as React from "react";

import { Tooltip } from "@/Common/Components/Tooltip";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { CE_Strings } from "../LocalizedString/Types";
import { AppNavi } from "./AppNavi";

export const AppSideBarNavi: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const [c_closeButtonString, c_navigationSectionTitleString] = useLocalizedStrings(
        CE_Strings.COMMON_CLOSE_BUTTON,
        CE_Strings.NAVIGATION_SECTION_TITLE,
    );

    return (
        <>
            <Drawer open={isOpen} position="end" onOpenChange={(_, { open }) => setIsOpen(open)}>
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Tooltip content={c_closeButtonString} relationship="label">
                                <Button
                                    appearance="subtle"
                                    aria-label={c_closeButtonString}
                                    icon={<Dismiss24Regular />}
                                    onClick={() => setIsOpen(false)}
                                />
                            </Tooltip>
                        }
                    >
                        {c_navigationSectionTitleString}
                    </DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                    <AppNavi isInSidebar={true} />
                </DrawerBody>
            </Drawer>
            <Tooltip content={c_navigationSectionTitleString} relationship="label">
                <Button
                    appearance="subtle"
                    aria-label={c_navigationSectionTitleString}
                    onClick={() => setIsOpen(true)}
                    icon={<Navigation24Regular />}
                />
            </Tooltip>
        </>
    );
};
