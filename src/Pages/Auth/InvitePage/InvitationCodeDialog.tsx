import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Input,
    Persona,
    Spinner,
    Tooltip,
    useId,
} from "@fluentui/react-components";
import {
    CopyRegular,
    DeleteRegular,
    Dismiss24Regular,
    PeopleCheckmark20Regular,
    PeopleError20Regular,
    PeopleSync20Regular,
} from "@fluentui/react-icons";
import * as React from "react";

import { DeleteConfirmationDialog } from "@/Common/Components/DeleteConfirmationDIalog";
import { RouterButton } from "@/Common/Components/RouterButton";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { format } from "@/Common/Utilities/Format";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { CE_PageBaseRoute } from "@/Features/Page/Types";

import { useInvitationCodeDialogStyles } from "./Styles/InvitationCodeDialogStyles";

export interface IInvitationCodeDialogProps {
    readonly open: boolean;
    readonly code: IRegistrationCode | null;
    readonly creatingCode: boolean;
    readonly deletingCode: string | null;
    readonly allowedToCopy: boolean;
    readonly onCopyCode: (code: string) => void;
    readonly onDeleteCode: (code: string) => void;
    readonly onClose: () => void;
}

export const InvitationCodeDialog: React.FC<IInvitationCodeDialogProps> = (props) => {
    const {
        open,
        code,
        creatingCode,
        deletingCode,
        allowedToCopy,
        onCopyCode,
        onDeleteCode,
        onClose,
    } = props;

    const s = useLocalizedStrings({
        title: CE_Strings.INVITATION_DIALOG_TITLE,
        closeButton: CE_Strings.COMMON_CLOSE_BUTTON,
        deleteButton: CE_Strings.COMMON_DELETE_BUTTON,
        copyButton: CE_Strings.COMMON_COPY_BUTTON,
        invitationCodeTableCodeCol: CE_Strings.INVITATION_CODE_TABLE_CODE_COL,
        invitationCodeTableStatusCol: CE_Strings.INVITATION_CODE_TABLE_STATUS_COL,
        invitationCodeTableExpirationCol: CE_Strings.INVITATION_CODE_TABLE_EXPIRATION_COL,
        invitationCodeTableInvitedUserCol: CE_Strings.INVITATION_CODE_TABLE_INVITED_USER_COL,
        invitationCodeCopyButtonLabel: CE_Strings.INVITATION_CODE_COPY_BUTTON_LABEL,
        invitationCodeDeleteButtonLabel: CE_Strings.INVITATION_CODE_DELETE_BUTTON_LABEL,
        invitationCodeDeleteConfirmTitle: CE_Strings.INVITATION_CODE_DELETE_CONFIRM_MESSAGE,
        invitationCodeStatusActive: CE_Strings.INVITATION_CODE_STATUS_ACTIVE,
        invitationCodeStatusExpired: CE_Strings.INVITATION_CODE_STATUS_EXPIRED,
        invitationCodeStatusUsed: CE_Strings.INVITATION_CODE_STATUS_USED,
    });

    const statusFieldId = useId("status");
    const codeFieldId = useId("code");
    const expirationFieldId = useId("expiration");
    const invitedUserFieldId = useId("invitedUser");

    const disableAllButtons = !!deletingCode || creatingCode;

    const styles = useInvitationCodeDialogStyles();
    const momentFormatter = useMomentFormatter();

    const statusFieldItem = React.useMemo(() => {
        if (!code) {
            return null;
        }

        if (code.assignedUser) {
            return (
                <div className={styles.usedStatus} tabIndex={0} aria-labelledby={statusFieldId}>
                    <PeopleCheckmark20Regular />
                    <span>{s.invitationCodeStatusUsed}</span>
                </div>
            );
        }

        if (new Date() > new Date(code.expireDate)) {
            return (
                <div className={styles.expiredStatus} tabIndex={0} aria-labelledby={statusFieldId}>
                    <PeopleError20Regular />
                    <span>{s.invitationCodeStatusExpired}</span>
                </div>
            );
        }

        return (
            <div className={styles.activeStatus} tabIndex={0} aria-labelledby={statusFieldId}>
                <PeopleSync20Regular />
                <span>{s.invitationCodeStatusActive}</span>
            </div>
        );
    }, [code, s, statusFieldId, styles]);

    return (
        <Dialog
            open={open}
            onOpenChange={(e, data) => {
                if (!data.open && !disableAllButtons) {
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
                                    aria-label={s.closeButton}
                                    icon={<Dismiss24Regular />}
                                    disabled={disableAllButtons}
                                />
                            </DialogTrigger>
                        }
                    >
                        {s.title}
                    </DialogTitle>
                    {code && (
                        <DialogContent className={styles.contentRoot}>
                            <div className={styles.field} id={statusFieldId}>
                                <label className={styles.fieldLabel} htmlFor={statusFieldId}>
                                    {s.invitationCodeTableStatusCol}
                                </label>
                                <div className={styles.fieldContainer}>
                                    <div className={styles.filedData}>{statusFieldItem}</div>
                                </div>
                            </div>
                            <div className={styles.field} id={codeFieldId}>
                                <label className={styles.fieldLabel} htmlFor={codeFieldId}>
                                    {s.invitationCodeTableCodeCol}
                                </label>
                                <div className={styles.fieldContainer}>
                                    <div className={styles.filedData}>
                                        <Input
                                            value={code.registrationCode}
                                            readOnly={true}
                                            disabled={disableAllButtons}
                                            aria-labelledby={codeFieldId}
                                            type="text"
                                        />
                                    </div>
                                    {allowedToCopy && (
                                        <div className={styles.fieldAction}>
                                            <Tooltip
                                                content={s.copyButton}
                                                relationship="inaccessible"
                                            >
                                                <Button
                                                    aria-label={format(
                                                        s.invitationCodeCopyButtonLabel,
                                                        code.registrationCode,
                                                    )}
                                                    disabled={disableAllButtons}
                                                    onClick={() =>
                                                        onCopyCode(code.registrationCode)
                                                    }
                                                    icon={<CopyRegular />}
                                                />
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.field} id={expirationFieldId}>
                                <label className={styles.fieldLabel} htmlFor={expirationFieldId}>
                                    {s.invitationCodeTableExpirationCol}
                                </label>
                                <div className={styles.fieldContainer}>
                                    <div
                                        className={styles.filedData}
                                        aria-labelledby={expirationFieldId}
                                        tabIndex={0}
                                    >
                                        {momentFormatter(code.expireDate, "lll")}
                                    </div>
                                </div>
                            </div>
                            {code.assignedUser && (
                                <div className={styles.field} id={invitedUserFieldId}>
                                    <label
                                        className={styles.fieldLabel}
                                        htmlFor={invitedUserFieldId}
                                    >
                                        {s.invitationCodeTableInvitedUserCol}
                                    </label>
                                    <div className={styles.fieldContainer}>
                                        <div className={styles.filedData}>
                                            <div>
                                                <RouterButton
                                                    appearance="secondary"
                                                    to={`${CE_PageBaseRoute.User}/${code.assignedUser.id}`}
                                                    aria-describedby={invitedUserFieldId}
                                                >
                                                    <Persona
                                                        size="large"
                                                        primaryText={
                                                            code.assignedUser.nickname ||
                                                            code.assignedUser.username
                                                        }
                                                        secondaryText={code.assignedUser.username}
                                                    />
                                                </RouterButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    )}
                    <DialogActions>
                        <DeleteConfirmationDialog
                            content={format(
                                s.invitationCodeDeleteConfirmTitle,
                                code?.registrationCode,
                            )}
                            onConfirm={() => onDeleteCode(code?.registrationCode)}
                        >
                            <Button
                                aria-label={format(
                                    s.invitationCodeDeleteButtonLabel,
                                    code?.registrationCode,
                                )}
                                disabled={disableAllButtons || !!code?.assignedUser}
                                icon={
                                    deletingCode === code?.registrationCode ? (
                                        <Spinner size="tiny" />
                                    ) : (
                                        <DeleteRegular />
                                    )
                                }
                            >
                                {s.deleteButton}
                            </Button>
                        </DeleteConfirmationDialog>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
