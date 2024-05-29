declare module "markdown-it-math-loose" {
    export interface IMarkdownItMathOptions {
        inlineOpen?: string;
        inlineClose?: string;
        blockOpen?: string;
        blockClose?: string;
        inlineRenderer?: (tokens: string, idx: number) => string;
        blockRenderer?: (str: string, idx: number) => string;
    }

    export default function math_plugin(md, options: IMarkdownItMathOptions): void;
}

declare module "markdown-it-merge-cells/src" {
    export default function mergeCells(md): void;
}
