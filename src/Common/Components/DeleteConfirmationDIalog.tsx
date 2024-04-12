import type { DialogTriggerProps } from "@fluentui/react-components";
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
} from "@fluentui/react-components";
import * as React from "react";

import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";

export interface IDeleteConfirmationDialogProps {
    title?: string;
    content: string;
    children: DialogTriggerProps["children"];
    onConfirm: () => void;
    onCancel?: () => void;
}

export const DeleteConfirmationDialog: React.FC<IDeleteConfirmationDialogProps> = (props) => {
    const s = useLocalizedStrings({
        title: CE_Strings.COMMON_DELETE_CONFIRMAION_TITLE,
        cancel: CE_Strings.COMMOM_CANCEL_BUTTON,
        delete: CE_Strings.COMMON_DELETE_BUTTON,
    });

    const { title = s.title, content, children, onConfirm, onCancel } = props;

    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (open && cancelButtonRef.current) {
            cancelButtonRef.current.focus();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onOpenChange={(e, data) => {
                e.stopPropagation();
                e.preventDefault();
                setOpen(data.open);
            }}
        >
            <DialogTrigger disableButtonEnhancement>{children}</DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>{content}</DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement action="close">
                            <Button appearance="primary" onClick={onConfirm}>
                                {s.delete}
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement action="close">
                            <Button ref={cancelButtonRef} appearance="secondary" onClick={onCancel}>
                                {s.cancel}
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
