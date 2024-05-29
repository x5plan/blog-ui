export type StartWith<P extends string> = `${P}${string}`;
export type NotStartWith<T extends string, P extends string> = T extends `${P}${string}`
    ? never
    : T;

export type EndWith<P extends string> = `${string}${P}`;
export type NotEndWith<T extends string, P extends string> = T extends `${string}${P}` ? never : T;
