import {
    Button,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableCellActions,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Toast,
    ToastBody,
    ToastTitle,
    Tooltip,
} from "@fluentui/react-components";
import { CopyRegular, DeleteRegular } from "@fluentui/react-icons";
import * as React from "react";

import { RouterLink } from "@/Common/Components/RouterLink";
import { useAppToastController } from "@/Common/Hooks/AppToast";
import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { format } from "@/Common/Utilities/Format";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageBaseRoute } from "@/Features/Page/Types";

import { useInvitePageStyles } from "./InvitePageStyles";
import { deleteRegistrationCodeRequestAsync, postRegistrationCodeRequestAsync } from "./Request";

export interface IInvitePageProps {
    readonly registrationCodeList: IRegistrationCode[];
}

export const InvitePage: React.FC<IInvitePageProps> = (props) => {
    const { registrationCodeList = [] } = props;
    const [
        s_invitationPageTitle,
        s_invitationCodeCreateButton,
        s_invitationCodeTableCodeCol,
        s_invitationCodeTableStatusCol,
        s_invitationCodeTableExpirationCol,
        s_invitationCodeTableInvitedUserCol,
        s_invitationCodeCopyButtonLabel,
        s_invitationCodeDeleteButtonLabel,
        s_deleteButton,
        s_copyButton,
        s_copySuccessMessage,
        s_copyErrorMessage,
    ] = useLocalizedStrings(
        CE_Strings.INVITATION_PAGE_TITLE,
        CE_Strings.INVITATION_CODE_CREATE_BUTTON,
        CE_Strings.INVITATION_CODE_TABLE_CODE_COL,
        CE_Strings.INVITATION_CODE_TABLE_STATUS_COL,
        CE_Strings.INVITATION_CODE_TABLE_EXPIRATION_COL,
        CE_Strings.INVITATION_CODE_TABLE_INVITED_USER_COL,
        CE_Strings.INVITATION_CODE_COPY_BUTTON_LABEL,
        CE_Strings.INVITATION_CODE_DELETE_BUTTON_LABEL,
        CE_Strings.COMMON_DELETE_BUTTON,
        CE_Strings.COMMON_COPY_BUTTON,
        CE_Strings.COMMON_COPY_SUCCESS_MESSAGE,
        CE_Strings.COMMON_COPY_ERROR_MESSAGE,
    );

    useSetPageMeta(s_invitationPageTitle, null);

    const styles = useInvitePageStyles();
    const { dispatchToast } = useAppToastController();
    const recaptchaAsync = useRecaptchaAsync();
    const [codeList, setCodeList] = React.useState<IRegistrationCode[]>(registrationCodeList);
    const [creatingCode, setCreatingCode] = React.useState<boolean>(false);
    const [deletingCode, setDeletingCode] = React.useState<string | null>(null);

    const allowedToCopy = !!window?.navigator?.clipboard.writeText;

    const onCreateCode = React.useCallback(() => {
        setCreatingCode(true);
        postRegistrationCodeRequestAsync(recaptchaAsync)
            .then((resp) => {
                setCodeList([resp.data, ...codeList]);
            })
            .catch(() => {
                // TODO: Handle error
            })
            .finally(() => {
                setCreatingCode(false);
            });
    }, [codeList, recaptchaAsync]);

    const onDeleteCode = React.useCallback(
        (code: string) => {
            setDeletingCode(code);
            deleteRegistrationCodeRequestAsync(code, recaptchaAsync)
                .then(() => {
                    setCodeList(codeList.filter((c) => c.registrationCode !== code));
                })
                .catch(() => {
                    // TODO: Handle error
                })
                .finally(() => {
                    setDeletingCode(null);
                });
        },
        [codeList, recaptchaAsync],
    );

    const onCopyCode = React.useCallback(
        (code: string) => {
            if (allowedToCopy) {
                window.navigator.clipboard
                    .writeText(code)
                    .then(() => {
                        dispatchToast(
                            <Toast>
                                <ToastTitle>{s_copySuccessMessage}</ToastTitle>
                            </Toast>,
                            {
                                position: "top",
                                intent: "success",
                                timeout: 800,
                            },
                        );
                    })
                    .catch((e) => {
                        dispatchToast(
                            <Toast>
                                <ToastTitle>{s_copyErrorMessage}</ToastTitle>
                                <ToastBody>{e.message}</ToastBody>
                            </Toast>,
                            {
                                position: "top",
                                intent: "error",
                                timeout: 800,
                            },
                        );
                    });
            }
        },
        [allowedToCopy, dispatchToast, s_copyErrorMessage, s_copySuccessMessage],
    );

    // TODO: Format date
    // TODO: Style

    return (
        <div className={styles.root}>
            <div className={styles.title}></div>
            <div className={styles.container}>
                <div className={styles.button}>
                    <Button disabled={!!deletingCode || creatingCode} onClick={onCreateCode}>
                        {creatingCode ? <Spinner size="tiny" /> : s_invitationCodeCreateButton}
                    </Button>
                </div>
                <div className={styles.list}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>{s_invitationCodeTableStatusCol}</TableHeaderCell>
                                <TableHeaderCell>{s_invitationCodeTableCodeCol}</TableHeaderCell>
                                <TableHeaderCell>
                                    {s_invitationCodeTableExpirationCol}
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    {s_invitationCodeTableInvitedUserCol}
                                </TableHeaderCell>
                                <TableHeaderCell className={styles.actionColumn} />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {codeList.map((code) => (
                                <TableRow key={code.registrationCode}>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <TableCellLayout truncate={allowedToCopy}>
                                            {code.registrationCode}
                                        </TableCellLayout>
                                        {allowedToCopy && (
                                            <TableCellActions>
                                                <Tooltip
                                                    content={s_copyButton}
                                                    relationship="label"
                                                >
                                                    <Button
                                                        aria-label={format(
                                                            s_invitationCodeCopyButtonLabel,
                                                            code.registrationCode,
                                                        )}
                                                        onClick={() =>
                                                            onCopyCode(code.registrationCode)
                                                        }
                                                        icon={<CopyRegular />}
                                                    />
                                                </Tooltip>
                                            </TableCellActions>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TableCellLayout>{code.expireDate}</TableCellLayout>
                                    </TableCell>
                                    <TableCell>
                                        <TableCellLayout>
                                            {code.assignedUser && (
                                                <RouterLink
                                                    href={`${CE_PageBaseRoute.User}/${code.assignedUser.id}`}
                                                >
                                                    {code.assignedUser.username}
                                                </RouterLink>
                                            )}
                                        </TableCellLayout>
                                    </TableCell>
                                    <TableCell>
                                        <TableCellLayout>
                                            <Tooltip content={s_deleteButton} relationship="label">
                                                <Button
                                                    aria-label={format(
                                                        s_invitationCodeDeleteButtonLabel,
                                                        code.registrationCode,
                                                    )}
                                                    onClick={() =>
                                                        onDeleteCode(code.registrationCode)
                                                    }
                                                    disabled={
                                                        !!deletingCode ||
                                                        creatingCode ||
                                                        !!code.assignedUser
                                                    }
                                                    icon={
                                                        deletingCode === code.registrationCode ? (
                                                            <Spinner size="tiny" />
                                                        ) : (
                                                            <DeleteRegular />
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        </TableCellLayout>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
