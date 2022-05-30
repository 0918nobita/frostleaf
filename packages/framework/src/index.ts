export type Attrs = Record<string, string>;

export type Markup =
    | string
    | {
          tag: string;
          attrs: Attrs;
          children: Markup[];
      };

/** 状態遷移しないコンポーネント */
export type StaticComponent = { markup: Markup; script?: string };

/**
 * 副作用を含むコンポーネント
 *
 * ページ生成時に必要なデータを引数で受け取り、静的コンポーネントを非同期で返す
 */
export type ComponentWithEffect<Props> = {
    markupFn: (props: Props) => Promise<Markup>;
    script?: string;
};

export const h = (tag: string, attrs: Attrs, children: Markup[]): Markup => ({
    tag,
    attrs,
    children,
});

const voidElements: readonly string[] = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
];

const renderMarkup = (markup: Markup): string => {
    if (typeof markup === "string") return markup;

    const { tag, attrs, children } = markup;

    const attrFragments = Object.keys(attrs).map(
        (key) => `${key}="${attrs[key]}"`
    );
    const renderedAttrs =
        attrFragments.length != 0 ? ` ${attrFragments.join(" ")}` : "";

    if (voidElements.includes(tag)) {
        if (children.length != 0)
            throw new Error("Children of void element must be empty");
        return `<${tag}${renderedAttrs}>`;
    }

    const renderedChildren = (
        children.length != 0 ? children.map(renderMarkup) : []
    ).join("");

    return `<${tag}${renderedAttrs}>${renderedChildren}</${tag}>`;
};
