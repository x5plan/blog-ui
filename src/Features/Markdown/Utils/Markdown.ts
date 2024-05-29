import MarkdownIt from "markdown-it";
import MarkdownItMath from "markdown-it-math-loose";
import MarkdownItMergeCells from "markdown-it-merge-cells/src";
import { v4 as uuidV4 } from "uuid";

export interface IHighlightPlaceholder {
    id: string;
    code: string;
    lang: string;
}

export interface IMathPlaceholder {
    id: string;
    math: string;
    display: boolean;
}

export interface IRenderedMarkdown {
    readonly html: string;
    readonly highlightPlaceholders: IHighlightPlaceholder[];
    readonly mathPlaceholders: IMathPlaceholder[];
}

// Use a <span> placeholder for highlights and maths
// They're replaced after HTML sanitation
function generatePlaceholder(id: string) {
    return `<span data-id="${id}"></span>`;
}

export function getPlaceholderElement(wrapperElement: HTMLElement, id: string): HTMLSpanElement {
    return wrapperElement.querySelector(`[data-id="${id}"]`);
}

export function renderMarkdown(
    content: string,
    onPatchRenderer?: (renderer: MarkdownIt) => void,
): IRenderedMarkdown {
    const highlightPlaceholders: IHighlightPlaceholder[] = [];
    const mathPlaceholders: IMathPlaceholder[] = [];

    const renderer = new MarkdownIt({
        html: true,
        breaks: false,
        linkify: true,
        typographer: true,
        highlight: (code, lang) => {
            const id = uuidV4();
            highlightPlaceholders.push({
                id,
                code,
                lang,
            });
            const cls = `language-${lang}`;

            return `<pre class="${cls}"><code class="${cls}">${generatePlaceholder(id)}</code></pre>`;
        },
    });

    renderer.use(MarkdownItMath, {
        inlineOpen: "$",
        inlineClose: "$",
        blockOpen: "$$",
        blockClose: "$$",
        inlineRenderer: (math: string) => {
            const id = uuidV4();
            mathPlaceholders.push({
                id,
                math,
                display: false,
            });

            return generatePlaceholder(id);
        },
        blockRenderer: (math: string) => {
            const id = uuidV4();
            mathPlaceholders.push({
                id,
                math,
                display: true,
            });

            return generatePlaceholder(id);
        },
    });

    renderer.use(MarkdownItMergeCells);

    onPatchRenderer?.(renderer);

    return {
        html: renderer.render(content),
        highlightPlaceholders,
        mathPlaceholders,
    };
}
