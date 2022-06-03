export type PropsWithChildren<Props> = Props & {
    children: Element<Record<string, unknown>>;
};

export type Component<Props = Record<string, never>> = (
    props: Props
) =>
    | Element<Record<string, unknown>>
    | Promise<Element<Record<string, unknown>>>;

/** コンポーネントを用いて記述された要素の内部表現 */
export type ComponentElement<Props> = {
    type: "component-element";
    component: Component<Props>;
    props: Props;
    children: Element<Record<string, unknown>>[];
};

/** HTML タグを用いて記述された要素の内部表現 */
export type FHtmlElement = {
    type: "html-element";
    tag: string;
    attrs: Record<string, string>;
    children: Element<Record<string, unknown>>[];
};

export const Fragment = "Fragment";

export type FragmentElement = {
    type: typeof Fragment;
    children: Element<Record<string, unknown>>[];
};

export type Element<Props> =
    | string
    | FHtmlElement
    | ComponentElement<Props>
    | FragmentElement;

export type Page = (_: {
    query: { [_: string]: string | undefined };
}) =>
    | Element<Record<string, unknown>>
    | Promise<Element<Record<string, unknown>>>;
