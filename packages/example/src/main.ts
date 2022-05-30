type Attrs = Record<string, string>;

/** 状態遷移しないコンポーネント */
type StaticComponent =
    | string
    | {
          tag: string;
          attrs: Attrs;
          children: StaticComponent[];
      };

const h = (
    tag: string,
    attrs: Attrs,
    children: StaticComponent[]
): StaticComponent => ({ tag, attrs, children });

const html: StaticComponent = h("html", {}, [
    h("head", {}, [
        h("meta", { charset: "utf-8" }, []),
        h("title", {}, ["Generated Page"]),
    ]),
    h("body", {}, []),
]);

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

const renderStaticComponent = (staticComponent: StaticComponent): string => {
    if (typeof staticComponent === "string") return staticComponent;

    const { tag, attrs, children } = staticComponent;

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
        children.length != 0 ? children.map(renderStaticComponent) : []
    ).join("");

    return `<${tag}${renderedAttrs}>${renderedChildren}</${tag}>`;
};

console.log(renderStaticComponent(html));

/** ブラウザ側で実行する JS のパス */
type ScriptPath = string;

/**
 * 副作用を含むコンポーネント
 *
 * ページ生成時に必要なデータを引数で受け取り、静的コンポーネントとそれに付属するブラウザ用スクリプトのパスを非同期で返す
 */
type ComponentWithEffect<Props> = (
    props: Props
) => Promise<[StaticComponent, ScriptPath[]]>;

const dynamic: ComponentWithEffect<string> = async (content: string) => {
    return [h("p", {}, [`${content}!`]), ["foo.client.ts"]];
};

dynamic("Hello, world").then((v) => console.log(v));
