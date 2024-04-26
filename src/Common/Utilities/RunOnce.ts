// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runOnce<T extends (...args: any[]) => any>(cb: T) {
    let initialized = false;
    let res: ReturnType<T>;

    const returnFunc = (...args: Parameters<T>): ReturnType<T> => {
        if (initialized) {
            return res;
        }
        initialized = true;

        return (res = cb(...args));
    };

    returnFunc.reset = function () {
        initialized = false;
        res = null;
    };

    return returnFunc;
}
