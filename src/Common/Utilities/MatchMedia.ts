export const addEventListenerToMatchMedia = (
    query: MediaQueryList,
    listener: (ev: MediaQueryListEvent) => void,
) => {
    if (query) {
        if (query.addEventListener) {
            query.addEventListener("change", listener);
        } else if (query.addListener) {
            // IE and Safari does not support addEventListener on MediaQueryList
            query.addListener(listener);
        }
    }
};

export const removeEventListenerFromMatchMedia = (
    query: MediaQueryList,
    listener: (ev: MediaQueryListEvent) => void,
) => {
    if (query) {
        if (query.removeEventListener) {
            query.removeEventListener("change", listener);
        } else if (query.removeListener) {
            // IE and Safari does not support removeEventListener on MediaQueryList
            query.removeListener(listener);
        }
    }
};
