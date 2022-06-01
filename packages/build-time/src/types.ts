import { Fragment } from "./fragment";

export type PropsWithChildren<Props> = Props & { children: Element<any> };

export type Component<Props = {}> = (props: Props) => (Element<any> | Promise<Element<any>>);

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

export type Page = (_: { query: { [_: string]: string | undefined } }) => (Element<any> | Promise<Element<any>>);
