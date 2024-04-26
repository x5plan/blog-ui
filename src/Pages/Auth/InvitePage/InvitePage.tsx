import { Button, Spinner } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import * as React from "react";

import {
    useCommonErrorNotification,
    useCommonSuccessNotification,
} from "@/Common/Hooks/Notification";
import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { format } from "@/Common/Utilities/Format";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

import { InvitationCodeDialog } from "./InvitationCodeDialog";
import { InvitationCodeTable } from "./InvitationCodeTable";
import { deleteRegistrationCodeRequestAsync, postRegistrationCodeRequestAsync } from "./Request";
import { useInvitePageStyles } from "./Styles/InvitePageStyles";

export interface IInvitePageProps {
    readonly registrationCodeList: IRegistrationCode[];
}

export const InvitePage: React.FC<IInvitePageProps> = (props) => {
    const { registrationCodeList = [] } = props;

    const s = useLocalizedStrings({
        copySuccessMessage: CE_Strings.COMMON_COPY_SUCCESS_MESSAGE,
        copyErrorMessage: CE_Strings.COMMON_COPY_ERROR_MESSAGE,
        invitationPageTitle: CE_Strings.INVITATION_PAGE_TITLE,
        invitationCodeCreateButton: CE_Strings.INVITATION_CODE_CREATE_BUTTON,
        createErrorMessage: CE_Strings.INVITATION_CODE_CREATE_ERROR_MESSAGE,
        deleteErrorMessage: CE_Strings.INVITATION_CODE_DELETE_ERROR_MESSAGE,
        deleteSuccessMessage: CE_Strings.INVITATION_CODE_DELETE_SUCCESS_MESSAGE,
    });

    useSetPageMeta(s.invitationPageTitle, null);

    const styles = useInvitePageStyles();
    const successNotifacation = useCommonSuccessNotification();
    const errorNotifacation = useCommonErrorNotification();
    const recaptchaAsync = useRecaptchaAsync();
    const [codeList, setCodeList] = React.useState<IRegistrationCode[]>(registrationCodeList);
    const [creatingCode, setCreatingCode] = React.useState<boolean>(false);
    const [deletingCode, setDeletingCode] = React.useState<string | null>(null);

    const allowedToCopy = !!window?.navigator?.clipboard?.writeText;

    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogCode, setDialogCode] = React.useState<IRegistrationCode | null>(null);

    const onCreateCode = React.useCallback(() => {
        setCreatingCode(true);
        postRegistrationCodeRequestAsync(recaptchaAsync)
            .then((resp) => {
                setCodeList([resp.data, ...codeList]);
                setDialogCode(resp.data);
                setDialogOpen(true);
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
                    successNotifacation(format(s.deleteSuccessMessage, code));
                    setCodeList(codeList.filter((c) => c.registrationCode !== code));
                })
                .catch((e) => {
                    errorNotifacation(format(s.deleteErrorMessage, code), e);
                })
                .finally(() => {
                    setDeletingCode(null);
                    setDialogOpen(false);
                });
        },
        [codeList, errorNotifacation, recaptchaAsync, s, successNotifacation],
    );

    const onCopyCode = React.useCallback(
        (code: string) => {
            if (allowedToCopy) {
                window.navigator.clipboard
                    .writeText(code)
                    .then(() => {
                        successNotifacation(s.copySuccessMessage, null, { timeout: 800 });
                    })
                    .catch((e: Error) => {
                        errorNotifacation(s.copyErrorMessage, e, { timeout: 800 });
                    });
            }
        },
        [allowedToCopy, errorNotifacation, s, successNotifacation],
    );

    return (
        <div className={styles.root}>
            <div className={styles.title}>{s.invitationPageTitle}</div>
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <Button
                        className={styles.button}
                        appearance="primary"
                        disabled={!!deletingCode || creatingCode}
                        onClick={onCreateCode}
                        icon={creatingCode ? null : <AddRegular />}
                    >
                        {creatingCode ? <Spinner size="tiny" /> : s.invitationCodeCreateButton}
                    </Button>
                </div>
                {codeList.length > 0 && (
                    <div className={styles.list}>
                        <InvitationCodeTable
                            codeList={codeList}
                            creatingCode={creatingCode}
                            deletingCode={deletingCode}
                            onDeleteCode={onDeleteCode}
                            onItemClicked={(code) => {
                                setDialogCode(code);
                                setDialogOpen(true);
                            }}
                        />
                    </div>
                )}
            </div>
            <InvitationCodeDialog
                open={dialogOpen}
                code={dialogCode}
                creatingCode={creatingCode}
                deletingCode={deletingCode}
                allowedToCopy={allowedToCopy}
                onCopyCode={onCopyCode}
                onDeleteCode={onDeleteCode}
                onClose={() => {
                    setDialogOpen(false);
                }}
            />
        </div>
    );
};
