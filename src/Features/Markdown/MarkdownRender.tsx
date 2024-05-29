import * as React from "react";
import { Await, useNavigate } from "react-router-dom";

import type { PromiseInnerType } from "@/Common/Types/PromiseInnerType";
import { parseUrlIfSameOrigin } from "@/Common/Utilities/SameOrigin";

import { loadMath } from "./DynimicImport";
import { loadHighlight, loadMarkdown } from "./DynimicImport";
import { RenderingPlaceholder } from "./RenderingPlaceholder";
import { sanitize } from "./Utils/Sanitize";

export interface IMarkdownRenderProps {
    content: string;
}

export const MarkdownRender: React.FC<IMarkdownRenderProps> = (props) => {
    const { content } = props;
    const [wrapperElement, setWrapperElement] = React.useState<HTMLDivElement>();

    const renderPromise = React.useMemo(() => renderAsync(content), [content]);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!wrapperElement) return;

        // Fix internal links with dynamic generated `<a>` will NOT trigger react-router's navigation
        function onLinkClick(e: MouseEvent) {
            const targetElement = e.target as HTMLElement;
            if (targetElement.tagName === "A") {
                const a = targetElement as HTMLAnchorElement;
                if (!["", "_self"].includes(a.target.toLowerCase())) return;

                const url = parseUrlIfSameOrigin(a.href);
                if (url) {
                    e.preventDefault();
                    navigate(`${url.pathname}${url.search}${url.hash}`);
                }
            }
        }

        wrapperElement.addEventListener("click", onLinkClick);

        return () => {
            wrapperElement.removeEventListener("click", onLinkClick);
        };
    }, [navigate, wrapperElement]);

    return (
        <React.Suspense fallback={<RenderingPlaceholder content={content} />}>
            <Await errorElement={null} resolve={renderPromise}>
                {(html: string) => (
                    <div dangerouslySetInnerHTML={{ __html: html }} ref={setWrapperElement} />
                )}
            </Await>
        </React.Suspense>
    );
};

let markdownModule: PromiseInnerType<ReturnType<typeof loadMarkdown>>;
let highlightModule: PromiseInnerType<ReturnType<typeof loadHighlight>>;
let mathModule: PromiseInnerType<ReturnType<typeof loadMath>>;

async function renderAsync(content: string) {
    const { renderMarkdown, getPlaceholderElement } =
        markdownModule ?? (markdownModule = await loadMarkdown());

    const { html, highlightPlaceholders, mathPlaceholders } = renderMarkdown(content);
    // const htmlString = content;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = sanitize(html);

    if (highlightPlaceholders.length > 0) {
        const { highlight } = highlightModule ?? (highlightModule = await loadHighlight());

        for (const placeholder of highlightPlaceholders) {
            const element = getPlaceholderElement(wrapper, placeholder.id);
            element.outerHTML = highlight(placeholder.code, placeholder.lang);
        }
    }

    if (mathPlaceholders.length > 0) {
        const { renderMath } = mathModule ?? (mathModule = await loadMath());

        for (const placeholder of mathPlaceholders) {
            const element = getPlaceholderElement(wrapper, placeholder.id);
            element.outerHTML = renderMath(placeholder.math, placeholder.display);
        }
    }

    // Patch <a> tags for security reason
    Array.from(wrapper.getElementsByTagName("a")).forEach((a) => {
        a.relList.add("noreferrer", "noreferrer");
        if (!parseUrlIfSameOrigin(a.href)) a.target = "_blank";
    });

    return wrapper.innerHTML;
}
