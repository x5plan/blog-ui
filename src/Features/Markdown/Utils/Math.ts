import "katex/dist/katex.min.css";

import katex from "katex";

export function renderMath(math: string, displayMode: boolean) {
    return katex.renderToString(math, {
        throwOnError: false,
        displayMode,
    });
}
