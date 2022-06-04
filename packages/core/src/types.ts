type EmptyObj = Record<string, never>;
type AnyObj = Record<string, unknown>;

export type PropsWithChildren<Props> = Props & {
    children: Element<AnyObj>;
};

export type Component<Props = EmptyObj> = (
    props: Props
) => Element<AnyObj> | Promise<Element<AnyObj>>;

/** コンポーネントを用いて記述された要素の内部表現 */
export type ComponentElement<Props = EmptyObj> = {
    type: "component-element";
    component: Component<Props>;
    props: Props;
    children: Element<AnyObj>[];
};

/** HTML タグを用いて記述された要素の内部表現 */
export type FHtmlElement = {
    type: "html-element";
    tag: string;
    attrs: Record<string, string>;
    children: Element<AnyObj>[];
};

export const Fragment = "Fragment";

export type FragmentElement = {
    type: typeof Fragment;
    children: Element<AnyObj>[];
};

export type Element<Props = EmptyObj> =
    | string
    | FHtmlElement
    | ComponentElement<Props>
    | FragmentElement;

export type Page = (_: {
    query: { [_: string]: string | undefined };
}) => Element<AnyObj> | Promise<Element<AnyObj>>;
