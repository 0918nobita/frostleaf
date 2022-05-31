export * from "./fragment";
export * from "./h";
export * from "./render";
export * from "./types";

import {
    AsyncComponent,
    Element,
    PropsWithChildren,
    SyncComponent,
} from "./types";

export const sync = <Props = {}>(
    fn: (props: PropsWithChildren<Props>) => Element<any>,
    runtimeScript?: string
): SyncComponent<Props> => ({
    type: "sync-component",
    resolveContent: fn,
    runtimeScript,
});

export const voidSync = <Props = {}>(
    fn: (props: Props) => Element<any>,
    runtimeScript?: string
): SyncComponent<Props> => ({
    type: "sync-component",
    resolveContent: fn,
    runtimeScript,
});

export const async = <Props = {}>(
    fn: (props: PropsWithChildren<Props>) => Promise<Element<any>>,
    runtimeScript?: string
): AsyncComponent<Props> => ({
    type: "async-component",
    resolveContent: fn,
    runtimeScript,
});

export const voidAsync = <Props = {}>(
    fn: (props: Props) => Promise<Element<any>>,
    runtimeScript?: string
): AsyncComponent<Props> => ({
    type: "async-component",
    resolveContent: fn,
    runtimeScript,
});
