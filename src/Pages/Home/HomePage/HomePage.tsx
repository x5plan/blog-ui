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

This is a test markdown content.dfghasdcvbgfdscfvbgnhdsacvfbnhgfdscvbnhdfdsfdsasdfvfbgfsdfghdsfghfdsfghgdsafgbhngfdsfghcvxxxxxxxxxxxxxxdsfcdsfcddvfbcgvnhgfesdcfvfbsdvfbgnffdscfbgfdcs

1

\`\`\`ts
// This is a test code block
console.log("Hello, World!"); // esdfghntgfdscvfbghngfsdcvfbgnhrewdascfvbghtreqwdfcv
\`\`\`

$$
E = mc^2
$$

[Link to Google](https://www.google.com)
[Link to Bing](https://www.bing.com)
[Link](/invite)

> wew
> QAQ
>
> test test test
>
> test test test sdfghjkl cdxcdaws   dscsac
> > sdsds
> > sdfvbghdfs
> > sdfvbghfds
> >
> > sdfvbghfds
> >
> dsfvbgfesd
>
> dfsdfds

![test](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)

<script>alert("Hello, World!");</script>

<a href="javascript:alert('Hello, World!');">Click me!</a>

1. first
2. second
    1. second-first
    2. second-second
    3. second-third
        1. second-third-first
        2. second-third-second
        3. second-third-third
3. third
4. fourth

- first
- second
    - second-first
    - second-second
    - second-third
        - second-third-first
        - second-third-second
        - second-third-third
    - second-fourth
- third
- fourth
`;

export const HomePage: React.FC = () => {
    const pageTitle = useLocalizedString(CE_Strings.HOME_PAGE_TITLE);
    useSetPageMeta(pageTitle, CE_PageType.Home);

    // TODO: Implement HomePage

    // TODO: Remove this test markdown render
    return <MarkdownRender content={testMarkdown} />;
};
