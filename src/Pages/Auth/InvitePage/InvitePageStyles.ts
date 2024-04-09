import { makeStyles } from "@fluentui/react-components";

import { flex } from "@/Common/Styles/Flex";

export const useInvitePageStyles = makeStyles({
    root: {},
    title: {},
    container: {
        ...flex({
            flexDirection: "column",
        }),
        width: "100%",
    },
    buttonContainer: {
        ...flex({
            flexDirection: "row-reverse",
        }),
        width: "100%",
    },
    button: {
        width: "180px",
    },
    list: {
        marginTop: "20px",
    },
});
