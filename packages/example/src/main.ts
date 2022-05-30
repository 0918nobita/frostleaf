/** 状態遷移しないコンポーネント */
type StaticComponent =
    | string
    | {
          tag: string;
          attrs: Record<string, unknown>;
          children: StaticComponent[];
      };

const h = (
    tag: string,
    attrs: Record<string, unknown>,
    children: StaticComponent[]
): StaticComponent => ({ tag, attrs, children });

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

const html: StaticComponent = h("html", {}, [
    h("head", {}, [
        h("meta", { charset: "utf-8" }, []),
        h("title", {}, ["Generated Page"]),
    ]),
    h("body", {}, []),
]);

console.dir(html, { depth: null });

const dynamic: ComponentWithEffect<string> = async (content: string) => {
    return [h("p", {}, [`${content}!`]), ["foo.client.ts"]];
};

dynamic("Hello, world").then((v) => console.log(v));
