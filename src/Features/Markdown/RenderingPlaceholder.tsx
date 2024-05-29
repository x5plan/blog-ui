import { Skeleton, SkeletonItem, useId } from "@fluentui/react-components";
import React from "react";

export interface IRenderingPlaceholderProps {
    content: string;
}

export const RenderingPlaceholder: React.FC<IRenderingPlaceholderProps> = (props) => {
    const { content } = props;

    const lines = React.useMemo(
        () => content.split("\n").filter((line) => line.trim() !== ""),
        [content],
    );

    const keyPrefix = useId("RenderingPlaceholder");

    return (
        <Skeleton>{lines.map((line, index) => generateLines(line, keyPrefix + index))}</Skeleton>
    );
};

function generateLines(line: string, keyPrefix: string) {
    const count = Math.max(Math.ceil(line.length / 10), 3);
    const lines: React.ReactElement[] = [];
    for (let i = 0; i < count; i++) {
        lines.push(<SkeletonItem key={keyPrefix + i} />);
    }

    const gridTemplateColumns = randomSplitNumber(100, count)
        .map((value) => `${value}%`)
        .join(" ");

    return (
        <div
            key={keyPrefix}
            style={{
                gridTemplateColumns,
                width: `calc(100% - ${(count - 1) * 10}px)`,
                alignItems: "center",
                display: "grid",
                position: "relative",
                columnGap: "10px",
                marginBottom: "7px",
            }}
        >
            {lines}
        </div>
    );
}

function randomSplitNumber(sum: number, count: number): number[] {
    const result: number[] = [];
    const base = Math.floor(sum / count);
    const range = Math.floor(base / 10);

    for (let i = 0; i < count - 1; i++) {
        const randomValue = base - range + Math.floor(Math.random() * range * 2);
        result.push(randomValue);
        sum -= randomValue;
    }
    result.push(sum);

    return result;
}
