import * as React from "react";
import { useNavigation } from "react-navi";

export const useCreateNavigateOnClick = () => {
    const navigation = useNavigation();

    return React.useCallback(
        <T extends HTMLElement>(
            path: string,
            preventDefault = true,
            onClick?: (e: React.MouseEvent<T>) => void,
        ) => {
            return (e: React.MouseEvent<T>) => {
                if (preventDefault) {
                    e.preventDefault();
                }
                onClick?.(e);
                navigation.navigate(path);
            };
        },
        [navigation],
    );
};
