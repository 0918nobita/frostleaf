export type SyncComponent<Props = {}> = {
    type: "sync-component";
    resolveContent: (props: Props) => Element<any>;
    runtimeScript?: string;
};

export type AsyncComponent<Props = {}> = {
    type: "async-component";
    resolveContent: (props: Props) => Promise<Element<any>>;
    runtimeScript?: string;
};

type Component<Props> = SyncComponent<Props> | AsyncComponent<Props>;

type ComponentElement<Props> = {
    type: "component-element";
    component: Component<Props>;
};

type FHtmlElement = {
    type: "html-element";
    tag: string;
    attrs: Record<string, string>;
    children: Element<any>[];
};

type Element<Props> = string | FHtmlElement | ComponentElement<Props>;

export const h = <Props extends Record<string, unknown>>(
    tagOrComponent: string | Component<Props>,
    props: Props,
    children: Element<any>[]
): Element<Props> => {
    if (typeof tagOrComponent === "string") {
        const attrs: Record<string, string> = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value !== "string") {
                throw new Error(`Invalid attribute value for ${key}: ${value}`);
            }
            attrs[key] = value;
        }

        return {
            type: "html-element",
            tag: tagOrComponent,
            attrs,
            children,
        };
    }

    return {
        type: "component-element",
        component: tagOrComponent,
    };
};

/*
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

export const renderVNode = (vnode: VNode): string => {
    if (vnode.type === "vnode-text") return vnode.val;

    if (vnode.type === "vnode-tag") {
        const { tag, attrs, children } = vnode;

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
            children.length != 0 ? children.map(renderVNode) : []
        ).join("");

        return `<${tag}${renderedAttrs}>${renderedChildren}</${tag}>`;
    }

    if (vnode.type === "vnode-static-component") {
        const { vNode } = vnode.component;
        return renderVNode({ type: "vnode-tag", ...vNode });
    }

    throw new Error("Not implemented");
};
*/
