import {
    Button,
    Dialog,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import * as React from "react";

import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";

export interface IInvitationCodeDialogProps {
    readonly code: IRegistrationCode | null;
    readonly onClose: () => void;
}

export const InvitationCodeDialog: React.FC<IInvitationCodeDialogProps> = (props) => {
    const { code, onClose } = props;

    const s = useLocalizedStrings({
        close: CE_Strings.COMMON_CLOSE_BUTTON,
        title: CE_Strings.INVITATION_DIALOG_TITLE,
    });

    return (
        <Dialog
            open={!!code}
            onOpenChange={(e, data) => {
                if (!data.open) {
                    onClose();
                }
            }}
        >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle
                        action={
                            <DialogTrigger action="close">
                                <Button
                                    appearance="subtle"
                                    aria-label={s.close}
                                    icon={<Dismiss24Regular />}
                                />
                            </DialogTrigger>
                        }
                    >
                        {s.title}
                    </DialogTitle>
                    <DialogContent></DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
