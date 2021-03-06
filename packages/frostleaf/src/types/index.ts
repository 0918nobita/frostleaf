export { Fragment } from "./fragment";

import type { Fragment } from "./fragment";

export type PropsWithChildren<Props> = Props & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: Element<any>[];
};

export type Component<Props = Record<string, never>> = (
    props: Props
) => AnyElement | Promise<AnyElement>;

/** コンポーネントを用いて記述された要素の内部表現 */
export type ComponentElement<Props = Record<string, never>> = {
    type: "component-element";
    component: Component<Props>;
    props: Props;
    children: AnyElement[];
};

/** HTML タグを用いて記述された要素の内部表現 */
export type FHtmlElement = {
    type: "html-element";
    tag: string;
    attrs: Record<string, string>;
    children: AnyElement[];
};

export type FragmentElement = {
    type: typeof Fragment;
    children: AnyElement[];
};

export type Element<Props> =
    | string
    | FHtmlElement
    | ComponentElement<Props>
    | FragmentElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyElement = Element<any>;

export type Page = (_: { Head: Component }) => AnyElement | Promise<AnyElement>;
