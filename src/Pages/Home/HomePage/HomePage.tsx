import * as React from "react";

import { useLocalizedString } from "@/Features/LocalizedString/Hooks";
import { CE_Strings } from "@/Features/LocalizedString/Types";
import { MarkdownRender } from "@/Features/Markdown/MarkdownRender";
import { useSetPageMeta } from "@/Features/Page/Hooks";
import { CE_PageType } from "@/Features/Page/Types";

// TODO: Remove this test markdown content
const testMarkdown = `
# Hello, World!

This is a test markdown content.

## Subtitle

This is a test markdown content.


\`\`\`ts
// This is a test code block
console.log("Hello, World!");
\`\`\`

$$
E = mc^2
$$

[Link to Google](https://www.google.com)
[Link to Bing](https://www.bing.com)
[Link](/invite)
`;

export const HomePage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.HOME_PAGE_TITLE);
    useSetPageMeta(pageTitle, CE_PageType.Home);

    // TODO: Implement HomePage

    // TODO: Remove this test markdown render
    return <MarkdownRender content={testMarkdown} />;
};
