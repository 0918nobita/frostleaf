export { Fragment } from "./fragment";

import type { Fragment } from "./fragment";

type EmptyObj = Record<string, never>;
type AnyObj = Record<string, unknown>;

export type PropsWithChildren<Props> = Props & {
    children: AnyElement;
};

export type Component<Props = EmptyObj> = (
    props: Props
) => AnyElement | Promise<AnyElement>;

/** コンポーネントを用いて記述された要素の内部表現 */
export type ComponentElement<Props = EmptyObj> = {
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

export type Element<Props = EmptyObj> =
    | string
    | FHtmlElement
    | ComponentElement<Props>
    | FragmentElement;

type AnyElement = Element<AnyObj>;

export type Page = (_: {
    query: { [_: string]: string | undefined };
}) => AnyElement | Promise<AnyElement>;
