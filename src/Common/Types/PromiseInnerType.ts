// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P> ? P : never;
