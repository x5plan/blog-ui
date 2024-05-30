import { Skeleton, SkeletonItem, useId } from "@fluentui/react-components";
import React from "react";

export interface IRenderingPlaceholderProps {
    content: string;
}

export const RenderingPlaceholder: React.FC<IRenderingPlaceholderProps> = (props) => {
    const { content } = props;

    const lines = React.useMemo(
        () =>
            content
                .split("\n")
                .map((line) => line.trim())
                .filter((line, index) => line.length > 10 || index < 3),
        [content],
    );
    const maxLength = React.useMemo(
        () => Math.min(Math.max(...lines.map((line) => line.length)), 100),
        [lines],
    );

    const keyPrefix = useId("RenderingPlaceholder");

    return (
        <Skeleton>
            {lines.map((line, index) => (
                <SkeletonItem
                    key={keyPrefix + index}
                    style={{
                        width: calcLinePercent(line.length, maxLength),
                        marginBottom: 7,
                    }}
                />
            ))}
        </Skeleton>
    );
};

function calcLinePercent(length: number, maxLength: number): `${number}%` {
    if (length > maxLength) {
        return "100%";
    }

    const percent = (length / maxLength) * 100;
    const betterPercent = Math.max(Math.sqrt(percent) * 10, 10);

    return `${Math.floor(betterPercent)}%`;
}
