import {
    Button,
    mergeClasses,
    Persona,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableCellActions,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Tooltip,
    useArrowNavigationGroup,
} from "@fluentui/react-components";
import {
    CopyRegular,
    DeleteRegular,
    PeopleCheckmark20Regular,
    PeopleCheckmarkRegular,
    PeopleError20Regular,
    PeopleErrorRegular,
    PeopleSync20Regular,
    PeopleSyncRegular,
} from "@fluentui/react-icons";
import * as React from "react";

import { RouterButton } from "@/Common/Components/RouterButton";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";
import { format } from "@/Common/Utilities/Format";
import { useIsMiniScreen, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { CE_PageBaseRoute } from "@/Features/Page/Types";

import { useInvitationCodeTableStyles } from "./Styles/InvitationCodeTableStyles";

export interface IInvitationCodeTableProps {
    readonly codeList: IRegistrationCode[];
    readonly creatingCode: boolean;
    readonly deletingCode: string | null;
    readonly allowedToCopy: boolean;
    readonly onDeleteCode: (code: string) => void;
    readonly onCopyCode: (code: string) => void;
    readonly onItemClicked: (codeItem: IRegistrationCode) => void;
}

export const InvitationCodeTable: React.FC<IInvitationCodeTableProps> = (props) => {
    const { codeList, deletingCode, creatingCode, allowedToCopy, onDeleteCode, onCopyCode } = props;

    const s = useLocalizedStrings({
        deleteButton: CE_Strings.COMMON_DELETE_BUTTON,
        copyButton: CE_Strings.COMMON_COPY_BUTTON,
        invitationCodeTableCodeCol: CE_Strings.INVITATION_CODE_TABLE_CODE_COL,
        invitationCodeTableStatusCol: CE_Strings.INVITATION_CODE_TABLE_STATUS_COL,
        invitationCodeTableExpirationCol: CE_Strings.INVITATION_CODE_TABLE_EXPIRATION_COL,
        invitationCodeTableInvitedUserCol: CE_Strings.INVITATION_CODE_TABLE_INVITED_USER_COL,
        invitationCodeCopyButtonLabel: CE_Strings.INVITATION_CODE_COPY_BUTTON_LABEL,
        invitationCodeDeleteButtonLabel: CE_Strings.INVITATION_CODE_DELETE_BUTTON_LABEL,
        invitationCodeStatusActive: CE_Strings.INVITATION_CODE_STATUS_ACTIVE,
        invitationCodeStatusExpired: CE_Strings.INVITATION_CODE_STATUS_EXPIRED,
        invitationCodeStatusUsed: CE_Strings.INVITATION_CODE_STATUS_USED,
        invitationCodeStatusActiveLabel: CE_Strings.INVITATION_CODE_STATUS_ACTIVE_LABEL,
        invitationCodeStatusExpiredLabel: CE_Strings.INVITATION_CODE_STATUS_EXPIRED_LABEL,
        invitationCodeStatusUsedLabel: CE_Strings.INVITATION_CODE_STATUS_USED_LABEL,
    });

    const styles = useInvitationCodeTableStyles();
    const momentFormatter = useMomentFormatter();
    const isSmallScreen = useIsSmallScreen();
    const isMiniScreen = useIsMiniScreen();
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });

    const getStatusTableCellLayout = React.useCallback(
        (code: IRegistrationCode) => {
            if (code.assignedUser) {
                return isMiniScreen ? (
                    <TableCellLayout
                        className={mergeClasses(styles.usedStatus, styles.statusLayout)}
                        aria-label={format(s.invitationCodeStatusUsedLabel, code.registrationCode)}
                    >
                        <Tooltip content={s.invitationCodeStatusUsed} relationship={"label"}>
                            <PeopleCheckmark20Regular />
                        </Tooltip>
                    </TableCellLayout>
                ) : (
                    <TableCellLayout
                        className={styles.usedStatus}
                        media={<PeopleCheckmarkRegular />}
                        aria-label={format(s.invitationCodeStatusUsedLabel, code.registrationCode)}
                    >
                        {s.invitationCodeStatusUsed}
                    </TableCellLayout>
                );
            }

            const now = new Date();
            const expire = new Date(code.expireDate);

            if (now > expire) {
                return isMiniScreen ? (
                    <TableCellLayout
                        className={mergeClasses(styles.expiredStatus, styles.statusLayout)}
                        aria-label={format(
                            s.invitationCodeStatusExpiredLabel,
                            code.registrationCode,
                        )}
                    >
                        <Tooltip content={s.invitationCodeStatusExpired} relationship={"label"}>
                            <PeopleError20Regular />
                        </Tooltip>
                    </TableCellLayout>
                ) : (
                    <TableCellLayout
                        className={styles.expiredStatus}
                        media={<PeopleErrorRegular />}
                        aria-label={format(
                            s.invitationCodeStatusExpiredLabel,
                            code.registrationCode,
                        )}
                    >
                        {s.invitationCodeStatusExpired}
                    </TableCellLayout>
                );
            }

            return isMiniScreen ? (
                <TableCellLayout
                    className={mergeClasses(styles.activeStatus, styles.statusLayout)}
                    aria-label={format(s.invitationCodeStatusActiveLabel, code.registrationCode)}
                >
                    <Tooltip content={s.invitationCodeStatusActive} relationship={"label"}>
                        <PeopleSync20Regular />
                    </Tooltip>
                </TableCellLayout>
            ) : (
                <TableCellLayout
                    className={styles.activeStatus}
                    media={<PeopleSyncRegular />}
                    aria-label={format(s.invitationCodeStatusActiveLabel, code.registrationCode)}
                >
                    {s.invitationCodeStatusActive}
                </TableCellLayout>
            );
        },
        [isMiniScreen, s, styles],
    );

    return (
        <Table {...keyboardNavAttr}>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell
                        className={
                            isMiniScreen ? styles.statusSingleIconColumn : styles.statusColumn
                        }
                    >
                        {s.invitationCodeTableStatusCol}
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.codeColumn}>
                        {s.invitationCodeTableCodeCol}
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.expireColumn}>
                        {s.invitationCodeTableExpirationCol}
                    </TableHeaderCell>
                    {!isSmallScreen && (
                        <TableHeaderCell className={styles.userColumn}>
                            {s.invitationCodeTableInvitedUserCol}
                        </TableHeaderCell>
                    )}
                    {!isMiniScreen && <TableHeaderCell className={styles.actionColumn} />}
                </TableRow>
            </TableHeader>
            <TableBody>
                {codeList.map((code) => (
                    <TableRow key={code.registrationCode}>
                        <TableCell>{getStatusTableCellLayout(code)}</TableCell>
                        <TableCell>
                            <TableCellLayout appearance="primary" truncate={allowedToCopy}>
                                {code.registrationCode}
                            </TableCellLayout>
                            {allowedToCopy && (
                                <TableCellActions>
                                    <Tooltip content={s.copyButton} relationship="inaccessible">
                                        <Button
                                            aria-label={format(
                                                s.invitationCodeCopyButtonLabel,
                                                code.registrationCode,
                                            )}
                                            onClick={() => onCopyCode(code.registrationCode)}
                                            icon={<CopyRegular />}
                                            appearance="subtle"
                                        />
                                    </Tooltip>
                                </TableCellActions>
                            )}
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {momentFormatter(code.expireDate, "lll")}
                            </TableCellLayout>
                        </TableCell>
                        {!isSmallScreen && (
                            <TableCell>
                                <TableCellLayout truncate={true}>
                                    {code.assignedUser && (
                                        <RouterButton
                                            appearance="transparent"
                                            to={`${CE_PageBaseRoute.User}/${code.assignedUser.id}`}
                                        >
                                            <Persona
                                                className={styles.persona}
                                                primaryText={
                                                    code.assignedUser.nickname ||
                                                    code.assignedUser.username
                                                }
                                                secondaryText={code.assignedUser.username}
                                            />
                                        </RouterButton>
                                    )}
                                </TableCellLayout>
                            </TableCell>
                        )}
                        {!isMiniScreen && (
                            <TableCell>
                                <TableCellLayout>
                                    <Tooltip content={s.deleteButton} relationship="label">
                                        <Button
                                            aria-label={format(
                                                s.invitationCodeDeleteButtonLabel,
                                                code.registrationCode,
                                            )}
                                            onClick={() => onDeleteCode(code.registrationCode)}
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
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
