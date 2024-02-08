export function parseUrlIfSameOrigin(href: string): URL {
    // `new URL` may throw an exception
    try {
        const url = new URL(href, document.location.href);
        // Check internal links
        if (url.origin === document.location.origin) {
            return url;
        }
    } catch {
        return null;
    }
}

export function parseUrlToNavigate(url: URL): string {
    return `${url.pathname}${url.search}${url.hash}`;
}
