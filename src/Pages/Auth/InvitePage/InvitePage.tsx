import { Button, Spinner, Toast, ToastBody, ToastTitle } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import * as React from "react";

import { useAppToastController } from "@/Common/Hooks/AppToast";
import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { useSetPageMeta } from "@/Features/Page/Hooks";

import { InvitationCodeTable } from "./InvitationCodeTable";
import { useInvitePageStyles } from "./InvitePageStyles";
import { deleteRegistrationCodeRequestAsync, postRegistrationCodeRequestAsync } from "./Request";

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
    });

    useSetPageMeta(s.invitationPageTitle, null);

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
                                <ToastTitle>{s.copySuccessMessage}</ToastTitle>
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
                                <ToastTitle>{s.copyErrorMessage}</ToastTitle>
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
        [allowedToCopy, dispatchToast, s],
    );

    return (
        <div className={styles.root}>
            <div className={styles.title}></div>
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
                            onCopyCode={onCopyCode}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
