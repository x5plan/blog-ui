import { Button } from "@fluentui/react-components";
import * as React from "react";

import { useRecaptchaAsync } from "@/Common/Hooks/Recaptcha";
import type { IRegistrationCode } from "@/Common/ServerTypes/RegistrationCode";

import { useInvitePageStyles } from "./InvitePageStyles";
import { postRegistrationCodeRequestAsync } from "./Request";

export interface IInvitePageProps {
    readonly registrationCodeList: IRegistrationCode[];
}

export const InvitePage: React.FC<IInvitePageProps> = (props) => {
    const { registrationCodeList = [] } = props;

    const styles = useInvitePageStyles();
    const recaptchaAsync = useRecaptchaAsync();
    const [codeList, setCodeList] = React.useState<IRegistrationCode[]>(registrationCodeList);

    const onCreateCode = React.useCallback(() => {
        postRegistrationCodeRequestAsync(recaptchaAsync)
            .then((resp) => {
                setCodeList([resp.data, ...codeList]);
            })
            .catch(() => {
                // TODO: Handle error
            });
    }, [codeList, recaptchaAsync]);

    // TODO: render list
    return (
        <div className={styles.root}>
            <div className={styles.title}></div>
            <div className={styles.container}>
                <div className={styles.button}>
                    <Button onClick={onCreateCode}>Create Code</Button>
                </div>
                <div className={styles.list}>
                    {codeList.map((code) => (
                        <div key={code.registrationCode}>{code.registrationCode}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};
