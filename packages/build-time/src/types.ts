import { Fragment } from "./fragment";

export type PropsWithChildren<Props> = Props & { children: Element<any> };

/** 同期的にレンダリングされるコンポーネント */
export type SyncComponent<Props = {}> = {
    type: "sync-component";
    resolveContent: (props: PropsWithChildren<Props>) => Element<any>;
};

/** 同期的にレンダリングされる、子要素を受け取らないコンポーネント */
export type VoidSyncComponent<Props = {}> = {
    type: "sync-component";
    resolveContent: (props: Props) => Element<any>;
};

/** 非同期的にレンダリングされるコンポーネント */
export type AsyncComponent<Props = {}> = {
    type: "async-component";
    resolveContent: (props: PropsWithChildren<Props>) => Promise<Element<any>>;
};

/** 非同期的にレンダリングされる、子要素を受け取らないコンポーネント */
export type VoidAsyncComponent<Props = {}> = {
    type: "async-component";
    resolveContent: (props: Props) => Promise<Element<any>>;
};

export type Component<Props> =
    | VoidSyncComponent<Props>
    | SyncComponent<Props>
    | VoidAsyncComponent<Props>
    | AsyncComponent<Props>;

/** コンポーネントを用いて記述された要素の内部表現 */
export type ComponentElement<Props> = {
    type: "component-element";
    component: Component<Props>;
    props: Props;
    children: Element<any>[];
};

/** HTML タグを用いて記述された要素の内部表現 */
export type FHtmlElement = {
    type: "html-element";
    tag: string;
    attrs: Record<string, string>;
    children: Element<any>[];
};

export type FragmentElement = {
    type: typeof Fragment;
    children: Element<any>[];
};

export type Element<Props> =
    | string
    | FHtmlElement
    | ComponentElement<Props>
    | FragmentElement;
